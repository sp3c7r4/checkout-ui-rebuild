FROM node:24-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .

ARG VITE_SERVER_ORIGIN
ARG VITE_API_ORIGIN
ARG VITE_TELEGRAM_BOT_URL
ENV VITE_SERVER_ORIGIN=$VITE_SERVER_ORIGIN \
    VITE_API_ORIGIN=$VITE_API_ORIGIN \
    VITE_TELEGRAM_BOT_URL=$VITE_TELEGRAM_BOT_URL

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
