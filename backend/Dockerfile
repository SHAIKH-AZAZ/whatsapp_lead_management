FROM node:22-bullseye-slim

WORKDIR /app

# Install openssl for Prisma
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies normally so esbuild downloads its native binaries
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the API port
EXPOSE 3001

CMD ["npm", "run", "server:start"]
