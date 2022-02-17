export async function import_MovesById() {
  const module = await import(
    /* webpackChunkName: "MovesById" */
    /* webpackPrefetch: true */
    '../public/data/MovesById.js'
  );

  return module;
}
