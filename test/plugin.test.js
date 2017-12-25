'use strict'

const test = require('ava')

const fixture = require('./helpers/utils').fixture
const posthtml = require('./helpers/posthtml')

const plugin = require('../lib')

test('Sync', (t) => {
  const posthtml = require('posthtml')

  const html = posthtml([ plugin() ])
    .process(
      fixture('index.html', 'sync'),
      { sync: true, from: 'test/fixtures/index.html' }
    )
    .html

  t.snapshot(html)
})

test('Async', (t) => {
  const plugins = [ plugin() ]
  const options = { from: 'test/fixtures/index.html' }

  return posthtml('index.html', plugins, options)
    .then((result) => t.snapshot(result.html))
})
