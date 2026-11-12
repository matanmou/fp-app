# ---------- Stage 1: build the Angular app ----------
# Angular 8 / TypeScript 3.4 need an older Node (12 is the newest that builds it cleanly)
FROM node:12-alpine AS build

WORKDIR /app

# Install dependencies first (cached unless package files change)
RUN apk add --no-cache git
RUN git clone --filter=blob:none --no-checkout --depth 1 \
    https://github.com/matanmou/fp-app.git . && \
    git sparse-checkout set frontend && \
    git checkout

WORKDIR /app/frontend

RUN npm ci

# Copy the source and build for production
RUN npx ng build --prod

# ---------- Stage 2: serve with nginx ----------
FROM nginx:1.25-alpine

# SPA config: unknown routes fall back to index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Built files from stage 1
COPY --from=build /app/dist/matanmoDotCom /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
