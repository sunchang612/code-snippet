module.exports = class MyPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    console.log('compiler', this.options)
  }
}