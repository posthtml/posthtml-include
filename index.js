const {readFileSync} = require('fs')
const path = require('path')

module.exports = function (options = {}) {
  if (options.addDependencyTo && !(typeof options.addDependencyTo.addDependency === 'function')) {
    throw new Error('[posthtml-include] "addDependencyTo" does not have an "addDependency" method')
  }

  return function postHtmlInclude (tree, ctx) {
    return tree.reduce((m, node) => {
      // bottom-up recurse
      if (node.type === 'tag' && node.content) {
        node.content = postHtmlInclude(node.content, ctx)
      }

      // if it's not an include tag, move on
      if (node.name !== 'include') { m.push(node); return m }

      // otherwise we have an include tag. if there is no src, throw an error
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

      // push the new nodes into the tree
      m = m.concat(includeAst)
      return m
    }, [])
  }
}
