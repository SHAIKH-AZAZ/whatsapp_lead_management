import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// Get file-relative directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the monorepo root
const envPath = join(__dirname, '../../.env');
const result = config({ path: envPath });

// Prefer the value from the config() call to ensure it's fresh
const connectionString = result.parsed?.DATABASE_URL || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    `DATABASE_URL is not set. Please ensure you have a .env file in the root directory. Looked in: ${envPath}`
  );
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const adapter = new PrismaPg(connectionString);

export const prisma =
  globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
