const fs = require('fs')
const path = require('path')
const Spritesmith = require('spritesmith')
module.exports = function (source) {
  const callback = this.async()
  // 匹配路径
  const imgs = source.match(/url\((\S*)\?_sprite/g)

  console.log('imgs --', imgs)

  const matchedImgs = []
  for (let i = 0; i < imgs.length; i++) {
    // 分别取出图片的路径
    const img = imgs[i].match(/url\((\S*)\?_sprite/)[1]
    matchedImgs.push(path.join(__dirname, img))    
  }

  Spritesmith.run({
    src: matchedImgs
  }, (err, result) => {
    // 把合成后雪碧图 写入到 目标文件中
    fs.writeFileSync(path.join(process.cwd(), 'build/sprite.jpg'), result.image)

    // 匹配 css 文件，替换图片 url 地址
    source = source.replace(/url\((\S*)\?_sprite/g, () => {
      return `url('build/sprite.jpg'`
    })
    // 将替换后的文件，写入到 目标文件中
    fs.writeFileSync(path.join(process.cwd(), 'build/index.css'), source)

    callback(null, source)
  })
}