
ALTER TABLE "public"."dcsseeds_scrapePlayers_errors" ALTER COLUMN "loc" drop default;

ALTER TABLE "public"."dcsseeds_scrapePlayers_errors" ALTER COLUMN "turn" drop default;

ALTER TABLE "public"."dcsseeds_scrapePlayers_errors" ALTER COLUMN "morgue" drop default;

alter table "public"."dcsseeds_scrapePlayers_errors" alter column "note" set default '-'::text;

ALTER TABLE "public"."dcsseeds_scrapePlayers_errors" ALTER COLUMN "note" drop default;

alter table "public"."dcsseeds_scrapePlayers_errors" alter column "loc" drop not null;

alter table "public"."dcsseeds_scrapePlayers_errors" alter column "turn" drop not null;

alter table "public"."dcsseeds_scrapePlayers_errors" alter column "morgue" drop not null;

alter table "public"."dcsseeds_scrapePlayers_errors" alter column "note" drop not null;

alter table "public"."dcsseeds_scrapePlayers_errors" alter column "note" set default '-'::text;

alter table "public"."dcsseeds_scrapePlayers_errors" drop constraint "dcsseeds_scrapePlayers_errors_error_morgue_turn_loc_note_key";

alter table "public"."dcsseeds_scrapePlayers_errors" alter column "loc" set not null;

alter table "public"."dcsseeds_scrapePlayers_errors" alter column "turn" set not null;

alter table "public"."dcsseeds_scrapePlayers_errors" alter column "morgue" set not null;

alter table "public"."dcsseeds_scrapePlayers_errors" alter column "note" set not null;

alter table "public"."dcsseeds_scrapePlayers_errors" drop constraint "dcsseeds_scrapePlayers_errors_pkey";
alter table "public"."dcsseeds_scrapePlayers_errors"
    add constraint "dcsseeds_scrapePlayers_errors_pkey"
    primary key ("loc", "turn", "morgue", "note", "error");

alter table "public"."dcsseeds_scrapePlayers_errors" drop constraint "dcsseeds_scrapePlayers_errors_id_key";

alter table "public"."dcsseeds_scrapePlayers_errors" drop column "id" cascade
alter table "public"."dcsseeds_scrapePlayers_errors" drop column "id";
-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."dcsseeds_scrapePlayers_errors" add column "created_at" timestamptz
--  not null default now();
