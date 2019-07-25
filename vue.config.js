// vue.config.js
module.exports = {
  // 基本路径
  baseUrl: 'vueDome/',
  // 输出文件目录
  outputDir: 'dist',
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // webpack配置
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
      // console.log(config)
    }
  },
  devServer: {
    open: true, // 自动打开浏览器
    port: 3000 // 端口
  },
  chainWebpack: config => {
    // svg rule loader
    const svgRule = config.module.rule('svg') // 找到 svg-loader
    svgRule.uses.clear() // 清除已有 loader
    svgRule.exclude.add(/node_modules/) // 排除 node_modules 目录
    svgRule // 添加新的 svg loader
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  }
}
