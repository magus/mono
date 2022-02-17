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

exports.Type = Type;

// // fill array with [0..18] then map back to type names
// // prettier-ignore
// const [Normal,Fire,Water,Grass,Electric,Ice,Fighting,Poison,Ground,Flying,Psychic,Bug,Rock,Ghost,Dragon,Dark,Steel,Fairy] = new Array(18).fill(0).map((_, i) => i);

// const TypeEnum = {
//   Normal,
//   Fire,
//   Water,
//   Grass,
//   Electric,
//   Ice,
//   Fighting,
//   Poison,
//   Ground,
//   Flying,
//   Psychic,
//   Bug,
//   Rock,
//   Ghost,
//   Dragon,
//   Dark,
//   Steel,
//   Fairy,
// };

// const TypeById = {
//   [TypeEnum.Normal]: Type.Normal,
//   [TypeEnum.Fire]: Type.Fire,
//   [TypeEnum.Water]: Type.Water,
//   [TypeEnum.Grass]: Type.Grass,
//   [TypeEnum.Electric]: Type.Electric,
//   [TypeEnum.Ice]: Type.Ice,
//   [TypeEnum.Fighting]: Type.Fighting,
//   [TypeEnum.Poison]: Type.Poison,
//   [TypeEnum.Ground]: Type.Ground,
//   [TypeEnum.Flying]: Type.Flying,
//   [TypeEnum.Psychic]: Type.Psychic,
//   [TypeEnum.Bug]: Type.Bug,
//   [TypeEnum.Rock]: Type.Rock,
//   [TypeEnum.Ghost]: Type.Ghost,
//   [TypeEnum.Dragon]: Type.Dragon,
//   [TypeEnum.Dark]: Type.Dark,
//   [TypeEnum.Steel]: Type.Steel,
//   [TypeEnum.Fairy]: Type.Fairy,
// };
