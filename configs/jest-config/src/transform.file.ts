import path from 'node:path';

// This is a custom Jest transformer turning file imports into filenames.
// http://facebook.github.io/jest/docs/en/webpack.html

export default {
  process(sourceText: string, sourcePath: string) {
    const assetFilename = JSON.stringify(path.basename(sourcePath));
    return {
      code: `module.exports = ${assetFilename};`,
    };
  },
};
