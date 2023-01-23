export class VidError extends Error {
  constructor(message, extra) {
    super(message);
    this.name = 'VidError';
    this.extra = extra;
  }
}
