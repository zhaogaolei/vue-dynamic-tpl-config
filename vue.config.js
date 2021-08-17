function isProd () {
  return process.env.NODE_ENV === 'production'
}

const prodExternals = {
  Antd: 'ant-design-vue'
}

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    externals: prodExternals
  },
  chainWebpack: (config) => {
    config.performance.set('maxEntrypointSize', 2 * 1024 * 1024)
    config.performance.set('maxAssetSize', 2 * 1024 * 1024)
    const urlLoader = config.module.rule('images')
    // 添加要替换的 loader
    urlLoader
      .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 1024 * 1000, // 1000k
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[hash:8].[ext]'
          }
        }
      })
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {},
        // do not remove this line
        javascriptEnabled: true
      }
    }
  }
}
