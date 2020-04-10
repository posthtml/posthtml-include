'use strict'

const fs = require('fs');
const path = require('path');
const posthtml = require('posthtml');
const parser = require('posthtml-parser');
const {match} = require('posthtml/lib/api');
const expressions = require('posthtml-expressions');

module.exports = (options = {}) => {
  options.root = options.root || './';
  options.encoding = options.encoding || 'utf-8';

  return function posthtmlInclude(tree) {
    tree.parser = tree.parser || parser;
    tree.match = tree.match || match;

    tree.match({tag: 'include'}, node => {
      let src = node.attrs.src || false;
      let locals = node.attrs.locals || false;
      let content;
      let subtree;
      let source;

      if (src) {
        src = path.resolve(options.root, src);
        source = fs.readFileSync(src, options.encoding);
        if (locals && locals.includes(':')) {
          locals = JSON.parse(locals);
          const result = posthtml()
            .use(expressions({locals}))
            .process(source, {sync: true});
          source = result.html;
        }

        subtree = tree.parser(source);
        subtree.match = tree.match;
        subtree.parser = tree.parser;
        content = source.includes('include') ? posthtmlInclude(subtree) : subtree;

        if (tree.messages) {
          tree.messages.push({
            type: 'dependency',
            file: src
          });
        }
      }

      return {
        tag: false,
        content
      };
    });

    return tree;
  };
};
