import ArceusPokedexByNumber from '../../data/ArceusPokedexByNumber.json';
import Image from 'next/image';

function getImages(imageId) {
  return {
    sprite: `https://www.serebii.net/pokedex-swsh/icon/${imageId}.png`,
    icon: `https://www.serebii.net/legendsarceus/pokemon/icon/${imageId}.png`,
    small: `https://www.serebii.net/swordshield/pokemon/small/${imageId}.png`,
    large: `https://www.serebii.net/swordshield/pokemon/${imageId}.png`,
  };
}

export default function PokemonDetail(props) {
  const pokemon = props.pokedex[props.num];

  return (
    <div>
      {JSON.stringify(props)}
      {pokemon.forms.map((form) => {
        const formName = form.name || pokemon.name;
        const images = getImages(form.imageId);
        return <Image key={formName} src={images.large} alt={formName} width={250} height={250} />;
      })}
    </div>
  );
}

export async function getStaticPaths() {
  const paths = [];

  for (const num in ArceusPokedexByNumber) {
    paths.push({ params: { num } });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // hydrate a local pokedex with evolutions
  const pokedex = {};

  function hydratePokemon(n) {
    if (pokedex[n]) return;
    pokedex[n] = ArceusPokedexByNumber[n];
    pokedex[n].evolutions.prev.forEach(hydratePokemon);
    pokedex[n].evolutions.next.forEach(hydratePokemon);
  }

  const { num } = params;
  hydratePokemon(num);

  return {
    props: {
      num,
      pokedex,
    },
  };
}
