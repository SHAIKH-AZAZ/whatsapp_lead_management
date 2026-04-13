FROM node:20.19-bullseye

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# We use 'npm install' instead of 'npm ci' to ensure the lockfile 
# is synchronized with the new dependencies (ioredis, etc.) during build.
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate the Prisma client for PostgreSQL
RUN npm run prisma:generate

# Railway provides the PORT environment variable
EXPOSE 3001

# Start the Express server
CMD ["npm", "run", "server:start"]
