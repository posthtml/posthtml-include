const {readFileSync} = require('fs')
const {modifyNodes} = require('posthtml-plugin-util')
const path = require('path')

module.exports = function (options = {}) {
  if (options.addDependencyTo && !(typeof options.addDependencyTo.addDependency === 'function')) {
    throw new Error('[posthtml-include] "addDependencyTo" does not have an "addDependency" method')
  }

  return function postHtmlInclude (tree, ctx) {
    return modifyNodes(tree, (node) => node.name === 'include', (node) => {
      // if there is no src, throw an error
      if (!(node.attrs && node.attrs.src)) {
        throw new ctx.PluginError({
          message: 'include tag has no "src" attribute',
          plugin: 'posthtml-include',
          location: node.location
        })
      }

      // otherwise, replace the tag with the partial's contents
      const root = options.root || (ctx.filename && path.dirname(ctx.filename)) || ''
      const includePath = path.join(root, node.attrs.src[0].content)
      const src = readFileSync(includePath, 'utf8')
      const includeAst = ctx.parser(src, { filename: includePath })

      // add dependency if applicable
      if (options.addDependencyTo) {
        options.addDependencyTo.addDependency(includePath)
      }

      // return the new nodes
      return includeAst
    })
  }
}
