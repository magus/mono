
# TODO
- calculate all type combinations
  - what is the minimal type combination to hit every pokemon 1x?
  - what is the minimal type combination to hit every pokemon 2x?

- optimize json data generation / delivery
  - avoid transforming data after fetching
  - generate once and pull in via fetch
  - extract `fetch` into script in `data/` and output files
  - `await import` to pull in json data files
