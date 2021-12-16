import * as commit from './commit.js';
import * as root from './root.js';

export const commandLookup = { commit, root };
export const commands = Object.values(commandLookup);
