const Type = {
  Normal: 'Normal',
  Fire: 'Fire',
  Water: 'Water',
  Grass: 'Grass',
  Electric: 'Electric',
  Ice: 'Ice',
  Fighting: 'Fighting',
  Poison: 'Poison',
  Ground: 'Ground',
  Flying: 'Flying',
  Psychic: 'Psychic',
  Bug: 'Bug',
  Rock: 'Rock',
  Ghost: 'Ghost',
  Dragon: 'Dragon',
  Dark: 'Dark',
  Steel: 'Steel',
  Fairy: 'Fairy',
};

// fill array with [0..18] then map back to type names
// prettier-ignore
const [Normal,Fire,Water,Grass,Electric,Ice,Fighting,Poison,Ground,Flying,Psychic,Bug,Rock,Ghost,Dragon,Dark,Steel,Fairy] = new Array(18).fill(0).map((_, i) => i);

Type.Enum = {
  Normal,
  Fire,
  Water,
  Grass,
  Electric,
  Ice,
  Fighting,
  Poison,
  Ground,
  Flying,
  Psychic,
  Bug,
  Rock,
  Ghost,
  Dragon,
  Dark,
  Steel,
  Fairy,
};

Type.ById = {
  [Type.Enum.Normal]: Type.Normal,
  [Type.Enum.Fire]: Type.Fire,
  [Type.Enum.Water]: Type.Water,
  [Type.Enum.Grass]: Type.Grass,
  [Type.Enum.Electric]: Type.Electric,
  [Type.Enum.Ice]: Type.Ice,
  [Type.Enum.Fighting]: Type.Fighting,
  [Type.Enum.Poison]: Type.Poison,
  [Type.Enum.Ground]: Type.Ground,
  [Type.Enum.Flying]: Type.Flying,
  [Type.Enum.Psychic]: Type.Psychic,
  [Type.Enum.Bug]: Type.Bug,
  [Type.Enum.Rock]: Type.Rock,
  [Type.Enum.Ghost]: Type.Ghost,
  [Type.Enum.Dragon]: Type.Dragon,
  [Type.Enum.Dark]: Type.Dark,
  [Type.Enum.Steel]: Type.Steel,
  [Type.Enum.Fairy]: Type.Fairy,
};

exports.Type = Type;
