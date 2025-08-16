# syntax=docker/dockerfile:1.6
FROM node:20-slim AS base
WORKDIR /app

ENV NODE_ENV=production \
    PORT=8080

FROM base AS deps
COPY package*.json ./
RUN npm ci --omit=dev

FROM base AS builder
COPY package*.json ./
RUN npm ci
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY src ./src
RUN npm run build

FROM base AS runner
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends tini && rm -rf /var/lib/apt/lists/*
ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["/usr/bin/tini","--"]

# runtime deps
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY --from=builder /app/dist ./dist

# uploads dir
RUN mkdir -p /app/uploads && chown -R node:node /app
USER node

# Required envs:
# DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET
# Optional: ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME, DB_LOGGING

CMD ["node", "dist/main.js"]


