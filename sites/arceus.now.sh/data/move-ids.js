const Moves = require('./Moves.js');

let id = 0;
for (const name of Object.keys(Moves.Lookup)) {
  id++;
  console.debug(id, ':', JSON.stringify({ name, ...Moves.Lookup[name] }));
}
