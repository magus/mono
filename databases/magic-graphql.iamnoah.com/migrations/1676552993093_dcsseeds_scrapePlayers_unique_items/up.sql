CREATE FUNCTION public."dcsseeds_scrapePlayers_items_version_seed"(input_seed text, input_version text)
 RETURNS SETOF "dcsseeds_scrapePlayers_item"
 LANGUAGE sql
 STABLE
AS $function$
    SELECT DISTINCT ON ("name", "branchName", "level", "branch_order") "timestamp", "name", "branchName", "level", "location", "fullVersion", "seed", "version", "morgue", "id", "playerId"
    FROM
          (
            SELECT
              *
            FROM
              "public"."dcsseeds_scrapePlayers_item"
            WHERE
              (
                (
                  "public"."dcsseeds_scrapePlayers_item"."seed" = input_seed
                )
                AND (
                  "public"."dcsseeds_scrapePlayers_item"."version" = input_version
                )
              )
          ) AS "_root.base"
          LEFT OUTER JOIN LATERAL (
            SELECT
              "_root.or.branch.base"."order" AS "branch_order"
            FROM
              (
                SELECT
                  *
                FROM
                  "public"."dcsseeds_scrapePlayers_branch"
                WHERE
                  (("_root.base"."branchName") = ("name"))
                LIMIT
                  1
              ) AS "_root.or.branch.base"
          ) AS "_root.or.branch" ON ('true')
    ORDER BY
      "branch_order" ASC NULLS LAST
      ,"level" ASC NULLS FIRST
$function$;
