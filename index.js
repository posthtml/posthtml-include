var fs = require('fs');
var path = require('path');
/*
 * param {Object} options
 * param {Object} options.root – Root folder path for include
 * param {Object} options.encoding – File encoding
 * param {Object} options.addDependencyTo – An object with addDependency() method,
 *                                          taking file path as an argument.
 *                                          Called whenever a file is included.
 * param {Object} options.parse – Parser Object config
 * param {Object} options.parse.parser – Parser engine
 * param {Object} options.parse.filter – Filter paths for parser
 */
module.exports = function(options) {
    options = options || {};
    options.root = options.root || './';
    options.encoding = options.encoding || 'utf-8';

    var addDependencyTo = options.addDependencyTo || {};
    var parse = options.parse || {
        parser: require('posthtml-parser'),
        filter: function(p) { return /\.html$/.test(p); }
    };

    return function posthtmlInclude(tree) {
        tree.match({ tag: 'include', attrs: { src: true } }, function(node) {
            var srcPath = path.resolve(options.root, node.attrs.src || false),
                content;

            if (!fs.existsSync(srcPath)) {
                // TODO: push message to PostHTML message api
                return node;
            }

            content = fs.readFileSync(srcPath, options.encoding);

            if (typeof addDependencyTo.addDependency === 'function') {
                options.addDependencyTo.addDependency(srcPath);
            }

            if (typeof parse.parser === 'function' &&
                typeof parse.filter === 'function' &&
                parse.filter(srcPath)) {

                content = parse.parser(content);
            }

            return {
                tag: false,
                content: [].concat(content)
            };
        });

        return tree;
    };
};
