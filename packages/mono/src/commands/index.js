import * as commit from './commit.js';
import * as root from './root.js';
import * as workspace from './workspace.js';

export const lookup = { commit, root, workspace };
export const list = Object.values(lookup);
