var asserter = require('../asserter');

asserter
// Basic comparisons.
.test('Equals truthy').equals(1, true)
.test('Equals falsy').equals(0, false)
.test('Equals undef').equals(null, undefined)
.test('Equals arr').equals([], [])
.test('Equals obj').equals({}, {})
.test('Not equals').not().equals(1, false)
.test('Strict equals num').strictEquals(1, 1)
.test('Strict equals bool').strictEquals(true, true)
.test('Not strict equals num').not().strictEquals(1, '1')
.test('Not strict equals arr').not().strictEquals([], [])
.test('Not strict equals obj').not().strictEquals({}, {})
.test('Not strict equals falsy').not().strictEquals(null, undefined)
// Watch out: objects will be compared as strings.
.test('Array equals').equals([1,2], [1,2])
.test('Object equals').equals({foo:1}, {foo:1})
.test('Function equals').equals(function(){ return }, function(){ return })
// Numerical comparisons.
.test('Greater than').isGreaterThan(1, 0)
.test('Not greater than').not().isGreaterThan(0, 1)
.test('Greater than or equals').isGreaterThanOrEquals(1, 1)
.test('Not greater than or equals').not().isGreaterThanOrEquals(1, 2)
.test('Less than').isLessThan(0, 1)
.test('Not less than').not().isLessThan(1, 0)
.test('Less than or equals').isLessThanOrEquals(0, 0)
.test('Not less than or equals').not().isLessThanOrEquals(1, 0)
// String comparisons.
.test('Contains string').contains('Hi there', 'Hi')
.test('Not contains string').not().contains('Hi there', 'foo')
.test('Matches regexp').matches('Bye', /^B/)
.test('Not matches regexp').not().matches('Bye', /^Z/)
// Error comparisons.
.test('Throws error').throws(function() { throw new Error; })
.test('Not throws error').not().throws(true)
// Misc.
.test('Has type').hasType('Hi', 'string')
.test('Inherits').inherits([], 'array')
;

// Export this suite for unit testing & coverage tests.
if (typeof module !== 'undefined' && require.main !== module) module.exports = asserter;
// Otherwise, run tests.
else asserter.run();
