# Build
FROM node:26.1.0-alpine@sha256:e71ac5e964b9201072425d59d2e876359efa25dc96bb1768cb73295728d6e4ea AS builder

ENV NPM_CONFIG_UPDATE_NOTIFIER=false

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml vite.config.ts tsconfig.json index.html ./
COPY src/ src/
COPY public/ public/
COPY .yarn/ .yarn/

RUN npm install --global yarn@1.22.22
RUN yarn install --immutable
RUN yarn build

# Serve
FROM nginx:1.31.1-alpine@sha256:d1aedbc848110c391df415b27a241ea36159e63b51b151c29ab059867f9f5174

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
