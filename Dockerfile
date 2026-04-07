# Build
FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml vite.config.ts index.html ./
COPY src/ src/
COPY .yarn/ .yarn/

RUN yarn install --immutable

RUN yarn build

# Serve
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
