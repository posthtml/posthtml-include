var parser = require('posthtml-parser');
var fs = require('fs');
var path = require('path');

module.exports = function(options) {
    options = options || {};
    options.root = options.root || './';
    options.encoding = options.encoding || 'utf-8';

    return function posthtmlInclude(tree) {
        tree.match({ tag: 'include' }, function(node) {
            var src = node.attrs.src || false,
                content;
            if (src) {
                src = path.resolve(options.root, src);
                content = parser(fs.readFileSync(src, options.encoding));

                if (typeof options.addDependencyTo === 'object' &&
                    typeof options.addDependencyTo.addDependency === 'function') {
                    options.addDependencyTo.addDependency(src);
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
