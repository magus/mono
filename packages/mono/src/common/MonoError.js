export class MonoError extends Error {
  constructor(message, extra) {
    super(message);
    this.name = 'MonoError';
    this.message = `🤖 ❌ [MonoError]( ${this.message} )`;
    this.extra = extra;
  }
}
