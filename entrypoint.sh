#!/usr/bin/env sh

npm run drop
npm run migration
npm run fixture-generation

node index.js
