import { PrismaClient, Prisma } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var __tlbPrisma: PrismaClient | undefined;
}

const prisma =
  global.__tlbPrisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'production'
        ? ['error', 'warn']
        : ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') {
  global.__tlbPrisma = prisma;
}

export { prisma, Prisma };
export * from '@prisma/client';
