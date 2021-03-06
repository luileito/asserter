# asserter

A tiny assertion lib (ES5+ compliant) with zero dependencies and zero configuration.
Written in [isomorphic JavaScript](https://en.wikipedia.org/wiki/Isomorphic_JavaScript)
(works for both NodeJS and the browser),
this software is meant to run quick and dirty unit tests: just load the lib and use it!

The source code is about 200 lines (fully documented),
the minified version is just 4 Kb (1 Kb if gzipped).

## Disclaimer

There are many good unit testing libs out there for NodeJS and the browser (and for both environments).
However, everything I tried so far either works well in NodeJS,
or needs to inject many external dependencies in the browser,
or requires complex setups (and most unit tests are not that complex eventually).
This library simply gets the job done.

## Minimal working example

A test is defined as `asserter.test('label').<method>(arg1, arg2)`,
or using the [alternative syntax](#alternative-syntax):
`asserter.test('label').that(arg1).<method>(arg2)`.

Once you've defined a set of tests, just call `assert.run()` to run all tests.

### In NodeJS

```js
var asserter = require('asserter');
asserter.test('Equals def').equals(1, 2);
// or: asserter.test('Equals alt').that(1).equals(2);
asserter.test('Not contains string').not().contains('Hi there', 'foo');
// or: asserter.test('Not contains string').that('Hi there').not().contains('foo');
asserter.run();
```

![Sample output](sample-node.png?raw=true)

Or you can run `npm test` to see it working.

### In the browser

```html
<script src="asserter.js"></script>
<script>
asserter.test('Equals def').equals(1, 2);
// or: asserter.test('Equals alt').that(1).equals(2);
asserter.test('Not contains string').not().contains('Hi there', 'foo');
// or: asserter.test('Not contains string').that('Hi there').not().contains('foo');
asserter.run();
</script>
```

![Sample output](sample-browser.png?raw=true)

Or you can open `test.html` with your browser to see it working (hit `F12` to open the developer console).

## Supported tests

* `equals(arg1, arg2)`

Test if two arguments are equal (truthy comparison).

* `strictEquals(arg1, arg2)` or `is(arg1, arg2)`

Test if two arguments are equal (strict comparison).

* `isGreaterThan(arg1, arg2)`

Test if `arg1` is greater than `arg2`.

* `isGreaterThanOrEquals(arg1, arg2)`

Test if `arg1` is greater than or equal `arg2`.

* `isLessThan(arg1, arg2)`

Test if `arg1` is less than `arg2`.

* `isLessThanOrEquals(arg1, arg2)`

Test if `arg1` is less than or equal `arg2`.

* `matches(str, re)`

Test if string `str` matches regular expression `re`.

* `contains(str, sub)`

Test if string `str` contains string `sub`.

* `hasType(arg, type)`

Test if `arg` is of type `type`.

* `inherits(arg, type)`

Test if `arg` is an instance of `type`.

* `throws(arg)`

Test if `arg` throws an error.

* `not()`

This will negate the current test result.
See examples above or below.

## Features

### Test methods are chainable

```js
asserter
.test('Equals').equals(1, 2)
.test('Not contains string').not().contains('Hi there', 'foo')
.run()
```

### Tests can be grouped (poor man's test suites)

```js
asserter
// Start test suite.
.test('Equals 1').equals(1, 1)
.test('Equals undef').equals(null, undefined)
.run('Equality tests')
// Start another test suite.
.test('Contains string').matches('foo', /o+/)
.test('Not contains string').not().contains('Hi there', 'foo')
.run('String tests')
```

### Labels have sprintf capability

```js
asserter
.test('Hi %s', 'there').isGreaterThan(2, 1)
.run('Test %s began on %s', 42, new Date)
```

### Method arguments can be anything

If you pass in *arrays*, they will be casted to strings when testing equality; e.g., `[1,2]` becomes `'1,2'`.
```js
asserter
.test('Array test').equals([1,2], [1,2])
.run();
```

If you pass in *objects*, they will be casted to JSON when testing equality; e.g., `{foo:1}` becomes `'{"foo":1}'`.
```js
asserter
.test('Object test').equals({foo:1}, {foo:1})
.run();
```

**Note:** This casting is not performed when testing for *strict* equality.

Finally, if you pass in *functions*, their return values will be tested in any case.
```js
asserter
.test('Function test #1').equals(function() { return 2; }, function() { return 2; })
.test('Function test #2').equals(2, function() { return 2; })
.test('Function test #3').equals(function() { return 2; }, 2)
.test('Should be undefined').equals(function() { return; }, undefined)
.run();
```

### Alternative syntax

A more convenient syntax is supported, where values and operators are explicitly declared and are thus easier to spot,
which allows to be read e.g. as "Test that {value} is greater than {value}".

```js
asserter
// Start test suite.
.test('Equals 1').that(1).equals(1)
.test('Equals undef').that(null).equals(undefined)
.run('Equality tests')
// Start another test suite.
.test('Contains string').that('foo').matches(/o+/)
.test('Not contains string').that('Hi there').not().contains('foo')
.run('String tests')
```

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
