[![NPM][npm]][npm-url]
[![Deps][deps]][deps-url]
[![Tests][travis]][travis-url]
[![Coverage][cover]][cover-url]

<div align="center">
  <img width="220" height="150" title="PostHTML" src="http://posthtml.github.io/posthtml/logo.svg">
  <h1>Include Plugin</h1>
</div>

<h2 align="center">Install</h2>

```bash
npm i -D posthtml-include
```

<h2 align="center">Usage</h2>

```js
const { readFileSync } = require('fs')

const posthtml = require('posthtml')
const include = require('include')

const html = readFileSync('index.html')

posthtml([ include({ encoding: 'utf8' }) ])
    .process(html)
    .then((result) => console.log(result.html))
```

### Options

__root__: Root folder path for include. Default `./`

__encoding__: Default `utf-8`

__addDependencyTo__: An object with addDependency() method, taking file path as an argument. Called whenever a file is included. Default `null`. You can use it for hot-reloading in webpack(posthtml-loader) like this:

```js
posthtml: (webpack) => {
  return [
    require('posthtml-include')({ addDependencyTo: webpack })
  ]
}
```

<h2 align="center">Usage</h2>

__index.html__

```html
<html>
<head>
    <title>index.html</title>
</head>
<body>
    <include src="components/button.html"></include>
</body>
</html>
```

__components/button.html__
```html
<button class="button"><div class="button__text">Button</div></button>
```

```js
const { readFileSync } = require('fs')

const posthtml = require('posthtml')
const include = require('include')

const html = readFileSync('index.html')

posthtml([ include({ encoding: 'utf8' }) ])
    .process(html)
    .then((result) => console.log(result.html))
```

```html
<html>
<head>
  <title>index.html</title>
</head>
<body>
  <button class="button">
    <div class="button__text">Text</div>
  </button>
</body>
</html>
```
> **Note:** Also supports multi nesting.

<h2 align="center">LICENSE</h2>

> MIT License (MIT)

> Copyright (c) PostHTML Ivan Voischev

> Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

> The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

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
