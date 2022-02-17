export { Move as default } from '../../components/screens/Move';

import { import_ArceusPokedexByNumber } from '../../src/import_ArceusPokedexByNumber';
import { import_MovesById } from '../../src/import_MovesById';

export async function getStaticPaths() {
  const MovesById = await import_MovesById();

  const paths = [];

  for (const id of Object.keys(MovesById.Lookup)) {
    const params = { id };
    paths.push({ params });
  }

  return {
    paths,
    fallback: false,
  };
}

const create_MoveIdPokemonMap = (async function () {
  const ArceusPokedexByNumber = await import_ArceusPokedexByNumber();

  // build a map of pokemon to ids
  const moveIdPokemonMap = {};

  function addMove(moveId, num, formIndex) {
    if (!moveIdPokemonMap[moveId]) moveIdPokemonMap[moveId] = new Set();
    moveIdPokemonMap[moveId].add(JSON.stringify({ num, formIndex }));
  }

  for (const num in ArceusPokedexByNumber) {
    const pokemon = ArceusPokedexByNumber[num];
    for (let i = 0; i < pokemon.forms.length; i++) {
      const form = pokemon.forms[i];
      form.moves.tutor.forEach((moveId) => addMove(moveId, pokemon.num, i));
      form.moves.learn.forEach(([moveId]) => addMove(moveId, pokemon.num, i));
    }
  }

  return moveIdPokemonMap;
})();

export async function getStaticProps(options) {
  const { id } = options.params;

  const MoveIdPokemonMap = await create_MoveIdPokemonMap;
  const MovesById = await import_MovesById();
  const ArceusPokedexByNumber = await import_ArceusPokedexByNumber();

  const pokemonList = Array.from(MoveIdPokemonMap[id])
    .map((json) => JSON.parse(json))
    .map((params) => {
      const pokemon = ArceusPokedexByNumber[params.num];
      const form = pokemon.forms[params.formIndex];

      return { ...pokemon, form };
    });

  const move = MovesById.Lookup[id];

  const props = {
    id,
    pokemonList,
    move,
  };

  return { props };
}
