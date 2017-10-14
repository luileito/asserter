# asserter

A tiny assertion lib with zero dependencies written in isomorphic JavaScript (works for both NodeJS and the browser) that is ES5+ compliant.

The source code is about 200 lines (fully documented), the minified version is just 3 Kb.

## Minimal working example

More usage cases coming soon.

### In NodeJS

```js
var asserter = require('asserter');
asserter.test('Equals').equals(1, 2);
asserter.test('Not contains string').not().contains('Hi there', 'foo');
asserter.run();
```

![Sample output](sample-node.png?raw=true)

Or you can run `npm test` to see it working.

### In the browser

```html
<script src="asserter.js"></script>
<script>
asserter.test('Equals').equals(1, 2);
asserter.test('Not contains string').not().contains('Hi there', 'foo');
asserter.run();
</script>
```

![Sample output](sample-browser.png?raw=true)

Or you can open `test.html` with your browser to see it working (hit `F12` to open the developer console).

## Documentation

Run `npm run docs` to generate the documentation in the `docs` directory (autogenerated).

**Note:** You need `jsdoc` to run this command. If that's not the case, run `[sudo] npm i -g jsdoc`.

## Minification

Run `npm run dist` to create the `assert.min.js` file.
This will optimize file requests if you use this lib in a browser.

**Note:** You need `uglifyjs` to run this command. If that's not the case, run `[sudo] npm i -g uglifyjs`.

## Code linting

Run `npm run lint` to analyze the source code for potential errors.

**Note:** You need `eslint` to run this command. If that's not the case, run `[sudo] npm i -g eslint`.

## Coverage tests

Run `npm run cover` to generate a report in the `coverage` directory (autogenerated).

**Note:** You need both `jasmine` and `istanbul` to run this command. If that's not the case, run `[sudo] npm i -g jasmine istanbul`.


## License

This libray is released with the [MIT license](LICENSE).
The only requirement is that you keep my copyright notice intact when you repurpose, redistribute, or reuse this code.
