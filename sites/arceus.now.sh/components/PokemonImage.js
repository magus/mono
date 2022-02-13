import Image from 'next/image';

export function PokemonImage(props) {
  let imageId;

  if (props.pokemon.num === 493 && ~['sprite', 'icon'].indexOf(props.type)) {
    imageId = zeroPad(props.pokemon.num, 3);
  } else {
    imageId = props.form.imageId;
  }

  const formName = props.form.name || props.pokemon.name;
  const images = getImages(imageId);
  const image = images[props.type];

  return <Image src={image.url} alt={formName} width={image.size} height={image.size} />;
}

function getImages(imageId) {
  return {
    sprite: { url: `https://www.serebii.net/pokedex-swsh/icon/${imageId}.png`, size: 36 },
    icon: { url: `https://www.serebii.net/legendsarceus/pokemon/icon/${imageId}.png`, size: 32 },
    small: { url: `https://www.serebii.net/legendsarceus/pokemon/small/${imageId}.png`, size: 120 },
    large: { url: `https://www.serebii.net/legendsarceus/pokemon/${imageId}.png`, size: 250 },
  };
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
