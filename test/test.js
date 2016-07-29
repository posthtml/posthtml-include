const include = require('..')
const posthtml = require('posthtml')
const test = require('ava')
const path = require('path')
const {readFileSync} = require('fs')
const fixtures = path.join(__dirname, 'fixtures')

test('default include html', (t) => {
  return compare(t, 'basic')
})

test('root option', (t) => {
  return compare(t, 'rootOption', { root: path.join(fixtures, 'partials') })
})

test('addDependencyTo option', (t) => {
  const includePath = path.join(fixtures, 'partials/button.html')

  return process('basic', {
    addDependencyTo: { addDependency: (p) => t.truthy(p === includePath) }
  })
})

test('include with no src errors', (t) => {
  return process('no_src')
    .catch((err) => {
      t.truthy(err.toString().match(/include tag has no "src" attribute/))
    })
})

test('invalid dependency add object errors', (t) => {
  t.throws(() => include({ addDependencyTo: 1 }), '[posthtml-include] "addDependencyTo" does not have an "addDependency" method')
})

test('correctly reports source filename', (t) => {
  const inputFile = path.join(fixtures, 'basic.html')
  const trackAst = (tree) => {
    t.truthy(tree[0].content[1].location.filename.match(/partials\/button\.html/))
    return tree
  }

  return posthtml({
    plugins: [include(), trackAst],
    filename: inputFile
  }).process(readFileSync(inputFile, 'utf8'))
})

function process (name, options = {}) {
  const inputFile = path.join(fixtures, `${name}.html`)
  return posthtml({ plugins: include(options), filename: inputFile })
    .process(readFileSync(inputFile, 'utf8'))
}

function compare (t, name, options = {}) {
  const inputFile = path.join(fixtures, `${name}.html`)
  const input = readFileSync(inputFile, 'utf8')
  const expected = readFileSync(path.join(fixtures, `${name}.expected.html`), 'utf8')

  return posthtml({ plugins: include(options), filename: inputFile })
    .process(input)
    .then((res) => t.truthy(expected === res.output()))
}
