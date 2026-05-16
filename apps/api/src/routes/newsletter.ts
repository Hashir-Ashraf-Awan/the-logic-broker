import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '@tlb/db';
import { writeLimiter } from '../middleware/rate-limit.js';

export const newsletterRouter = Router();

const Body = z.object({
  email: z.string().email().max(200),
  source: z.string().max(120).optional(),
});

newsletterRouter.post('/newsletter', writeLimiter, async (req, res, next) => {
  try {
    const { email, source } = Body.parse(req.body);
    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: { source: source ?? undefined },
      create: { email, source: source ?? null },
    });
    res.status(201).json({ ok: true });
  } catch (err) {
    next(err);
  }
});
