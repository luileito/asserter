var asserter = require('../asserter');

asserter
// Basic comparisons.
.test('Equals').that(1).equals(true)
.test('Not equals').that(1).not().equals(false)
.test('Strict equals').that(1).is(1)
.test('Not strict equals').that(1).not().is('1')
// Watch out: objects will be compared as strings.
.test('Array equals').that([1,2]).equals([1,2])
.test('Object equals').that({foo:1}).equals({foo:1})
.test('Function equals').that(function(){ return }).equals(function(){ return })
// Numerical comparisons.
.test('Greater than').that(1).isGreaterThan(0)
.test('Not greater than').that(0).not().isGreaterThan(1)
.test('Greater than or equals').that(1).isGreaterThanOrEquals(1)
.test('Not greater than or equals').that(1).not().isGreaterThanOrEquals(2)
.test('Less than').that(0).isLessThan(1)
.test('Not less than').that(1).not().isLessThan(0)
.test('Less than or equals').that(0).isLessThanOrEquals(0)
.test('Not less than or equals').that(1).not().isLessThanOrEquals(0)
// String comparisons.
.test('Contains string').that('Hi there').contains('Hi')
.test('Not contains string').that('Hi there').not().contains('foo')
.test('Matches regexp').that(/^B/).matches('Bye')
.test('Not matches regexp').that(/^Z/).not().matches('Bye')
// Error comparisons.
.test('Throws error').that(function() { throw new Error; }).throws()
.test('Not throws error').that(true).not().throws()
;

// Export this suite for unit testing & coverage tests.
if (typeof module !== 'undefined' && require.main !== module) module.exports = asserter;
// Otherwise, run tests.
else asserter.run();
