#!/usr/bin/env sh

npm run drop
npm run migration
npm run generation

node app.js
