import { config } from 'dotenv';
import { z } from 'zod';

config();

const Schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  LOG_LEVEL: z.string().default('info'),
  WEB_ORIGINS: z.string().default('http://localhost:3000'),
  DATABASE_URL: z.string().url().optional(),
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().optional(),
  CLERK_WEBHOOK_SECRET: z.string().optional(),
});

const parsed = Schema.safeParse(process.env);
if (!parsed.success) {
  // Treat invalid env as fatal — surface what's wrong on boot.
  console.error('Invalid API env:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;

export const isProd = env.NODE_ENV === 'production';
export const allowedOrigins = env.WEB_ORIGINS.split(',').map((s) => s.trim());
