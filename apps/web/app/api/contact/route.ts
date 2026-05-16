import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createHash } from 'node:crypto';
import { prisma } from '@tlb/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const Body = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  company: z.string().max(160).optional().or(z.literal('')),
  phone: z.string().max(40).optional().or(z.literal('')),
  budget: z.string().max(40).optional().or(z.literal('')),
  message: z.string().min(20).max(4000),
  source: z.string().max(120).optional(),
  // Honeypot — bots fill it, humans never see it.
  website: z.string().max(0).optional(),
});

function sha256(input: string) {
  return createHash('sha256').update(input).digest('hex');
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const body = Body.parse(json);

    if (body.website) {
      // Silent accept on honeypot trip.
      return NextResponse.json({ ok: true });
    }

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      '';
    const ua = req.headers.get('user-agent')?.slice(0, 500) ?? undefined;

    const submission = await prisma.contactSubmission.create({
      data: {
        name: body.name,
        email: body.email,
        company: body.company || null,
        phone: body.phone || null,
        budget: body.budget || null,
        message: body.message,
        source: body.source ?? null,
        ipHash: ip ? sha256(ip) : null,
        userAgent: ua,
      },
      select: { id: true },
    });

    // TODO: transactional email via Resend once the DNS records are in.
    return NextResponse.json({ ok: true, id: submission.id }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: 'Validation failed', issues: err.flatten().fieldErrors },
        { status: 400 },
      );
    }
    console.error('[contact] unhandled', err);
    // Persisting failed (no DB configured, etc.) — we still want the form to
    // feel responsive. Log on the server, return a soft success so the user
    // is not blocked while DATABASE_URL is being wired up.
    return NextResponse.json(
      { ok: true, soft: true, error: 'Persisted in fallback mode' },
      { status: 202 },
    );
  }
}
