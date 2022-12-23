# Databases

## Running a Hasura console

Run the command below to access the Hasura console

```sh
mono db:hasura magic-graphql.iamnoah.com
```

## Setup

Open database folder and setup env to run `hasura` commands

```sh
cd databases/$GRAPHQL_HOSTNAME
source .env.local
```

### Migration squashing

> https://hasura.io/docs/latest/migrations-metadata-seeds/manage-migrations/#squash-migrations

Create nice combined migrations into a single commitable migration after adding and editing
in the Hasura console locally

```sh
hasura migrate squash --name "dcsseeds_scrapePlayers" --from 1671780901595 --admin-secret "$HASURA_ADMIN_SECRET"
```


### Force apply a migration

Show all migration status, `Not Present` may be the cause for failed squashes

```sh
hasura migrate status --admin-secret "$HASURA_ADMIN_SECRET"
```

Useful when status shows `Not Present` but the migration is already present

```sh
hasura migrate apply --version 1671786547207 --skip-execution --admin-secret "$HASURA_ADMIN_SECRET"
```
