import { Chalk } from 'chalk';

const COLORS = {
  text: 'blueBright',
  brackets: 'yellowBright',
};

export const chalk = new Chalk({ level: 2 });

export function array(array, options = {}) {
  const color_text = options.text || COLORS.text;
  const color_brackets = options.brackets || COLORS.brackets;

  return chalk[color_brackets](`[${chalk[color_text].bold(array.join(chalk[color_brackets](', ')))}]`);
}

export function bracket(text, options = {}) {
  const color_text = options.text || COLORS.text;
  const color_brackets = options.brackets || COLORS.brackets;

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
