describe('asserter', function() {

  var hasFailed = (test) => !test.result;

  var loadSuite = function(module) {
    var asserter;

    beforeAll(function() {
      asserter = require(module);
      // Suppress output.
      asserter.output = () => {};
    });

    afterAll(function() {
      asserter.run();
    });

    it('should pass default tests', function() {
      // Inspect default tests.
      expect(asserter.tests.every(hasFailed)).toBe(false);
    });

    it('should fail test', function() {
      // Force an error.
      asserter.test('Equals').equals(1, 2);
      expect(asserter.tests.some(hasFailed)).toBe(true);
    });

    it('should clean tests after run', function() {
      asserter.run();
      expect(asserter.tests.length).toBe(0);
    });
  }

  describe('suite1', loadSuite.bind(this, './test'));
  describe('suite2', loadSuite.bind(this, './test.alt'));

});
