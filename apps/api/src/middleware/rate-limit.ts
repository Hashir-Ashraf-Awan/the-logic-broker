import rateLimit from 'express-rate-limit';

/** Tight limiter for write endpoints (contact, newsletter, booking). */
export const writeLimiter = rateLimit({
  windowMs: 60_000,
  limit: 8,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { ok: false, error: 'Too many requests. Please slow down.' },
});

/** Generous limiter for read endpoints. */
export const readLimiter = rateLimit({
  windowMs: 60_000,
  limit: 120,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});
