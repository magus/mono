# arceus.now.sh

# TODO
- calculate all type combinations
  - what is the minimal type combination to hit every pokemon 1x?
  - what is the minimal type combination to hit every pokemon 2x?

- motion.div for ResultsContainer and add layout for animating the transition/movement as the type pills refine during search and container shifts up and down

- color category icons same as other sites
  - physical (red) special (gray) and status (light gray)


- correct MovesById with data from links below
  - https://m.bulbapedia.bulbagarden.net/wiki/List_of_moves_(Legends:_Arceus)
  - https://m.bulbapedia.bulbagarden.net/wiki/Move_mastery



- build simple calculator for calculating damage move_type against defending type_a + type_b
  - represent type effectiveness in a 2d array
    e.g.
      |        | Normal | Fire   | Water  | Grass  | ...
      | Normal |        |        |        |        | ...
      | Fire   |        |    ½   |    ½   |    2   | ...
      | Water  |        |    2   |    ½   |    ½   | ...
      | Grass  |        |    ½   |    2   |    ½   | ...

  - https://pokemondb.net/type

- show 'Type defense' on PokemonDetail
  - wrap to width of screen
  e.g.
  | NOR | FIR | WAT | ... (use first 3 letters + color to represent types)
  |  1  |  2  |  ½  | ... (0, ¼, ½, 1, 2, 4)

- show 'Stats' on PokemonDetail
  - show horizontal line bars
  - color for ranges (red, orange, yellow, green, bright green, bluish)
    - maybe use interpolate to generate colors between ranges
      e.g.
        [0,30] (red)
        [30,60] (orange)
        [60,90] (yellow)
        [90,120] (green)
        [120,150] (dark green)
        [150,255] (green blue)
    e.g.
      HP  255 -------------------------
      ATK 100 ----------                (100)
      .. etc.


- add optional slug to index (search) route
- selected by toggling buttons
  e.g.
    /moves?t=Fire,Ground,Rock
    /coverage?t=Ice,Electric
- lock types in grid at top, hide search input bar

- /moves (aka offense) toggle (off by default)
  - select up to four types
  - selecting types shows pokemon who can learn a move with type coverage

- /coverage (aka defense) toggle (off by default)
  - select as many types as you want
  - visualize percents as a bar (color subsections, show percent)
    e.g.
      | 0x |- ¼x -|-- ½x --|---- 1x ----|- 2x -| 4x |
      | X% |- X% -|-- X% --|---- X% ----|- X% -| X% |
  - animate coverage bar widths
  - show types under each effectiveness
  - animate types between effectiveness groups
    e.g.
      | 2x | Normal, Rock, Dark, Steel
      | 1x | Fighting, Ground
      | 0x | Ghost

  - allow selecting a section on bar / type effectiveness group
  - selecting should clearly highlight bar section and type effectiveness group
  - shows all pokemon who fall into the selected effectiveness group
  - display total count of pokemon in effectiveness group
    e.g.
      "<b>X</b> Pokémon are <b>Immune</b>"
      "<b>X</b> Pokémon take <b>½x damage<b>"
  - consider defaulting to 2x being selected to demonstrate

- wrap logic for coverage visualization above into component and include on `/type/[type]` page

- optimize json data generation / delivery
  - avoid transforming data after fetching
  - generate once and pull in via fetch
  - extract logic from `fetch` into script in `data/` and output files
  - `await import` to pull in json data files output above
