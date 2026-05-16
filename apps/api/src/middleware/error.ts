import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { logger } from '../lib/logger.js';

export class HttpError extends Error {
  override readonly name = 'HttpError';
  constructor(
    public readonly status: number,
    message: string,
    public readonly detail?: unknown,
  ) {
    super(message);
  }
}

export function notFound(req: Request, res: Response) {
  res.status(404).json({ ok: false, error: `Not found: ${req.method} ${req.path}` });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    res.status(400).json({
      ok: false,
      error: 'Validation failed',
      issues: err.flatten().fieldErrors,
    });
    return;
  }
  if (err instanceof HttpError) {
    res.status(err.status).json({ ok: false, error: err.message, detail: err.detail });
    return;
  }
  logger.error({ err }, 'Unhandled error');
  res.status(500).json({ ok: false, error: 'Internal server error' });
}
