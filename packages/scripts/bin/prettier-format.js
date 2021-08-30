#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
function format() {
    const command = 'prettier --write "**/*.{cjs,css,html,js,jsx,mjs,json,less,scss,ts,tsx,yaml,yml}"';
    child_process_1.default.execSync(command, { stdio: 'inherit' });
}
format();
