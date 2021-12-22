import * as commit from './commit.js';
import * as root from './root.js';
import * as workspace from './workspace.js';

export const commandLookup = { commit, root, workspace };
export const commands = Object.values(commandLookup);
