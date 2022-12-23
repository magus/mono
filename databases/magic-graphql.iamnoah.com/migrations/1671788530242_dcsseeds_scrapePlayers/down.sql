

DROP TABLE "public"."dcsseeds_scrapePlayers_errors";

alter table "public"."dcsseeds_scrapePlayers_item" drop constraint "dcsseeds_scrapePlayers_item_name_branchName_level_morgue_seed_fullVersion_key";

DROP TABLE "public"."dcsseeds_scrapePlayers_item";

DROP TABLE "public"."dcsseeds_scrapePlayers_seedVersion";

DROP TABLE "public"."dcsseeds_scrapePlayers_branch";

DROP TABLE "public"."dcsseeds_scrapePlayers";
