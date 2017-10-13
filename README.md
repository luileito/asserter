# asserter

A tiny assertion lib with zero dependencies written in isomorphic JavaScript (works for both NodeJS and the browser).

The source code is about 100 lines (including comments), the minified version is just 2.7 Kb.

## Minimal working example

More usage cases coming soon.

### In NodeJS

```js
var asserter = require('asserter');
asserter.test('Equals').equals(1, 1);
asserter.test('Not contains string').not().contains('Hi there', 'foo');
asserter.run();
```

![Sample output](sample-node.png?raw=true)

Or you can run `npm test` to see it working.

### In the browser

```html
<script src="asserter.js"></script>
<script>
asserter.test('Equals').equals(1, 1);
asserter.test('Not contains string').not().contains('Hi there', 'foo');
asserter.run();
</script>
```

![Sample output](sample-browser.png?raw=true)

Or you can open `test.html` with your browser to see it working (hit `F12` to open the developer console).
