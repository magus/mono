#!/usr/bin/env node

import chalk from 'chalk';
import { execSync } from 'child_process';

export function mono_exec(cmd) {
  console.log();
  console.log(`🤖 ${chalk.yellow.bold('Mono')}: Running ${bracket(cmd)} ${chalk.dim.gray('<bleep> <bloop>')}`);
  return cmd;
}

export function exec(cmd) {
  execSync(cmd, { stdio: 'inherit' });
}

export function exec_result(cmd) {
  const output = execSync(cmd).toString();
  const result = output.trim();
  return result;
}

function bracket(text) {
  return chalk.yellow(`[${chalk.blue.bold(text)}]`);
}
