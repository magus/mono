const { PokedexByName } = require('./PokedexByName.js');
const Moves = require('./Moves.js');

const fs = require('fs');
const path = require('path');
const { verify } = require('crypto');

// gather each numerical pokemon into an array (forms)
// for example, 849 contains all the forms of Toxtricity

const PokedexByNumber = {};
for (const nameKey of Object.keys(PokedexByName)) {
  const pokemon = PokedexByName[nameKey];

  if (!PokedexByNumber[pokemon.num]) {
    PokedexByNumber[pokemon.num] = { nameKey, forms: [] };
  }

  PokedexByNumber[pokemon.num].forms.push(pokemon);
}

// console.debug({ PokedexByNumber });
// console.debug(Object.keys(PokedexByNumber).length);
// console.debug(PokedexByNumber[849]);

// read in and parse arceus-pokedex.txt
const ArceusPokedexText = fs.readFileSync(path.join(__dirname, './arceus-pokedex.txt')).toString('utf8');
const ArceusPokedexTextLines = ArceusPokedexText.split('\n');

const RE = {
  PokemonHeader:
    /(?<name>.*?) - (?<stats>\d+\/\d+\/\d+\/\d+\/\d+\/\d+) - (?<type_a>.*?)\/(?<type_b>.*?) - (?<abilities>.*)/,
};

const EvolutionItems = {
  80: 'Sun Stone',
  81: 'Moon Stone',
  82: 'Fire Stone',
  83: 'Thunder Stone',
  84: 'Water Stone',
  85: 'Leaf Stone',
  107: 'Shiny Stone',
  108: 'Dusk Stone',
  109: 'Dawn Stone',
  110: 'Oval Stone',
  233: 'Metal Coat',
  252: 'Upgrade',
  321: 'Protector',
  322: 'Electirizer',
  324: 'Dubious Disc',
  325: 'Reaper Cloth',
  326: 'Razor Claw',
  327: 'Razor Fang',
  323: 'Magmarizer',
  849: 'Ice Stone',
  1611: 'Linking Cord',
  1691: 'Black Augurite',
};

const EvolutionMoves = {
  102: 'Mimic',
  205: 'Rollout',
  246: 'Ancient Power',
  458: 'Double Hit',
};

const Weather = {
  1: 'Rain',
};

const VerifiedEntries = {
  // pikachu: 1,
  // alakazam: 1,
  // machamp: 1,
  // gengar: 1,
  // eevee: 1,
  // snorlax: 1,
  // pichu: 1,
  // lilligant: 1,
  // avalugg: 1,
  // vulpix: 1,
  // ninetales: 1,
  // sneasel: 1,
  // wormadam: 1,
  // cherrim: 1,
  // rotom: 1,
  // dialga: 1,
  // palkia: 1,
  // giratina: 1,
  // shaymin: 1,
  // arceus: 1,
  // tornadus: 1,
  // thundurus: 1,
  // landorus: 1,
  // basculegion: 1,
  // enamorus: 1,
};

// ArceusPokedex Tokenizer
let line = 0;
const clean = (s) => (typeof s === 'string' ? s.trim() : s);
const peek = () => ArceusPokedexTextLines[line];
const read = () => clean(ArceusPokedexTextLines[line++]);

const ArceusPokedex = [];
const TrackEvolutions = {};
let pokemon;

