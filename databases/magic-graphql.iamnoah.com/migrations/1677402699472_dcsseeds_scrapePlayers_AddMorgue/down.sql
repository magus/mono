
-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."dcsseeds_scrapePlayers_server" add column "created_at" timestamptz
--  not null default now();

alter table "public"."dcsseeds_scrapePlayers" alter column "created_at" drop not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."dcsseeds_scrapePlayers" add column "created_at" timestamptz
--  null default now();

alter table "public"."dcsseeds_scrapePlayers" drop constraint "dcsseeds_scrapePlayers_name_server_key";

alter table "public"."dcsseeds_scrapePlayers" drop constraint "dcsseeds_scrapePlayers_server_fkey";

DROP TABLE "public"."dcsseeds_scrapePlayers_server";
