#!/usr/bin/env sh

npx sequelize db:migrate
node app.js
