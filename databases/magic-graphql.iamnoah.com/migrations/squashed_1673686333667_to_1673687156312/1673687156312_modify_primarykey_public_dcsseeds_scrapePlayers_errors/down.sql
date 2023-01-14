alter table "public"."dcsseeds_scrapePlayers_errors" drop constraint "dcsseeds_scrapePlayers_errors_pkey";
alter table "public"."dcsseeds_scrapePlayers_errors"
    add constraint "dcsseeds_scrapePlayers_errors_pkey"
    primary key ("error", "note", "morgue", "turn");
