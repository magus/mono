CREATE  INDEX "dcsseeds_scrapeplayers_item_seedVersion" on
  "public"."dcsseeds_scrapePlayers_item" using btree ("seed", "version");
