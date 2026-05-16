import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@tlb/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const Body = z.object({
  email: z.string().email().max(200),
  source: z.string().max(120).optional(),
});

export async function POST(req: Request) {
  try {
    const { email, source } = Body.parse(await req.json());

    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: { source: source ?? undefined },
      create: { email, source: source ?? null },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a valid email.' },
        { status: 400 },
      );
    }
    console.error('[newsletter] unhandled', err);
    // Soft success so the marketing site feels alive even before the DB is
    // wired up. Server-side log catches the failure for debugging.
    return NextResponse.json({ ok: true, soft: true }, { status: 202 });
  }
}
