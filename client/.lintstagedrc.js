const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

const buildPrettierCommand = (filenames) => `
  yarn prettier --write ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}
`;

module.exports = {
  '**/*.(ts|tsx)': () => 'tsc --pretty --noEmit',

  // Lint & Prettify TS and JS files
  '**/*.(ts|tsx|js)': [buildEslintCommand, buildPrettierCommand],

  // Prettify only Markdown and JSON files
  '**/*.(md|json)': (filenames) =>
    `yarn prettier --write ${filenames.join(' ')}`,
};
