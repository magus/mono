import chalkModule from 'chalk';

export const chalk = chalkModule;

export function bracket(text) {
  return chalk.yellow(`[${chalk.blue.bold(text)}]`);
}

export function mono(say) {
  console.log(`🤖 ${chalk.yellow.bold('Mono')}: ${say} ${chalk.dim.gray('<bleep> <bloop>')}`);
}
