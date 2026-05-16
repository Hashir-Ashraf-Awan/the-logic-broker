import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE = {
  name: 'The Logic Broker',
  shortName: 'TLB',
  tagline: 'AI automation, engineered for the enterprise.',
  description:
    'The Logic Broker designs and ships production-grade AI systems for ambitious teams — automation, ML, generative AI, and the operating model that makes them stick.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thelogicbroker.com',
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000',
  email: 'hello@thelogicbroker.com',
  twitter: '@logicbroker',
} as const;
