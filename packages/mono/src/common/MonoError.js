import * as chalk from './chalk.js';

export class MonoError extends Error {
  constructor(message, extra) {
    super(message);
    this.name = 'MonoError';
    this.message = chalk.mono_error(this.name, this.message);
    this.extra = extra;
  }
}
