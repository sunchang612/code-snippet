const { runLoaders } = require('loader-runner')

const fs = require('fs')
const path = require('path')

runLoaders({
  resource: path.join(__dirname, './loader/index.css'),
  loaders: [
    {
      loader: path.join(__dirname, './loader/sprite-loader.js'),
    }
    
  ],
  context: {
    minimize: true
  },
  readResource: fs.readFile.bind(fs)
}, (err, result) => {
  console.log(result)
})