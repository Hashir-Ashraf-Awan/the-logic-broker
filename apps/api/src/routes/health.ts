import { Router } from 'express';
import { prisma } from '@tlb/db';

export const healthRouter = Router();

healthRouter.get('/healthz', (_req, res) => {
  res.json({ ok: true, service: '@tlb/api', uptime: process.uptime() });
});

healthRouter.get('/readyz', async (_req, res) => {
  try {
    if (process.env.DATABASE_URL) {
      await prisma.$queryRaw`SELECT 1`;
      res.json({ ok: true, db: 'up' });
      return;
    }
    res.json({ ok: true, db: 'not-configured' });
  } catch (err) {
    res.status(503).json({
      ok: false,
      db: 'down',
      detail: err instanceof Error ? err.message : 'unknown',
    });
  }
});
