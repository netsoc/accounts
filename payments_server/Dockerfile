FROM node:12-alpine

WORKDIR /opt/accounts
COPY package.json yarn.lock ./
RUN yarn install

COPY ./ ./

ENV ACCOUNTS_BASE_URL=http://localhost:3000 \
    SUCCESS_URL=/success \
    CANCEL_URL=/cancel \
    SERVER_PORT=4242 \
    STRIPE_PRIVATE_KEY= \
    STRIPE_ENDPOINT_SECRET= \
    IAM_JWT=

EXPOSE 4242/tcp
ENTRYPOINT ["node", "index.js"]
