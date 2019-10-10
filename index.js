var parser = require('posthtml-parser');
var fs = require('fs');
var path = require('path');

module.exports = function(options) {
    options = options || {};
    options.root = options.root || './';
    options.encoding = options.encoding || 'utf-8';

    return function posthtmlInclude(tree) {
        tree.match({ tag: 'include' }, function(node) {
            var src = node.attrs.src || false;
            var content;
            var subtree;
            var source;

            if (src) {
                src = path.resolve(options.root, src);
                source = fs.readFileSync(src, options.encoding);
                subtree = parser(source);
                subtree.match = tree.match;
                content = source.indexOf('include') !== -1? posthtmlInclude(subtree): subtree;

                if (
                    typeof options.addDependencyTo === 'object' &&
                    typeof options.addDependencyTo.addDependency === 'function'
                ) {
                    console.warn([
                        "addDependencyTo is deprecated in favor of",
                        "result.messages.dependency; posthtml-loader >= v1.0.1 will",
                        "automatically add your imported files to webpack's file watcher."
                    ].join("\n"));
                    options.addDependencyTo.addDependency(src);
                }

                if (tree.messages) {
                    tree.messages.push({
                        type: "dependency",
                        file: src
                    });
                }
            }
            return {
                tag: false,
                content: content
            };
        });
        return tree;
    };
};
