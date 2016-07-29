# PostHTML Include <img align="right" width="220" height="200" title="PostHTML logo" src="http://posthtml.github.io/posthtml/logo.svg">

Include partials into your posthtml templates

[![NPM][npm]][npm-url]
[![Deps][deps]][deps-url]
[![Tests][travis]][travis-url]
[![Coverage][cover]][cover-url]

### Install

```bash
npm install posthtml-include --save
```

### Usage

Given the following input files:

```html
<!-- index.html -->
<p>Here's my partial:</p>
<include src='_partial.html'></include>
<p>after the partial</p>
```

```html
<!-- _partial.html -->
<strong>hello from the partial!</strong>
```

Process them with posthtml:

```js
const {readFileSync} = require('fs')
const posthtml = require('posthtml')
const include = require('posthtml-include')

const html = readFileSync('index.html')

posthtml({ plugins: include() })
  .process(html)
  .then((result) => console.log(result.output()))
```

Output:

```html
<p>Here's my partial:</p>
<strong>hello from the partial!</strong>
<p>after the partial</p>
```

### Options

All options are optional, none are required.

| Name | Description | Default |
| ---- | ----------- | ------- |
| **root** | Root path to resolve the include from | the file's path |
| **addDependencyTo** | Object with addDependency() method, taking file path as an argument. Called whenever a file is included | |

### License

Licensed under [MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/posthtml-include.svg
[npm-url]: https://npmjs.com/package/posthtml-include

[deps]: https://david-dm.org/posthtml/posthtml-include.svg
[deps-url]: https://david-dm.org/posthtml/posthtml-include

[style]: https://img.shields.io/badge/code%20style-standard-yellow.svg
[style-url]: http://standardjs.com/

[travis]: http://img.shields.io/travis/posthtml/posthtml-include.svg
[travis-url]: https://travis-ci.org/posthtml/posthtml-include

[cover]: https://coveralls.io/repos/github/posthtml/posthtml-include/badge.svg?branch=master
[cover-url]: https://coveralls.io/github/posthtml/posthtml-include?branch=master
