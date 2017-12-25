const fs = require('fs')
const path = require('path')

const fixture = (file, mode) => {
  file = path.resolve(__dirname, '../fixtures', file)

  if (mode && mode === 'sync') {
    return fs.readFileSync(file, 'utf8')
  }

  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, file) => {
      if (err) reject(err)

      return resolve(file)
    })
  })
}

const expected = (file) => {
  file = path.resolve(__dirname, '../expect', file)

  return fs.readFileSync(file, 'utf8')
}

module.exports = { fixture, expected }
