alter table "public"."dcsseeds_scrapePlayers_item"
  add constraint "dcsseeds_scrapePlayers_item_branchName_fkey"
  foreign key ("branchName")
  references "public"."dcsseeds_scrapePlayers_branch"
  ("name") on update restrict on delete restrict;
