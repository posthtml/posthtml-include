// ------------------------------------
// #POSTHTML - INCLUDE - TEST
// ------------------------------------

const test = require('ava')

const fs = require('fs')
const path = require('path')

const posthtml = require('posthtml')
const plugin = require('../lib/')

const fixture = (file, mode) => {
  mode = mode || 'async'

  file = path.join(__dirname, 'fixtures', file)

  if (mode === 'sync') return fs.readFileSync(file, 'utf8')

  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, file) => {
      if (err) reject(err)

      return resolve(file)
    })
  })
}

const expect = (file) => {
  file = path.join(__dirname, 'expect', file)

  return fs.readFileSync(file, 'utf8')
}

test('Sync', (t) => {
  const html = posthtml([ plugin() ])
    .process(
      fixture('index.html', 'sync'),
      { sync: true, from: 'test/fixtures/index.html' }
    )
    .html

  return t.is(html, expect('sync.html'))
})

test('Async', (t) => {
  return fixture('index.html')
    .then((html) => {
      return posthtml([ plugin() ])
        .process(html, { from: 'test/fixtures/index.html' })
        .then((result) => t.is(result.html, expect('async.html')))
    })
})

test('Absolute', (t) => {
  return fixture('absolute.html')
    .then((html) => {
      posthtml([ plugin({ root: 'test/fixtures/components' }) ])
        .process(html)
        .then((result) => t.is(result.html, expect('absolute.html')))
    })
})

test('Relative', (t) => {
  return fixture('relative.html')
    .then((html) => {
      posthtml([ plugin({ root: 'components' }) ])
        .process(html, { from: 'test/fixtures/relative.html' })
        .then((result) => t.is(result.html, expect('relative.html')))
    })
})

test('Error', (t) => {
  return fixture('messages.html')
    .then((html) => {
      posthtml([ plugin() ])
        .process(html, { from: 'test/fixtures/messages.html' })
        .then((result) => {
          fs.writeFileSync(
            'test/expect/messages.json',
            JSON.stringify(result.tree.messages)
          )

          return result.tree.messages
        })
        .then((messages) => {
          const type = (messages, type) => {
            return msg.filter((msg) => msg.type === type ? msg : '')
          }

          const msg = JSON.parse(expect('messages.json'))

          t.is(type(messages, 'error'), type(msg, 'error'))
          t.is(type(messages, 'dependency'), type(msg, 'dependency'))
        })
    })
})

test('Pug', (t) => {
  const pug = require('posthtml-pug')()

  return fixture('index.pug')
    .then((html) => {
      posthtml([ plugin() ])
        .process(html, { parser: pug, from: 'test/fixtures/index.pug' })
        .then((result) => {
          t.is(result.html, expect('pug.html'))
          t.is(result.tree.options.parser, pug)
        })
    })
})

test('SugarML', (t) => {
  const sml = require('posthtml-sugarml')()

  return fixture('index.sml')
    .then((html) => {
      posthtml([ plugin() ])
        .process(html, { parser: sml, from: 'test/fixtures/index.sml' })
        .then((result) => {
          t.is(result.html, expect('sml.html'))
          t.is(result.tree.options.parser, sml)
        })
    })
})
