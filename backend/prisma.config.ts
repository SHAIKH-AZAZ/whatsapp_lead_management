import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { defineConfig, env } from "@prisma/config";

// Get file-relative directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the monorepo root
// backend/prisma.config.ts -> backend -> root
config({ path: join(__dirname, "../.env") });

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
