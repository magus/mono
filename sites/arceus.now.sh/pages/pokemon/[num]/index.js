export { PokemonDetail as default } from '../../../components/screens/PokemonDetail';

export async function getStaticPaths() {
  const ArceusPokedexByNumber = await import('../../../data/ArceusPokedexByNumber.json');

  const paths = [];

  for (const num in ArceusPokedexByNumber) {
    if (num !== 'default') {
      paths.push({ params: { num } });
    }
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(options) {
  const { num } = options.params;
  const ArceusPokedexByNumber = await import('../../../data/ArceusPokedexByNumber.json');

  // hydrate a local pokedex with evolutions
  const pokedex = {};

  function hydratePokemon(n) {
    if (pokedex[n]) return;

    pokedex[n] = ArceusPokedexByNumber[n];

    pokedex[n].evolutions.prev.forEach(hydratePokemon);
    pokedex[n].evolutions.next.forEach(hydratePokemon);
  }

  hydratePokemon(num);

  return {
    props: {
      num,
      pokedex,
    },
  };
}
