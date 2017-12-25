'use strict'

const fs = require('fs')
const path = require('path')

const cache = require('read-cache')
const parse = require('posthtml-parser')

const PluginError = require('./Error')

const exists = (path) => {
  return new Promise((resolve) => {
    fs.access(path, (err) => {
      resolve(!err)
    })
  })
}

/**
 * @name load
 *
 * @type {Object}
 */
const load = {
  /**
   * Sync Mode
   *
   * @memberof load
   * @method sync
   *
   * @param  {String} src File
   *
   * @return {Object} PostHTML Tree
   */
  sync: function (node, src, parser) {
    src = cache.sync(src, 'utf8')

    node.tag = false
    node.content = parser(src)

    return node
  },
  /**
   * Async Mode
   *
   * @memberof load
   * @method async
   *
   * @param {String} src File
   *
   * @return {Promise} PostHTML Tree
   */
  async: function (node, src, parser) {
    return cache(src, 'utf8')
      .then((src) => parser(src))
      .then((content) => {
        node.tag = false
        node.content = content

        return node
      })
  }
}

/**
 * @param {Object} options Options
 *
 * @return {Function} Include Plugin
 */
function plugin (options) {
  options = options || { root: false }

  /**
   * @method include
   *
   * @param {Object} tree  PostHTML Tree
   *
   * @return {Object} tree  PostHTML Tree (Transformed)
   */
  return function include (tree) {
    let dir = ''

    tree.options.from
      ? dir = options.root
        ? path.join(path.dirname(tree.options.from), options.root)
        : path.dirname(tree.options.from)
      : dir = options.root
        ? path.join(process.cwd(), options.root)
        : process.cwd()

    const includes = []

    tree.match([ { tag: 'include' }, { tag: 'import' } ], (node) => {
      let src = ''

      if (!node.attrs) {
        // TODO(michael-ciniawsky)
        // Use {Warning} Message API (once implemented)
        console.warn(
          new PluginError(
            'warning', '<import|include> with missing src found', 'PostHTML Include'
          ).message
        )

        src = false

        return node
      }

      if (node.attrs.src) {
        src = path.resolve(dir, node.attrs.src)
      }

      if (src) {
        let parser = null

        if (path.extname(src) !== '.html') {
          if (!tree.options.parser) {
            // TODO(michael-ciniawsky)
            // Use {Error} Message API (once implemented)
            console.error(
              new PluginError(
                'Error', `Parser for ${path.extname(src)} files not specified`, 'PostHTML Include'
              ).message
            )

            return
          }

          parser = tree.options.parser
        }

        if (path.extname(src) === '.html') {
          parser = parse
        }

        if (tree.options.sync) {
          if (!fs.existsSync(src)) {
            // TODO(michael-ciniawsky)
            // Use {Error} Message API (once implemented)
            console.error(
              new PluginError(
                'Error', `${src} could not be loaded`, 'PostHTML Include'
              ).message
            )

            return node
          }

          load.sync(node, src, parser)

          tree.messages.push({
            type: 'dependency',
            file: src,
            from: tree.options.from
          })

          return node
        }

        includes.push(
          exists(src).then((exists) => {
            if (!exists) {
              // TODO(michael-ciniawsky)
              // Use {Error} Message API (once implemented)
              console.error(
                new PluginError(
                  'Error', `${src} could not be loaded`, 'PostHTML Include'
                ).message
              )

              return
            }

            return load.async(node, src, parser)
          })
        )

        tree.messages.push({
          type: 'dependency',
          file: src,
          from: tree.options.from
        })

        return node
      }
    })

    return includes.length > 0 ? Promise.all(includes).then(() => tree) : tree
  }
}

/**
 * @author Ivan Voischev <voischev.ivan@ya.ru>
 * @description Include Plugin
 *
 * @module posthtml-include
 * @version 2.0.0
 *
 * @requires read-cache
 * @requires posthtml-parser
 */
module.exports = plugin
