[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![code style][style]][style-url]
[![chat][chat]][chat-url]

<div align="center">
  <img width="110" height="100" title="PostHTML Plugin" vspace="50" src="http://michael-ciniawsky.github.io/postcss-load-plugins/logo.svg">
  <img width="220" height="200" title="PostHTML" src="http://posthtml.github.io/posthtml/logo.svg">
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
const include = require('posthtml-include')

const html = readFileSync('./src/index.html')

posthtml([ include() ])
  .process(html, { from: './src/index.html' })
  .then((result) => result.html)
```  

> :warning: v2.0.0 removes `options.addDependencyTo` in favor of

```js
result.messages = [
  {
    type: 'dependency',
    file: 'absolute/path/to/include.html'
    from: tree.options.from
  },
  ...
]
```  

> ℹ️ `posthtml-loader >= v1.0.0` adds dependencies to `webpack` automatically

<h2 align="center">Options</h2>

|Name|Type|Default|Description |
|:--:|:--:|:-----:|:-------------|
|**[`root`](#root)**|`{String}`|`process.cwd()`|Imports/Includes Directory|

### `Root`

#### `Absolute`

```log
|– src
||– index.html
||– components
|||– component.html
|
|– gulpfile.js
|– package.json
```  

```html
<include src="component.html"</include>
```

```js
posthtml([ include({ root: 'src/components/' }) ])
  .process(html) // options.from === undefined
  .then((result) => result.html)
```

#### `Relative`

```
|– src
||– index.html
||– components
|||– component.html
|
|– gulpfile.js
|– package.json
```

```html
<include src="component.html"</include>
```

```js
posthtml([ include({ root: 'components' }) ])
  .process(html, { from: 'src/index.html' })
  .then((result) => result.html)
```

<h2 align="center">Example</h2>

**index.html**
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

**components/button.html**
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

<h2 align="center">Maintainer</h2>

<table>
  <tbody>
   <tr>
    <td align="center">
      <img width="150 height="150"
      src="https://avatars.githubusercontent.com/u/1510217?v=3&s=150">
      <br />
      <a href="https://github.com/voischev">Ivan Voischev</a>
    </td>
   </tr>
  <tbody>
</table>

<h2 align="center">Contributors</h2>

<table>
  <tbody>
   <tr>
    <td align="center">
      <img width="150 height="150"
      src="https://avatars.githubusercontent.com/u/5419992?v=3&s=150">
      <br />
      <a href="https://github.com/michael-ciniawsky">Michael Ciniawsky</a>
    </td>
   </tr>
  <tbody>
</table>


[npm]: https://img.shields.io/npm/v/posthtml-include.svg
[npm-url]: https://npmjs.com/package/posthtml-include

[node]: https://img.shields.io/node/v/posthtml-include.svg
[node-url]: https://nodejs.org/

[deps]: https://david-dm.org/posthtml/posthtml-include.svg
[deps-url]: https://david-dm.org/posthtml/posthtml-include

[tests]: http://img.shields.io/travis/posthtml/posthtml-include.svg
[tests-url]: https://travis-ci.org/posthtml/posthtml-include

[cover]: https://coveralls.io/repos/github/posthtml/posthtml-include/badge.svg
[cover-url]: https://coveralls.io/github/posthtml/posthtml-include

[style]: https://img.shields.io/badge/code%20style-standard-yellow.svg
[style-url]: http://standardjs.com/

[chat]: https://badges.gitter.im/posthtml/posthtml.svg
[chat-url]: https://gitter.im/posthtml/posthtml
