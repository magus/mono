


CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."dcsseeds_scrapePlayers"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "lastRun" timestamptz, "name" text NOT NULL, "server" text NOT NULL, "morgues" jsonb NOT NULL DEFAULT jsonb_build_object(), PRIMARY KEY ("id") );

CREATE TABLE "public"."dcsseeds_scrapePlayers_branch"("name" text NOT NULL, "order" integer NOT NULL DEFAULT 0, PRIMARY KEY ("name") );

CREATE TABLE "public"."dcsseeds_scrapePlayers_seedVersion"("seed" text NOT NULL, "version" text NOT NULL, PRIMARY KEY ("seed","version") );

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."dcsseeds_scrapePlayers_item"("timestamp" timestamptz NOT NULL, "name" text NOT NULL, "branchName" text NOT NULL, "level" integer NOT NULL, "location" text NOT NULL, "fullVersion" text NOT NULL, "seed" text NOT NULL, "version" text NOT NULL, "morgue" text NOT NULL, "id" uuid NOT NULL DEFAULT gen_random_uuid(), "playerId" uuid NOT NULL, PRIMARY KEY ("id") );

alter table "public"."dcsseeds_scrapePlayers_item" add constraint "dcsseeds_scrapePlayers_item_name_branchName_level_morgue_seed_fullVersion_key" unique ("name", "branchName", "level", "morgue", "seed", "fullVersion");

CREATE TABLE "public"."dcsseeds_scrapePlayers_errors"("error" text NOT NULL, "note" text NOT NULL, "morgue" text NOT NULL, "turn" text NOT NULL, PRIMARY KEY ("error","note","morgue","turn") );


alter table "public"."dcsseeds_scrapePlayers_item" alter column "level" drop not null;

alter table "public"."dcsseeds_scrapePlayers_errors" add column "loc" text
 not null;

BEGIN TRANSACTION;
ALTER TABLE "public"."dcsseeds_scrapePlayers_errors" DROP CONSTRAINT "dcsseeds_scrapePlayers_errors_pkey";

ALTER TABLE "public"."dcsseeds_scrapePlayers_errors"
    ADD CONSTRAINT "dcsseeds_scrapePlayers_errors_pkey" PRIMARY KEY ("error", "note", "morgue", "turn", "loc");
COMMIT TRANSACTION;
