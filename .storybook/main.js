const webpack = require('webpack');

module.exports = {
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/preset-create-react-app', 'storybook-react-i18next'],
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  webpackFinal: async (config, { configType }) => {
    if (configType === 'DEVELOPMENT') {
      config.plugins.push(new webpack.NormalModuleReplacementPlugin( /\.\.\/api$/,
        '../api.stories'));
    }

    return config;
  },
};
