# Build
FROM node:24-alpine@sha256:d1b3b4da11eefd5941e7f0b9cf17783fc99d9c6fc34884a665f40a06dbdfc94f AS builder

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml vite.config.ts tsconfig.json index.html ./
COPY src/ src/
COPY public/ public/
COPY .yarn/ .yarn/

RUN yarn install --immutable
RUN yarn build

# Serve
FROM nginx:alpine@sha256:5616878291a2eed594aee8db4dade5878cf7edcb475e59193904b198d9b830de

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
