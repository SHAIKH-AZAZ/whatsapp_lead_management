FROM node:24-bullseye-slim

WORKDIR /app

# Install Bun and OpenSSL for Prisma
RUN apt-get update -y && apt-get install -y curl unzip openssl && rm -rf /var/lib/apt/lists/*
RUN curl -fsSL https://bun.sh/install | bash
ENV BUN_INSTALL=/root/.bun
ENV PATH="${BUN_INSTALL}/bin:${PATH}"

# Copy workspace manifests and Prisma files first for better layer caching
COPY package.json bun.lock ./
COPY frontend/package.json ./frontend/package.json
COPY backend/package.json ./backend/package.json
COPY backend/prisma.config.ts ./backend/prisma.config.ts
COPY backend/prisma ./backend/prisma/

# Install workspace dependencies with Bun.
# Prisma only needs a syntactically valid URL at build time for code generation.
RUN DATABASE_URL=postgresql://placeholder:placeholder@127.0.0.1:5432/placeholder?schema=public \
  bun install --frozen-lockfile

# Copy the backend source
COPY backend ./backend

WORKDIR /app/backend

# Expose the API port
EXPOSE 3001

CMD ["bun", "run", "start"]
