#!/bin/bash

export UID
docker compose run --rm --service-ports bun $@
