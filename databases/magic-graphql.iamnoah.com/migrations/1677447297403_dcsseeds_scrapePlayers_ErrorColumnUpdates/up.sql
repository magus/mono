
alter table "public"."dcsseeds_scrapePlayers_errors" add column "created_at" timestamptz
 not null default now();

CREATE EXTENSION IF NOT EXISTS pgcrypto;
alter table "public"."dcsseeds_scrapePlayers_errors" add column "id" uuid
 not null default gen_random_uuid();

alter table "public"."dcsseeds_scrapePlayers_errors" add constraint "dcsseeds_scrapePlayers_errors_id_key" unique ("id");

BEGIN TRANSACTION;
ALTER TABLE "public"."dcsseeds_scrapePlayers_errors" DROP CONSTRAINT "dcsseeds_scrapePlayers_errors_pkey";

ALTER TABLE "public"."dcsseeds_scrapePlayers_errors"
    ADD CONSTRAINT "dcsseeds_scrapePlayers_errors_pkey" PRIMARY KEY ("id");
COMMIT TRANSACTION;

alter table "public"."dcsseeds_scrapePlayers_errors" alter column "note" drop not null;

alter table "public"."dcsseeds_scrapePlayers_errors" alter column "morgue" drop not null;

alter table "public"."dcsseeds_scrapePlayers_errors" alter column "turn" drop not null;

alter table "public"."dcsseeds_scrapePlayers_errors" alter column "loc" drop not null;

alter table "public"."dcsseeds_scrapePlayers_errors" add constraint "dcsseeds_scrapePlayers_errors_error_morgue_turn_loc_note_key" unique ("error", "morgue", "turn", "loc", "note");

ALTER TABLE "public"."dcsseeds_scrapePlayers_errors" ALTER COLUMN "note" drop default;

alter table "public"."dcsseeds_scrapePlayers_errors" alter column "note" set not null;

alter table "public"."dcsseeds_scrapePlayers_errors" alter column "morgue" set not null;

alter table "public"."dcsseeds_scrapePlayers_errors" alter column "turn" set not null;

alter table "public"."dcsseeds_scrapePlayers_errors" alter column "loc" set not null;

alter table "public"."dcsseeds_scrapePlayers_errors" alter column "note" set default '-';

alter table "public"."dcsseeds_scrapePlayers_errors" alter column "note" set default ''::text;

alter table "public"."dcsseeds_scrapePlayers_errors" alter column "morgue" set default ''::text;

alter table "public"."dcsseeds_scrapePlayers_errors" alter column "turn" set default ''::text;

alter table "public"."dcsseeds_scrapePlayers_errors" alter column "loc" set default ''::text;
