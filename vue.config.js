module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    port: 8888,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/dev-api': {
        target: 'http://172.18.40.40:20001',
        ws: true,
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/dev-api': ''
        }
      }
    }
  },
  configureWebpack: {
    name: 'vue2-cli4-template',
    resolve: {
      alias: {
        '@': require('path').join(__dirname, 'src') // 路径别名
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/styles/variables.scss";` // sass全局变量
      }
    }
  }
}
