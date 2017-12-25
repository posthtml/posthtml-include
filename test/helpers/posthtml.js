const fixture = require('./utils').fixture
const posthtml = require('posthtml')

module.exports = (file, plugins, options) => {
  return fixture(file).then((html) => {
    return posthtml(plugins)
      .process(html, options)
      .then((result) => result)
  })
}
