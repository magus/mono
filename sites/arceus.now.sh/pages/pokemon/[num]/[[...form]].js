export { PokemonDetail as default } from '../../../components/screens/PokemonDetail';

import { import_ArceusPokedexByNumber } from '../../../src/import_ArceusPokedexByNumber';

export async function getStaticPaths() {
  const ArceusPokedexByNumber = await import_ArceusPokedexByNumber();

  const paths = [];

  for (const num in ArceusPokedexByNumber) {
    const pokemon = ArceusPokedexByNumber[num];
    for (const form of pokemon.forms) {
      if (form.name) {
        paths.push({ params: { num, form: [form.name] } });
      } else {
        paths.push({ params: { num, form: [] } });
      }
    }
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(options) {
  const { num } = options.params;
  const [form] = options.params.form || [];

  const ArceusPokedexByNumber = await import_ArceusPokedexByNumber();

  // hydrate a local pokedex with evolutions
  const pokedex = {};

  function hydratePokemon(n) {
    if (pokedex[n]) return;

    pokedex[n] = ArceusPokedexByNumber[n];

    pokedex[n].evolutions.prev.forEach(hydratePokemon);
    pokedex[n].evolutions.next.forEach(hydratePokemon);
  }

  hydratePokemon(num);

  const props = {
    num,
    form: [],
    pokedex,
  };

  if (form) {
    props.form = [form];
  }

  return { props };
}
