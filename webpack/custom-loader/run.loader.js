const { runLoaders } = require('loader-runner')

const fs = require('fs')
const path = require('path')

runLoaders({
  resource: path.join(__dirname, './src/demo.txt'),
  loaders: [
    {
      loader: path.join(__dirname, './src/loader.js'),
      options: {
        name: '哈哈'
      }
    }
  ],
  context: {
    minimize: true
  },
  readResource: fs.readFile.bind(fs)
}, (err, result) => {
  console.log(result)
})