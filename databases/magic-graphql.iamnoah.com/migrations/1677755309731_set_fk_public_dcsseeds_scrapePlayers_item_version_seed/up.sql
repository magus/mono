alter table "public"."dcsseeds_scrapePlayers_item"
  add constraint "dcsseeds_scrapePlayers_item_version_seed_fkey"
  foreign key ("version", "seed")
  references "public"."dcsseeds_scrapePlayers_seedVersion"
  ("version", "seed") on update restrict on delete cascade;
