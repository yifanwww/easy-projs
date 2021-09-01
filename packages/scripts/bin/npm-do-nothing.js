#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event = process.env.npm_lifecycle_event;
const name = process.env.npm_package_name;
const isPachage = name.includes('@package');
console.info(`NPM script \`${event}\` does nothing in ${isPachage ? 'package' : 'project'} \`${name}\``);
