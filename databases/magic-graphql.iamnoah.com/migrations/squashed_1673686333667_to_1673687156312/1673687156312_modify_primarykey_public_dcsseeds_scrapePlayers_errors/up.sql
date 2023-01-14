BEGIN TRANSACTION;
ALTER TABLE "public"."dcsseeds_scrapePlayers_errors" DROP CONSTRAINT "dcsseeds_scrapePlayers_errors_pkey";

ALTER TABLE "public"."dcsseeds_scrapePlayers_errors"
    ADD CONSTRAINT "dcsseeds_scrapePlayers_errors_pkey" PRIMARY KEY ("error", "note", "morgue", "turn", "loc");
COMMIT TRANSACTION;
