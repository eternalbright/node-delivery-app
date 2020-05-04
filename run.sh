#!/usr/bin/env sh

case $1 in
    test)
        NODE_ENV=test npm run drop
        NODE_ENV=test npm run migration
        NODE_ENV=test jest --collectCoverage --forceExit || true
    ;;

    prod)
        npm run test || exit 1

        docker-compose build --no-cache
        docker-compose up
    ;;

    *)
        npm run drop
        npm run migration
        npm run generation

        nodemon app.js
    ;;
esac