try {
  while (peek()) {
    if (RE.PokemonHeader.test(peek())) {
      // console.debug(line, peek());

      // start new pokemon entry
      pokemon = {
        evolutions: [],
        moves: {
          tutor: [],
          learn: [],
        },
      };
      ArceusPokedex.push(pokemon);

      const header = read().match(RE.PokemonHeader).groups;
      Object.assign(pokemon, header);

      pokemon.types = [pokemon.type_a];
      if (pokemon.type_b !== pokemon.type_a) {
        pokemon.types.push(pokemon.type_b);
      }

      pokemon.abilities = pokemon.abilities.split('/');
      const [hp, atk, def, spa, spd, spe] = pokemon.stats.split('/').map(toNumber);
      pokemon.stats = { hp, atk, def, spa, spd, spe };

      delete pokemon.type_a;
      delete pokemon.type_b;

      const nameLookup = pokemon.name
        .toLowerCase()
        .replace(/-\d+/, '')
        .replace('.', '')
        .replace(/\s/g, '')
        .replace('-', '');

      pokemon.pokedex = PokedexByNumber[PokedexByName[nameLookup].num];

      if (!pokemon.pokedex) {
        throw new Error(`Unable to find pokedex entry [${JSON.stringify({ nameLookup, pokemon })}]`);
      }

      continue;
    }

    if (~peek().indexOf('Evolution(s)')) {
      read();
      while (!~peek().indexOf('Tutor Moves') && !~peek().indexOf('Learned Moves')) {
        const evolutionParts = read().split(',').map(toNumber);

        const [evolutionKind, , pokemonId, , level] = evolutionParts;
        const evolution = { kind: null, pokemonId };
        if (level) {
          evolution.level = level;
        }

        try {
          switch (evolutionKind) {
            case 1: {
              evolution.kind = 'happiness';
              break;
            }
            case 2: {
              evolution.kind = 'happiness-day';
              break;
            }
            case 3: {
              evolution.kind = 'happiness-night';
              break;
            }
            case 4: {
              evolution.kind = 'level';
              break;
            }
            case 5: {
              evolution.kind = 'trade';
              break;
            }

            case 8:
            case 48:
            case 49: {
              evolution.kind = 'item';
              const [, itemId] = evolutionParts;
              evolution.item = EvolutionItems[itemId];
              if (!evolution.item) {
                throw new Error('Unrecognized item evolution');
              }
              break;
            }
            case 21: {
              evolution.kind = 'move';
              const [, moveId] = evolutionParts;
              evolution.move = EvolutionMoves[moveId];
              if (!evolution.move) {
                throw new Error('Unrecognized move evolution');
              }
              break;
            }
            case 17: {
              evolution.kind = 'male-item';
              const [, itemId] = evolutionParts;
              evolution.item = EvolutionItems[itemId];
              if (!evolution.item) {
                throw new Error('Unrecognized item evolution');
              }
              break;
            }
            case 18: {
              evolution.kind = 'female-item';
              const [, itemId] = evolutionParts;
              evolution.item = EvolutionItems[itemId];
              if (!evolution.item) {
                throw new Error('Unrecognized item evolution');
              }
              break;
            }
            case 31: {
              evolution.kind = 'level-weather';
              const [, , , weatherId] = evolutionParts;
              evolution.weather = Weather[weatherId];
              if (!evolution.weather) {
                throw new Error('Unrecognized level weather evolution');
              }

              break;
            }
            case 53: {
              evolution.kind = 'special';
              evolution.description = 'Male: 300 Recoil Damage using Strong Wave Crash';
              break;
            }
            case 54: {
              evolution.kind = 'special';
              evolution.description = 'Female: 300 Recoil Damage using Agile Wave Crash';
              break;
            }
            case 22: {
              const [, partyPokemonId] = evolutionParts;
              evolution.kind = 'pokemon-party';
              evolution.partyPokemonId = partyPokemonId;
              break;
            }
            case 23: {
              evolution.kind = 'male';
              break;
            }
            case 24: {
              evolution.kind = 'female';
              break;
            }
            case 25: {
              evolution.kind = 'special';
              evolution.description = 'Coronet Highlands';
              break;
            }
            case 26: {
              evolution.kind = 'special';
              evolution.description = 'Mossy Rock in The Heartwood area of Obsidian Fieldlands';
              break;
            }
            case 27: {
              evolution.kind = 'special';
              evolution.description = 'Ice Rock between Bonechill Wastes and Avalugg’s Legacy in Alabaster Icelands';
              break;
            }
            case 29: {
              evolution.kind = 'special';
              evolution.description = 'Max Friendship with a Fairy move';
              break;
            }
            case 12:
            case 13: {
              evolution.kind = 'special';
              evolution.description = 'Random chance';
              break;
            }
            case 50: {
              evolution.kind = 'special';
              evolution.description = 'Use a Peat Block in Crimson Mirelands during a full moon';
              break;
            }

            case 51: {
              evolution.kind = 'special';
              evolution.description = 'Psyshield Bash 20 times in Agile Style';
              break;
            }
            case 52: {
              evolution.kind = 'special';
              evolution.description = 'Use Barb Barrage 20 times in Strong Style';
              break;
            }

            // // capture unknown groups to compare at end
            // case 99999: {
            //   if (!TrackEvolutions[evolutionKind]) TrackEvolutions[evolutionKind] = [];
            //   TrackEvolutions[evolutionKind].push({
            //     pokemon: pokemon.pokedex.nameKey,
            //     evolutionParts: evolutionParts.join(','),
            //   });
            //   break;
            // }
            default:
              throw new Error('Unrecognized evolution');
          }
        } catch (err) {
          console.error({ evolutionParts, evolution, name: PokedexByNumber[evolution.pokemonId].nameKey });
          throw err;
        }

        // console.debug({ evolution }, PokedexByNumber[evolution.pokemonId].nameKey);
        pokemon.evolutions.push(evolution);
      }
    }

    if (~peek().indexOf('Tutor Moves')) {
      read();
      while (!~peek().indexOf('Learned Moves')) {
        pokemon.moves.tutor.push(verifyMove(read()));
      }
    }

    if (~peek().indexOf('Learned Moves')) {
      read();
      while (peek() && !RE.PokemonHeader.test(peek())) {
        const match = read().match(/(?<name>.*?) @ (?<learn>\d+), mastered @ (?<master>\d+)/);
        const move = { ...match.groups };
        move.name = verifyMove(move.name);
        move.learn = toNumber(move.learn);
        move.master = toNumber(move.master);
        pokemon.moves.learn.push(move);
      }
    }

    pokemon.offenseTypes = {};
    for (const moveName of [...pokemon.moves.tutor, ...pokemon.moves.learn.map((m) => m.name)]) {
      const move = Moves.Lookup[moveName];
      if (move.class !== Moves.Class.Status) {
        pokemon.offenseTypes[move.type] = 1;
      }
    }
    // console.debug(pokemon.pokedex.nameKey, pokemon.offenseTypes);

    // consume whitespace between entries
    while (!peek() && line <= ArceusPokedexTextLines.length) {
      // console.debug('skipping', line);
      read();
    }

    // console.debug(line, peek());
  }

  // console.debug('ArceusPokedex', ArceusPokedex.length);
  // console.debug(ArceusPokedex[0]);
  // console.debug(ArceusPokedex[ArceusPokedex.length - 1]);

  // console.debug(JSON.stringify({ TrackEvolutions }, null, 2));
} catch (err) {
  console.error({ line }, peek());
  console.error(err);
}

