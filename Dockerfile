FROM node:14.1.0-alpine
WORKDIR /app

COPY package.json .

RUN npm install \
    --no-cache \
    --only=production

RUN npm install --global sequelize-cli

COPY . .

ENTRYPOINT [ "/bin/sh", "entrypoint.sh" ]
