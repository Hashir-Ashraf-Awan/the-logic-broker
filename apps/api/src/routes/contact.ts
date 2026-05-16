import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '@tlb/db';
import { writeLimiter } from '../middleware/rate-limit.js';
import { sha256 } from '../lib/hash.js';

export const contactRouter = Router();

const ContactBody = z.object({
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

contactRouter.post('/contact', writeLimiter, async (req, res, next) => {
  try {
    const body = ContactBody.parse(req.body);
    if (body.website) {
      // Silently accept honeypot hits; log via pino-http instead of erroring.
      res.json({ ok: true });
      return;
    }

    const ip = (req.headers['x-forwarded-for']?.toString().split(',')[0] ?? req.ip ?? '').trim();
    const ua = req.headers['user-agent']?.toString().slice(0, 500);

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

    // TODO(session 9): fire transactional email via Resend.
    res.status(201).json({ ok: true, id: submission.id });
  } catch (err) {
    next(err);
  }
});
