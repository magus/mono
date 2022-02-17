import { import_ArceusPokedexByNumber } from './import_ArceusPokedexByNumber';

export async function import_PokemonByType() {
  const ArceusPokedexByNumber = await import_ArceusPokedexByNumber();

  const targets = {};
  targets.all = [];

  for (const pokemon of Object.values(ArceusPokedexByNumber)) {
    for (const form of pokemon.forms) {
      const [type_a, type_b] = form.types;
      if (type_a && !targets[type_a]) targets[type_a] = [];
      if (type_b && !targets[type_b]) targets[type_b] = [];

      const formPokemon = { ...pokemon, form };
      targets.all.push(formPokemon);
      type_a && targets[type_a].push(formPokemon);
      type_b && targets[type_b].push(formPokemon);
    }
  }

  return targets;
}
