var assert = require('./assert');

assert.test('Equals').equals(1, true);
assert.test('Not equals').not().equals(1, false);
assert.test('Strict equals').strictEquals(1, 1);
assert.test('Not strict equals').not().strictEquals(1, '1');

assert.test('Greater than').isGreaterThan(1, 0);
assert.test('Not greater than').not().isGreaterThan(0, 1);
assert.test('Greater than or equals').isGreaterThanOrEquals(1, 1);
assert.test('Not greater than or equals').not().isGreaterThanOrEquals(1, 2);
assert.test('Less than').isLessThan(0, 1);
assert.test('Not less than').not().isLessThan(1, 0);
assert.test('Less than or equals').isLessThanOrEquals(0, 0);
assert.test('Not less than or equals').not().isLessThanOrEquals(1, 0);

assert.test('Contains string').contains('Hi there', 'Hi');
assert.test('Not contains string').not().contains('Hi there', 'foo');
assert.test('Matches regexp').matches(/^B/, 'Bye');
assert.test('Not matches regexp').not().matches(/^Z/, 'Bye');

assert.test('Throws error').throws(function() {
  throw new Error;
});

assert.run();
