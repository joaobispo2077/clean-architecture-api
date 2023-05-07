FROM node:18.13.0-bullseye-slim

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY --chown=node:node . /usr/src/app

RUN npm ci --only=production

USER node

CMD "npm" "start"
