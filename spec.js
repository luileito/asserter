describe('asserter', function() {

  var asserter = require('./asserter');
  // Suppress output.
  asserter.display = () => {};

  var testSuite = require('./test');
  var hasFailed = (test) => !test.result;

  it('should pass default tests', function() {
    // Run default tests.
    expect(testSuite.tests.every(hasFailed)).toBe(false);
  });

  it('should clean tests after run', function() {
    testSuite.run();
    expect(testSuite.tests.length).toBe(0);
  });

  it('should fail test', function() {
    // Force an error.
    asserter.test('Equals').equals(1, 2);
    expect(asserter.tests.some(hasFailed)).toBe(true);
  });

});
