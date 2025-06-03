# Stage 1: Build the app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the NestJS app
RUN npm run build

# ---------------------------------------

# Stage 2: Run the app
FROM node:18-alpine

WORKDIR /app

# Copy only the built app and node_modules from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Environment setup
ENV NODE_ENV=production
EXPOSE 3000

# Start the server
CMD ["node", "dist/src/main"]
