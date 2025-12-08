# =========================
# 1️⃣ Builder Stage
# =========================
FROM node:24-slim AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci --only=production

# Copy all project files
COPY . .
# # Build the Next.js app
RUN npm run build

# # =========================
# # 2️⃣ Runner Stage
# # =========================
FROM node:24-slim AS runner

# # Create app directory
WORKDIR /app

# # Copy necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./next.config.ts

# Expose the Next.js port
EXPOSE 3000

# Start the Next.js app
CMD ["npm","start"]
