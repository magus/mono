alter table "public"."dcsseeds_scrapePlayers_item" add constraint "dcsseeds_scrapePlayers_item_version_seed_branchName_level_name_key" unique ("version", "seed", "branchName", "level", "name");
