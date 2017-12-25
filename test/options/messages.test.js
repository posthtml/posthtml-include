'use strict'

const test = require('ava')
const path = require('path')

const posthtml = require('../helpers/posthtml')

const plugin = require('../../lib')

test.todo('Errors')
test.todo('Warnings')

test('Dependencies', (t) => {
  const plugins = [ plugin() ]
  const options = { from: 'test/fixtures/messages.html' }

  return posthtml('messages.html', plugins, options)
    .then((result) => {
      const messages = result.messages
        .filter((msg) => msg.type === 'dependency' ? msg : false)
        .map((msg) => {
          msg.file = path.relative(__dirname, msg.file)

          return msg
        })

      t.snapshot(messages)
    })
})
