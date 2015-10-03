var toTree = require('posthtml/lib/parser').toTree;
var fs = require('fs');
var path = require('path');

module.exports = function posthtmlInclude(options) {
    options = options || {};

    return function(tree) {
        tree.match({ tag: 'include' }, function(node) {
            var src = node.attrs.src || false,
                content;
            if (src) {
                content = toTree(fs.readFileSync(path.resolve(src), options.encoding || 'utf-8'));
            }
            return {
                tag: false,
                content: content
            };
        });
        return tree;
    };
};
