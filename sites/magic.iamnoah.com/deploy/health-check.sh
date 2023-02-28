#!/bin/bash

# set -x

# Usage
# HEALTH_URL="https://magic-graphql.iamnoah.com/v1/graphql"
# HEALTH_VALUE='{"code":"not-found","error":"resource does not exist","path":"$"}'
# ./health-check.sh 3 "$HEALTH_URL" "$HEALTH_VALUE"


INTERVAL_SEC=${1:-"5"}
HEALTH_URL="$2"
HEALTH_VALUE="$3"
TZ=${TZ:-"America/Los_Angeles"}

log() {
  printf '[%s] %s\n' "$(date "+%Y-%m-%dT%H:%M:%S")" "$@"
}

post_error() {
  ERROR="$@"
  HASURA_GRAPHQL_ADMIN_SECRET="$(dokku config:show hasura |& grep HASURA_GRAPHQL_ADMIN_SECRET | sed -e 's/.*:\s*//g')"
  DATA='{"operationName":"FailedHealthCheck","variables":{ "error": "'"$ERROR"'" },"query":"mutation FailedHealthCheck($error: String!) {\n  insert_dcsseeds_scrapePlayers_errors(objects: {error: $error}) {\n    affected_rows\n  }\n}\n"}'

  curl 'https://magic-graphql.iamnoah.com/v1/graphql' \
    -H 'content-type: application/json' \
    -H 'x-hasura-admin-secret: '"$HASURA_GRAPHQL_ADMIN_SECRET" \
    --data-raw "$DATA" \
    --compressed
}

# URL to use for monitoring health via curl
if [ -z "$HEALTH_URL" ]; then
   log "HEALTH_URL environment variable does not exist"
   exit 1
fi

# Expected value returned by HEALTH_URL
if [ -z "$HEALTH_VALUE" ]; then
   log "HEALTH_VALUE environment variable does not exist"
   exit 1
fi

# log "HEALTH_URL=$HEALTH_URL"
# log "HEALTH_VALUE=$HEALTH_VALUE"
# log "INTERVAL_SEC=$INTERVAL_SEC"

for (( i = 0; i < 5; i++))
do
  result=$(curl -s "$HEALTH_URL")

  log "CHECK #$i  result=$result"

  if [ "$result" == "$HEALTH_VALUE" ]; then
    log "✅ HEALTHY"
    exit 0
  fi

  sleep "$INTERVAL_SEC"
done

log "❌ UNHEALTHY"

post_error "FailedHealthCheck $(date "+%Y-%m-%dT%H:%M:%S")"

log "Restarting instance"
dokku ps:restart hasura

exit 1
