import { Chalk } from 'chalk';

export const chalk = new Chalk({ level: 2 });

export function bracket(text, options = {}) {
  const color_text = options.text || 'blueBright';
  const color_brackets = options.brackets || 'yellowBright';

  return chalk[color_brackets](`[${chalk[color_text].bold(text)}]`);
}

export function vid_error(type, message) {
  if (type) {
    return error(`📹 ❌ ${bracket(type)} ${message}`);
  }

  return error(`📹 ❌ ${message}`);
}

export function error(text) {
  // chalk.hex('#ef4444')(text)
  return chalk.dim.red(text);
}
