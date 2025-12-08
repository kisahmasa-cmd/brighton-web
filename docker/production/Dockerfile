# =========================
# 1️⃣ Builder Stage
# =========================
FROM node:24-slim AS builder

WORKDIR /app

ENV NODE_ENV=production

# Install dependencies only using package lock (better caching)
COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci --only=production

# Copy the rest of the application
COPY . .

# Build Next.js
RUN npm run build


# =========================
# 2️⃣ Runner Stage
# =========================
FROM node:24-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy required output & minimal runtime files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 3000

CMD ["npm", "start"]
