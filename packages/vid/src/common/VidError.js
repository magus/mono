import * as chalk from './chalk.js';

export class VidError extends Error {
  constructor(message, extra) {
    super(message);
    this.name = 'VidError';
    this.message = chalk.vid_error(this.name, this.message);
    this.extra = extra;
  }
}
