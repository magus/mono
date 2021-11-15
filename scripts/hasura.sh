#!/bin/bash

# set -x

# e.g. magic-graphql.iamnoah.com
GRAPHQL_HOSTNAME=$1

test -z "$GRAPHQL_HOSTNAME" && {
  echo " " 1>&2
  echo "  ❌ You must specify the GRAPHQL_HOSTNAME" 1>&2
  echo " " 1>&2
  echo "     e.g." 1>&2
  echo "     yarn db:hasura magic-graphql.iamnoah.com" 1>&2
  echo " " 1>&2

  exit 1
}

cd databases/$GRAPHQL_HOSTNAME
source .env.local
hasura console --admin-secret "$HASURA_ADMIN_SECRET"
