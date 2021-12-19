#!/bin/bash
set -e

if [ -z $AWS_S3_BUCKET_DIR ]; then
   echo "AWS_S3_BUCKET_DIR required in env"
   exit 1
fi

if [ -z $HASURA_HOST ]; then
   echo "HASURA_HOST required in env"
   exit 1
fi

if [ -z $HASURA_ADMIN_SECRET ]; then
   echo "[SECRET] HASURA_ADMIN_SECRET required in env"
   exit 1
fi

mkdir -p $AWS_S3_BUCKET_DIR

# schema
curl \
-X POST \
-H "Content-Type: application/json" \
-d '{"opts": ["--no-owner", "--no-acl", "--schema-only", "--schema", "public"], "clean_output": true}' \
-H "x-hasura-admin-secret: $HASURA_ADMIN_SECRET" \
$HASURA_HOST/v1alpha1/pg_dump \
> $AWS_S3_BUCKET_DIR/schema.sql

# hasura metadata
# e.g. roles, permissions, relationships, event triggers, etc.
curl $HASURA_HOST/v1/query \
  -H 'authority: github-database-backup' \
  -H 'pragma: no-cache' \
  -H 'cache-control: no-cache' \
  -H "x-hasura-admin-secret: $HASURA_ADMIN_SECRET" \
  -H 'content-type: application/json' \
  -H 'accept: */*' \
  -H "origin: $HASURA_HOST" \
  -H 'sec-fetch-site: same-origin' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-dest: empty' \
  -H "referer: $HASURA_HOST/console/settings/metadata-actions" \
  -H 'accept-language: en-US,en;q=0.9' \
  --data-binary '{"type":"export_metadata","args":{}}' \
  --compressed \
  --output $AWS_S3_BUCKET_DIR/metadata.json

# raw data
curl \
-X POST \
-H "Content-Type: application/json" \
-d '{"opts": ["--no-owner", "--no-acl", "--data-only", "--schema", "public"], "clean_output": true}' \
-H "x-hasura-admin-secret: $HASURA_ADMIN_SECRET" \
$HASURA_HOST/v1alpha1/pg_dump \
> $AWS_S3_BUCKET_DIR/data.sql
