import chalk from 'chalk';
import child from 'child_process';
import fs from 'fs';
import path from 'path';

const date = new Date();
const year = date.getUTCFullYear();
const month = date.getUTCMonth() + 1;
const day = date.getUTCDate();

const today = `${year}-${month}-${day}`;
const proj = path.join('projs', today);

const command = `create-react-app ${proj} --template typescript --use-npm`;
console.log(chalk.green(command));
child.execSync(command, { stdio: 'inherit' });

console.log();
console.log(`Start to delete ${chalk.yellow('node_modules')}.`);
fs.rmSync(path.join(proj, 'node_modules'), { recursive: true });
console.log(`Deleted ${chalk.yellow('node_modules')} successfully.`);
