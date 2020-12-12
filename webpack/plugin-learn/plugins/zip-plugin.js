const JSZip = require('jszip')
const path = require('path')
const RawSource = require('webpack-sources').RawSource
const zip = new JSZip
module.exports = class ZipPLugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    console.log('compiler', this.options)
    compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
      // 创建一个目录
      const folder = zip.folder(this.options.filename)

      for(let filename in compilation.assets) {
        // 获取 source 也就是文件的内容
        const source = compilation.assets[filename].source()
        // 把内容添加到文件中
        folder.file(filename, source)
      }

      zip.generateAsync({
        type: 'nodebuffer'
      }).then((content) => {
        // 获取文件路径地址
        const outPutPath = path.join(compilation.options.output.path, this.options.filename + '.zip')
        // 文件路径的绝对定位改成相对定位，
        const outPutRelativePath = path.relative(
          compilation.options.output.path,
          outPutPath
        )
        compilation.assets[outPutRelativePath] = new RawSource(content)
        callback()
      })
    })
  }
}