// now with ArceusPokedex we need to map the correct forms
// so first collect by name
const ArceusPokedexByName = {};
const ArceusPokedexList = [];
const ArceusPokedexById = {};

for (const pokemon of ArceusPokedex) {
  const name = pokemon.pokedex.nameKey;

  if (!ArceusPokedexByName[name]) ArceusPokedexByName[name] = [];
  ArceusPokedexByName[name].push(pokemon);
}

// now look at each for duplicate entries
for (const name of Object.keys(ArceusPokedexByName)) {
  // capture all entries then reset, preparing to replace with correct associations
  // we select one form to associate with the arceus pokedex entry
  const allEntries = ArceusPokedexByName[name];
  const [firstEntry, ...otherEntries] = allEntries;

  function capture(entry, form) {
    ArceusPokedexList.push({ ...entry, pokedex: form });
  }

  function verifyManually(scenario) {
    // manually mark entries after verifying they look correct
    if (!VerifiedEntries[name]) {
      console.debug('allEntries', allEntries);
      console.debug('forms', firstEntry.pokedex.forms);
      console.debug('ArceusPokedexByName[name]', ArceusPokedexByName[name]);
      allEntries.forEach((e) => console.log(e.moves));
      throw new Error(scenario);
    }
  }

  if (allEntries.length === 1 && firstEntry.pokedex.forms.length === 1) {
    console.debug(name, 'simple single entry');
    const [firstForm] = firstEntry.pokedex.forms;
    capture(firstEntry, firstForm);
    continue;
  }

  // are all entries the same?
  let match = true;
  for (const entry of otherEntries) {
    if (!isEqual(firstEntry.types, entry.types)) match = false;
    if (!isEqual(firstEntry.stats, entry.stats)) match = false;
    if (!isEqual(firstEntry.moves.tutor, entry.moves.tutor)) match = false;
    if (!isEqual(firstEntry.moves.learn, entry.moves.learn)) match = false;
  }
  if (match && firstEntry.pokedex.forms.length === 1) {
    console.debug(name, 'simple single entry');
    const [firstForm] = firstEntry.pokedex.forms;
    capture(firstEntry, firstForm);
    continue;
  }

  // handle multiple entry forms manually
  const ManualFormAssociations = {
    pikachu: ['Pikachu'],
    alakazam: ['Alakazam'],
    machamp: ['Machamp'],
    gengar: ['Gengar'],
    eevee: ['Eevee'],
    snorlax: ['Snorlax'],
    pichu: ['Pichu'],
    steelix: ['Steelix'],
    scizor: ['Scizor'],
    heracross: ['Heracross'],
    gardevoir: ['Gardevoir'],
    glalie: ['Glalie'],
    garchomp: ['Garchomp'],
    lucario: ['Lucario'],
    abomasnow: ['Abomasnow'],
    gallade: ['Gallade'],
    basculin: ['Basculin'],
    cherrim: ['Cherrim', 'Cherrim-Sunshine'],
    dialga: ['Dialga', 'Dialga-Origin'],
    palkia: ['Palkia', 'Palkia-Origin'],
    giratina: ['Giratina', 'Giratina-Origin'],
    tornadus: ['Tornadus', 'Tornadus-Therian'],
    thundurus: ['Thundurus', 'Thundurus-Therian'],
    landorus: ['Landorus', 'Landorus-Therian'],
    basculegion: ['Basculegion', 'Basculegion-F'],
    enamorus: ['Enamorus', 'Enamorus-Therian'],
  };

  if (ManualFormAssociations[name]) {
    for (let i = 0; i < allEntries.length; i++) {
      const entry = allEntries[i];
      const formName = ManualFormAssociations[name][i];
      for (const form of entry.pokedex.forms) {
        if (formName === form.name) {
          console.debug('manual map', entry.name, form.name);
          capture(entry, form);
        }
      }
    }

    if (ArceusPokedexByName[name].length !== allEntries.length) {
      verifyManually('insufficient manual mappings');
    }

    continue;
  }

  // ...otherwise find matching type entries

  for (const entry of allEntries) {
    const typeMatches = [];

    for (const form of entry.pokedex.forms) {
      if (isEqual(entry.types, form.types)) {
        typeMatches.push(form);
        // console.debug('matching form found!');
        // console.error(entry.pokedex.nameKey, entry.pokedex.forms);
        // console.debug(ArceusPokedexByName[name]);
      }
    }

    if (typeMatches.length === 1) {
      // single type match, we can associate without checking
      const [form] = typeMatches;
      capture(entry, form);
      if (name === 'vulpix') {
        console.debug(entry, form);
        console.debug(ArceusPokedexList[ArceusPokedexList.length - 1]);
      }
      console.debug('type match', name, entry.types);
      continue;
    }

    // either no type matches or multiple type matches
    // must manually associate above to avoid it falling here
    verifyManually('type matching');
    continue;
  }
}

