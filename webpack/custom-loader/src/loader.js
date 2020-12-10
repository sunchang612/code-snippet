const loaderUtils = require('loader-utils')
const fs =  require('fs')
const path = require('path')

module.exports = function(source) {
  const { name } = loaderUtils.getOptions(this)
  this.cacheable(false)
  // console.log('name 参数-->', name)
  // 异步读取
  const callback = this.async()
  const json = JSON.stringify(source)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  return `export default ${json}`

  // fs.readFile(path.join(__dirname, './async.txt'), 'utf-8', (err, data) => {
  //   callback(err, data)
  // })
  this.callback(null, json)
}