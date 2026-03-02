#!/bin/bash

# set -x

# Usage
# ./restart.sh

TZ=${TZ:-"America/Los_Angeles"}

log() {
  printf '[%s][%s] %s\n' "$(date "+%Y-%m-%dT%H:%M:%S")" "$0" "$@"
}

log "Pruning docker volumes"
docker system prune -a --volumes

log "Restarting instance"

# ensure PATH has dokku
PATH="/usr/local/bin:/usr/bin:/bin"

dokku ps:stop hasura || true

MAX_RETRIES=5
SLEEP=10

i=1
while [ $i -le $MAX_RETRIES ]; do
  echo "Starting hasura (attempt $i)…"

  # as of 2025-01 restart below was failing in digitalocean due to hitting resource limits
  # this meant the dokku app eventually crashed because it was never restarted periodically
  # ideally we would run restart below but it requires running two containers concurrently
  # opt to stop and start instead which is not zero downtime but reduces resource footprint
  #
  #   dokku ps:restart hasura
  #
  if dokku ps:start hasura; then
    echo "✅ Started"
    exit 0
  fi

  echo "⚠️ Failed. Retry in $SLEEP seconds…"
  sleep $SLEEP
  i=$((i+1))
done

echo "🚨 Failed to start after $MAX_RETRIES attempts."
exit 1
