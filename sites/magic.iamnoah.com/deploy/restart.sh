#!/bin/bash

# set -x

# Usage
# ./restart.sh

TZ=${TZ:-"America/Los_Angeles"}

log() {
  printf '[%s][%s] %s\n' "$(date "+%Y-%m-%dT%H:%M:%S")" "$0" "$@"
}

log "Restarting instance"
dokku ps:restart hasura
