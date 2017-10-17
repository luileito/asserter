describe('asserter', function() {

  var hasFailed = (test) => !test.result;

  var loadTests = function(module) {
    var asserter = require('../asserter');
    // Suppress output.
    asserter.output = () => {};

    var testSuite = require(module);

    beforeEach(function() {
      testSuite.run('BEGIN');
    });

    afterAll(function() {
      testSuite.run('END');
    });

    it('should pass default tests', function() {
      // Inspect default tests.
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
  }

  describe('suite1', loadTests.bind(this, './test'));
  //describe('suite2', loadTests.bind(this, './test.alt'));

});
