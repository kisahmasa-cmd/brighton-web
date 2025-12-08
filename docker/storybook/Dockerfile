# ======================
# 1️⃣ Build Stage
# ======================
FROM node:24-alpine AS builder

# Set working directory
WORKDIR /app

# Copy only package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of project
COPY . .

# Copy .env if needed (only safe if contains NEXT_PUBLIC_* vars)
COPY .env .env

# Build Storybook static files
RUN npm run build-storybook


# # ======================
# # 2️⃣ Runtime Stage (Node-only, no Nginx)
# # ======================
# FROM node:24-alpine AS runner

# WORKDIR /app

# # Copy package files to install runtime deps (if Storybook needs them)
# COPY package*.json ./
# RUN npm install

# # Copy only what's needed for runtime
# COPY --from=builder /app/* ./

# Expose Storybook port
EXPOSE 6006

# Run Storybook directly
CMD ["npm", "run", "storybook"]
