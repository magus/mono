import { Chalk } from 'chalk';

export const chalk = new Chalk({ level: 2 });

export function bracket(text, options = {}) {
  const color_text = options.text || 'blueBright';
  const color_brackets = options.brackets || 'yellowBright';

  return chalk[color_brackets](`[${chalk[color_text].bold(text)}]`);
}

export function mono(say) {
  return `🤖 ${chalk.dim.blackBright.bold('Mono: ')}${say} ${chalk.dim.gray('<bleep> <bloop>')}`;
}
