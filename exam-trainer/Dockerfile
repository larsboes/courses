# Dockerfile
FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Development
FROM deps AS dev
COPY . .
EXPOSE 5173
CMD ["bun", "run", "dev"]

# Build
FROM deps AS builder
COPY . .
RUN bun run build

# Production
FROM nginx:alpine AS prod
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
