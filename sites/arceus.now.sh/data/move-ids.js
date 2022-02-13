const MovesById = require('./MovesById.js');

for (const id of Object.keys(MovesById.Lookup)) {
  const move = MovesById.Lookup[id];
  console.debug(move.id, ':', JSON.stringify({ ...move }));
}
