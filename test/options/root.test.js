'use strict'

const test = require('ava')

const posthtml = require('../helpers/posthtml')

const plugin = require('../../lib')

test('Absolute', (t) => {
  const plugins = [ plugin({ root: 'test/fixtures/components' }) ]
  const options = {}

  return posthtml('root.html', plugins, options)
    .then((result) => t.snapshot(result.html))
})

test('Relative', (t) => {
  const plugins = [ plugin({ root: 'components' }) ]
  const options = { from: 'test/fixtures/root.html' }

  return posthtml('root.html', plugins, options)
    .then((result) => t.snapshot(result.html))
})
