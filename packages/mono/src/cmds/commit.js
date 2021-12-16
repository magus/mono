export const command = 'commit';
export const desc = 'Generate message for changset and commit';

export function builder(yargs) {
  return yargs;
}

export function handler(argv) {
  console.log('[commit]', { argv });
}
