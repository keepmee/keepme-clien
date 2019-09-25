let webpack = require('webpack')

module.exports = {

  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'APP_NAME'   : JSON.stringify(process.env.APP_NAME),
          'PORT'       : JSON.stringify(process.env.PORT),
          'API_SERVER' : JSON.stringify(process.env.API_SERVER),
          'PUBLIC_PATH': JSON.stringify(process.env.PUBLIC_PATH),
        }
      })
    ]
  },

  pwa: {
    serviceWorker    : false,
    workboxPluginMode: 'InjectManifest',
    workboxOptions   : {
      swSrc: './app/sw.js', /* Empty file. */
    }
  },

  publicPath: process.env.PUBLIC_PATH || '/',

  devServer: {
    port            : process.env.PORT || 4000,
    disableHostCheck: true
  }
};
