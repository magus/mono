
CREATE TABLE "public"."dcsseeds_scrapePlayers_server" ("name" text NOT NULL, PRIMARY KEY ("name") , UNIQUE ("name"));

alter table "public"."dcsseeds_scrapePlayers"
  add constraint "dcsseeds_scrapePlayers_server_fkey"
  foreign key ("server")
  references "public"."dcsseeds_scrapePlayers_server"
  ("name") on update restrict on delete restrict;

alter table "public"."dcsseeds_scrapePlayers" add constraint "dcsseeds_scrapePlayers_name_server_key" unique ("name", "server");

alter table "public"."dcsseeds_scrapePlayers" add column "created_at" timestamptz
 null default now();

alter table "public"."dcsseeds_scrapePlayers" alter column "created_at" set not null;

alter table "public"."dcsseeds_scrapePlayers_server" add column "created_at" timestamptz
 not null default now();
