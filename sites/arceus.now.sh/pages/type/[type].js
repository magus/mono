export { Type as default } from '../../components/screens/Type';

import { Type } from '../../public/data/Type';
import { import_PokemonByType } from '../../src/import_PokemonByType';
import { import_MovesById } from '../../src/import_MovesById';

export async function getStaticPaths() {
  const paths = [];

  for (const type of Object.keys(Type)) {
    const params = { type };
    paths.push({ params });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(options) {
  const { type } = options.params;

  const MovesById = await import_MovesById();
  const PokemonByType = await import_PokemonByType();

  const pokemonList = PokemonByType[type];
  const moveList = Object.values(MovesById.Lookup).filter((move) => move.type === type);

  const props = {
    type,
    pokemonList,
    moveList,
  };

  return { props };
}
