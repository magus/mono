export async function import_ArceusPokedexByNumber() {
  const module = await import(
    /* webpackChunkName: "ArceusPokedexByNumber" */
    /* webpackPrefetch: true */
    '../public/data/ArceusPokedexByNumber.json'
  );

  const ArceusPokedexByNumber = {};

  for (const num in module) {
    if (num === 'default') continue;
    ArceusPokedexByNumber[num] = module[num];
  }

  return ArceusPokedexByNumber;
}
