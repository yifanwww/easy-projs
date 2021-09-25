#!/usr/bin/env node

export {};

const event = process.env.npm_lifecycle_event!;
const name = process.env.npm_package_name!;

const isPachage = name.includes('@package');

console.info(`NPM script \`${event}\` does nothing in ${isPachage ? 'package' : 'project'} \`${name}\``);
