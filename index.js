var parser = require('posthtml-parser');
var match = require('posthtml/lib/api').match;
var fs = require('fs');
var path = require('path');
var posthtml = require('posthtml');
var expressions = require('posthtml-expressions');

module.exports = function(options) {
    options = options || {};
    options.root = options.root || './';
    options.encoding = options.encoding || 'utf-8';

    return function posthtmlInclude(tree) {
        if (!tree.parser) tree.parser = parser;
        if (!tree.match) tree.match = match;
        tree.match({ tag: 'include' }, function(node) {
            var src = node.attrs.src || false;
            var data = node.attrs.data || false;
            var content;
            var subtree;
            var source;
            if (src) {
                src = path.resolve(options.root, src);
                source = fs.readFileSync(src, options.encoding);
                if (data) {
                    data = JSON.parse(data);
                    var result = posthtml()
                        .use(expressions({ locals: data }))
                        .process(source, { sync: true });
                    source = result.html;
                }
                subtree = tree.parser(source);
                subtree.match = tree.match;
                subtree.parser = tree.parser;
                content = source.indexOf('include') !== -1? posthtmlInclude(subtree): subtree;

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
