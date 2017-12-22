'use strict'

const test = require('ava')

const posthtml = require('../helpers/posthtml')

const plugin = require('../../lib')

test('HTML (Default)', (t) => {
  const plugins = [ plugin() ]
  const options = {
    parser: false,
    from: 'test/fixtures/index.html'
  }

  return posthtml('index.html', plugins, options)
    .then((result) => {
      t.is(result.tree.options.parser, false)

      t.snapshot(result.html)
    })
})

test('Pug', (t) => {
  const plugins = [ plugin() ]
  const options = {
    parser: require('posthtml-pug')(),
    from: 'test/fixtures/index.pug'
  }

  return posthtml('index.pug', plugins, options)
    .then((result) => {
      t.is(result.tree.options.parser, options.parser)

      t.snapshot(result.html)
    })
})

test('SSML', (t) => {
  const plugins = [ plugin() ]
  const options = {
    parser: require('posthtml-sugarml')(),
    from: 'test/fixtures/index.ssml'
  }

  return posthtml('index.ssml', plugins, options)
    .then((result) => {
      t.is(result.tree.options.parser, options.parser)

      t.snapshot(result.html)
    })
})
