import fs from 'fs';
import path from 'path';

import { MonoError } from '../common/MonoError.js';

const __dirname = new URL(import.meta.url).pathname;

export const ROOT = {};

try {
  ROOT.dir = path.resolve(__dirname, '../../../../../');
  ROOT.pkgPath = path.resolve(ROOT.dir, 'package.json');

  if (!fs.existsSync(ROOT.pkgPath)) {
    throw new MonoError('Could not find repo root package.json');
  }

  ROOT.pkg = JSON.parse(fs.readFileSync(ROOT.pkgPath));
} catch (err) {
  throw new MonoError(err);
}
