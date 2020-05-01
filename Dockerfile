FROM node:14.1.0-alpine
WORKDIR /app

ENV NODE_ENV=docker

COPY package.json .

RUN npm install --no-cache

COPY . .

ENTRYPOINT [ "/bin/sh", "entrypoint.sh" ]
