# dcss.now.sh

## 1.1.0

### Minor Changes

- 35aef7f: framer-motion6.5.1

## 1.0.0

### Major Changes

- 118d24d: db: optional error columns and auto created_at
- 188653d: db: unrand cache table and cron trigger

### Minor Changes

- 40d8036: db: update version seed items function to distinct on name
- e836e64: db: dcsseeds_scrapePlayers_item_search_name function
- 2246336: db: restart.sh every 4 hours and cleanup verbose logging
- 74dba87: db: search_name function use branch_level.order
- 454b789: db: foreign keys for update restrict and cascade deletes
- 5f8ab90: docs: dokku health check and git:from-image
- 5159465: db: cache unrand window to 30
- 320e367: db: index items by seed version

### Patch Changes

- 55d1ab3: db: branch_level table

## 0.3.0

### Minor Changes

- a852a9f: setup / install notes

  ```
  # setup dependencies for eslint
  mono ws dcss -- add -D @magusn/eslint-config-magusn

  # setup dependencies for @magusn/react
  mono ws dcss -- add @apollo/client@"^3.3.6" framer-motion@"^3.1.1" graphql-tag@"^2.11.0" next@"12.0.8" react@"^17.0.2" react-dom@"^17.0.2" styled-components@"^5.3.3" subscriptions-transport-ws@"^0.9.1"

  # copy files from ~/github/dcsseeds
  ```
