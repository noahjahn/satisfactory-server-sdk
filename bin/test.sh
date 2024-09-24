#!/bin/bash

export UID
# docker compose run --name satisfactory-server -d --rm satisfactory-server || exit 1
# (sleep 5 && docker logs -f satisfactory-server) & echo "waiting for the satisfactory server to start" & sleep 120 # TODO: properly wait for the server to start up...
docker compose run --rm node npm run test

# docker compose down --remove-orphans
