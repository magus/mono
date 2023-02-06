
CREATE EXTENSION pg_trgm;

CREATE INDEX dcsseeds_scrapePlayers_item_name_gin_idx ON "public"."dcsseeds_scrapePlayers_item"
USING GIN ((name) gin_trgm_ops);
