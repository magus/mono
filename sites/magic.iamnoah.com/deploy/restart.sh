#!/bin/bash

# set -x

# Usage
# ./restart.sh

TZ=${TZ:-"America/Los_Angeles"}

log() {
  printf '[%s][%s] %s\n' "$(date "+%Y-%m-%dT%H:%M:%S")" "$0" "$@"
}

log "Restarting instance"

# as of 2025-01 restart below was failing in digitalocean due to hitting resource limits
# this meant the dokku app eventually crashed because it was never restarted periodically
# ideally we would run restart below but it requires running two containers concurrently
# opt to stop and start instead which is not zero downtime but reduces resource footprint
#
#   dokku ps:restart hasura
#
dokku ps:stop hasura
dokku ps:start hasura
