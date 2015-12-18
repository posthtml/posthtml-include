# PostHTML-include
[![npm version](https://badge.fury.io/js/posthtml-include.svg)](http://badge.fury.io/js/posthtml-include)

## Usage

__index.html__
```html
<html>
<head>
    <title>index.html</title>
</head>
<body>
    <include src="component/button/button.html"></include>
</body>
</html>
```

__component/button/button.html__
```html
<button class="button"><div class="button__text">Button</div></button>
```

```javascript
var posthtml = require('posthtml'),
    html = require('fs').readFileSync('index.html').toString();

posthtml()
    .use(require('posthtml-include')({ encoding: 'utf-8' }))
    .process(html)
    .then(function(result) {
        console.log(result.html);
        //<html>
        //<head>
        //    <title>index.html</title>
        //</head>
        //<body>
        //    <button class="button"><div class="button__text">Text</div></button>
        //</body>
        //</html>
    })
```

## Options

__root__: Root folder path for include. Default `./`

__encoding__: Default `utf-8`
