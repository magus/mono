CREATE OR REPLACE FUNCTION public."dcsseeds_scrapePlayers_item_search_name"(search_name text)
 RETURNS SETOF "dcsseeds_scrapePlayers_item"
 LANGUAGE sql
 STABLE
AS $function$
    SELECT
      DISTINCT ON ("branch_order", "level", "seed", "version") 
      "timestamp",
      "name",
      "branchName",
      "level",
      "location",
      "fullVersion",
      "seed",
      "version",
      "morgue",
      "id",
      "playerId"
    FROM
      (
        SELECT
          *
        FROM
          "public"."dcsseeds_scrapePlayers_item"
        WHERE
          (
            ("public"."dcsseeds_scrapePlayers_item"."name") ILIKE (search_name)
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
              "public"."dcsseeds_scrapePlayers_branch_level"
            WHERE
              (("_root.base"."branchName") = ("name"))
              AND (("_root.base"."level") = ("level"))
            LIMIT
              1
          ) AS "_root.or.branch.base"
      ) AS "_root.or.branch" ON ('true')
    ORDER BY
      "branch_order" ASC NULLS LAST,
      "level" ASC NULLS FIRST
$function$;
