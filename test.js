var asserter = require('./asserter');

asserter.test('Equals').equals(1, true);
asserter.test('Not equals').not().equals(1, false);
asserter.test('Strict equals').strictEquals(1, 1);
asserter.test('Not strict equals').not().strictEquals(1, '1');

asserter.test('Greater than').isGreaterThan(1, 0);
asserter.test('Not greater than').not().isGreaterThan(0, 1);
asserter.test('Greater than or equals').isGreaterThanOrEquals(1, 1);
asserter.test('Not greater than or equals').not().isGreaterThanOrEquals(1, 2);
asserter.test('Less than').isLessThan(0, 1);
asserter.test('Not less than').not().isLessThan(1, 0);
asserter.test('Less than or equals').isLessThanOrEquals(0, 0);
asserter.test('Not less than or equals').not().isLessThanOrEquals(1, 0);

asserter.test('Contains string').contains('Hi there', 'Hi');
asserter.test('Not contains string').not().contains('Hi there', 'foo');
asserter.test('Matches regexp').matches(/^B/, 'Bye');
asserter.test('Not matches regexp').not().matches(/^Z/, 'Bye');

asserter.test('Throws error').not().throws(function() {
  throw new Error;
});

asserter.run();
