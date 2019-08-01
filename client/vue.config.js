const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = {
  chainWebpack: config => {
    config.devtool = 'source-map';
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule.use('vue-svg-loader').loader('vue-svg-loader');
  },
  pluginOptions: {
    apollo: {
      enableMocks: true,
      enableEngine: true,
    },
  },
  configureWebpack: {
    plugins: [new VuetifyLoaderPlugin()],
  },
};