// generate final output array of pokemon
for (const pokemon of ArceusPokedexList) {
  pokemon.name = pokemon.pokedex.name;

  let imageId = zeroPad(pokemon.pokedex.num, 3);
  if (pokemon.pokedex.forme === 'Hisui') {
    imageId += '-h';
  } else if (pokemon.pokedex.forme === 'Alola') {
    imageId += '-a';
  } else if (pokemon.pokedex.forme === 'Sandy') {
    imageId += '-s';
  } else if (pokemon.pokedex.forme === 'Trash') {
    imageId += '-t';
  } else if (pokemon.pokedex.forme === 'Sunshine') {
    imageId += '-s';
  } else if (pokemon.pokedex.forme === 'Origin') {
    imageId += '-o';
  } else if (pokemon.pokedex.forme === 'Sky') {
    imageId += '-s';
  } else if (pokemon.pokedex.forme === 'Therian') {
    imageId += '-t';
  } else if (pokemon.pokedex.forme === 'F') {
    imageId += '-f';
  } else if (pokemon.pokedex.baseSpecies === 'Arceus') {
    const [type] = pokemon.types;
    imageId += `-${type.toLowerCase()}`;
  } else if (pokemon.pokedex.baseSpecies === 'Rotom') {
    switch (pokemon.pokedex.forme) {
      case 'Heat':
        imageId += '-h';
        break;
      case 'Wash':
        imageId += '-w';
        break;
      case 'Frost':
        imageId += '-f';
        break;
      case 'Fan':
        imageId += '-s';
        break;
      case 'Mow':
        imageId += '-m';
        break;
      default:
        console.debug(pokemon);
        console.error(pokemon.pokedex.forme);
        throw new Error('unhandled pokemon forme');
    }
  } else if (pokemon.pokedex.forme) {
    console.debug(pokemon);
    console.error(pokemon.pokedex.forme);
    throw new Error('unhandled pokemon forme');
  }

  imageId += '.png';

  pokemon.images = {
    sprite: `https://www.serebii.net/pokedex-swsh/icon/${imageId}`,
    small: `https://www.serebii.net/swordshield/pokemon/small/${imageId}`,
    icon: `https://www.serebii.net/legendsarceus/pokemon/icon/${imageId}`,
  };

  // if (pokemon.name === 'Vulpix-Alola') {
  //   console.debug(pokemon);
  // }
  // if (pokemon.pokedex.baseSpecies === 'Arceus') {
  //   console.debug(pokemon);
  // }
  if (pokemon.pokedex.baseSpecies === 'Rotom') {
    console.debug(pokemon);
  }
}

function toNumber(v) {
  return parseInt(v, 10);
}

function isEqual(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((_, i) => isEqual(a[i], b[i]));
  } else if (typeof a === 'object' && typeof b === 'object') {
    if (!isEqual(Object.keys(a), Object.keys(b))) {
      return false;
    }
    return Object.keys(a).every((key) => isEqual(a[key], b[key]));
  } else {
    return a === b;
  }
}

function verifyMove(move) {
  if (!Moves.Lookup[move] || !Moves.Lookup[move].type) {
    throw new Error(`Unrecognized moves [${move}]`);
  }

  return move;
}

function zeroPad(number, digits) {
  let result = '';
  const pad = digits - String(number).length;
  for (let i = 0; i < pad; i++) {
    result += '0';
  }
  result += String(number);
  return result;
}