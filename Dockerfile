FROM node:12-alpine AS builder

WORKDIR /opt/accounts
COPY package.json yarn.lock ./
RUN yarn install

COPY ./ ./
RUN yarn build


FROM nginx:stable-alpine

RUN rm /etc/nginx/conf.d/*
COPY nginx.conf /etc/nginx/conf.d/site.conf

COPY --from=builder /opt/accounts/dist/ /srv/accounts/
