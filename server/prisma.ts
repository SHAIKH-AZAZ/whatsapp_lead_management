import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Initialize Pool with SSL required for Neon DB
const pool = new Pool({ 
  connectionString,
  ssl: { rejectUnauthorized: false },
  max: 20, // Adjust based on your Neon plan
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;