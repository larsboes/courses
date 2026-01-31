# Dockerfile
FROM oven/bun:1 AS base
WORKDIR /app

# Development - dependencies mounted from host
FROM base AS dev
EXPOSE 5173
CMD ["bun", "run", "dev", "--host"]

# Build (for production)
FROM base AS builder
COPY package.json bun.lock ./
COPY node_modules ./node_modules
COPY . .
RUN bun run build

# Production
FROM nginx:alpine AS prod
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
