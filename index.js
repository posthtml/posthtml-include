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
            if (src) content = parser(fs.readFileSync(path.resolve(options.root, src), options.encoding));
            return {
                tag: false,
                content: content
            };
        });
        return tree;
    };
};
