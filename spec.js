describe('asserter', function() {

  var asserter = require('./asserter');
  // Suppress tests output.
  asserter.display = () => {};

  var hasFailed = (test) => !test.result;

  it('should pass default tests', function() {
    // Run default tests.
    var testSuite = require('./test');
    expect(testSuite.tests.every(hasFailed)).toBe(false);
  });

  it('should fail test', function() {
    // Force an error.
    asserter.test('Equals').equals(1, 2);
    expect(asserter.tests.some(hasFailed)).toBe(true);
  });

});
