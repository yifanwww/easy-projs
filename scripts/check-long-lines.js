/**
 * check-long-lines.mjs — detect lines exceeding a character limit (default 105).
 *
 * Usage:
 *   node scripts/check-long-lines.mjs <file-or-glob> [--max N] [--summary-only]
 *
 * Examples:
 *   node scripts/check-long-lines.mjs src/renderer/App.tsx
 *   node scripts/check-long-lines.mjs "src/**\/*.ts"
 *   node scripts/check-long-lines.mjs src/ --max 120
 *   node scripts/check-long-lines.mjs src/ --summary-only
 */

import { readFileSync, statSync, readdirSync } from 'node:fs';
import { resolve, relative, extname, join } from 'node:path';

// ── CLI argument parsing ────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  console.log(`
Usage: node scripts/check-long-lines.mjs <path> [options]

Arguments:
  <path>            File or directory to scan (required)

Options:
  --max N           Max characters per line (default: 105)
  --summary-only    Only print the summary, not individual lines
  --help, -h        Show this help

Only .md (markdown) files are checked.
`);
  process.exit(0);
}

const targetPath = resolve(args[0]);

let maxLen = 105;
let summaryOnly = false;

for (let i = 1; i < args.length; i++) {
  if (args[i] === '--max' && args[i + 1]) {
    maxLen = parseInt(args[i + 1], 10);
    i++;
  } else if (args[i] === '--summary-only') {
    summaryOnly = true;
  }
}

// ── File discovery ──────────────────────────────────────────────────────

/** Collect files recursively, filtering by extension. */
function collectFiles(dir) {
  const results = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    // skip common dirs to ignore
    if (
      entry.isDirectory() &&
      !['node_modules', '.git', 'dist', 'build', 'coverage', 'release', 'working'].includes(entry.name)
    ) {
      results.push(...collectFiles(join(dir, entry.name)));
    } else if (entry.isFile() && extname(entry.name) === '.md') {
      results.push(join(dir, entry.name));
    }
  }
  return results;
}

let files;
try {
  const st = statSync(targetPath);
  if (st.isDirectory()) {
    files = collectFiles(targetPath);
  } else {
    files = [targetPath];
  }
} catch (err) {
  console.error(`Error: cannot read "${targetPath}" — ${err.message}`);
  process.exit(1);
}

// ── Scan ────────────────────────────────────────────────────────────────

let totalFiles = 0;
let totalLongLines = 0;

for (const file of files) {
  let content;
  try {
    content = readFileSync(file, 'utf-8');
  } catch {
    continue; // skip unreadable files
  }

  const lines = content.split('\n');
  const rel = relative(process.cwd(), file);
  let fileHasLong = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.length > maxLen) {
      if (!summaryOnly) {
        if (!fileHasLong) {
          console.log(`\n📄 ${rel}`);
          fileHasLong = true;
        }
        const trimmed = line.length > 200 ? line.slice(0, 200) + '…' : line;
        console.log(`   L${i + 1}: ${line.length} chars | ${trimmed}`);
      }
      totalLongLines++;
    }
  }

  if (fileHasLong) totalFiles++;
}

// ── Summary ─────────────────────────────────────────────────────────────

console.log(`\n${'═'.repeat(60)}`);
console.log(`Scanned ${files.length} file(s)`);
console.log(`Found ${totalLongLines} line(s) exceeding ${maxLen} chars across ${totalFiles} file(s)`);
if (totalLongLines === 0) {
  console.log('✅ All good!');
} else {
  console.log('⚠️  Consider breaking long lines for readability.');
}
console.log(`${'═'.repeat(60)}`);
