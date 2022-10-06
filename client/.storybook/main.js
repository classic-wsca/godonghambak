const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-next-router',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  staticDirs: ['../public'],
  typescript: {
    reactDocgen: false,
  },
  webpackFinal: async (config) => {
    const rules = config.module.rules;
    const fileLoaderRule = rules.find((rule) => rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;
    rules.push({ test: /\.svg$/, use: ['@svgr/webpack'] });
    config.resolve.alias = {
      ...config.resolve.alias,
      '~public': path.resolve(__dirname, '../public'),
      '~components': path.resolve(__dirname, '../src/components'),
      '~constants': path.resolve(__dirname, '../src/constants'),
      '~hooks': path.resolve(__dirname, '../src/hooks'),
      '~hocs': path.resolve(__dirname, '../src/hocs'),
      '~pages': path.resolve(__dirname, '../src/pages'),
      '~styles': path.resolve(__dirname, '../src/styles'),
      '~types': path.resolve(__dirname, '../src/types'),
      '~utils': path.resolve(__dirname, '../src/utils'),
    };

    return config;
  },
};
