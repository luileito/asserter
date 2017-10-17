/* eslint-env browser */
(function() {
  'use strict';

  // Detect env.
  var isNode = typeof module !== 'undefined' && module.exports;
  /**
   * A tiny assertion lib for both nodejs and the browser.
   * @module asserter
   * @author Luis Leiva
   * @example
   * // Import asserter via require (node) or in a script tag (browser).
   * asserter.test('Equals').equals(1, 1);
   * asserter.run();
   */
  var asserter = {
    tests: [],
    currentTest: null,
    negated: false,
    /**
     * Define test.
     * @param {...args} args Test label, with `sprintf` capability.
     * @return {module:asserter} The asserter module.
     * @memberof module:asserter
     * @example asserter.test('Some label').<method>
     */
    test: function() {
      var msg = sprintf.apply(this, [].slice.call(arguments));
      this.currentTest = msg;
      this.negated = false;
      return this;
    },
    _save: function(value, operator, reference, result) {
      this.tests.push({
        value: value,
        reference: reference,
        operator: operator,
        negated: this.negated,
        result: result,
        message: this.currentTest,
      });
      return this;
    },
    _get: function(what) {
      if (typeof what === 'function') what = what();
      if (what && typeof what === 'object' && !(what instanceof RegExp)) what = JSON.stringify(what);
      return what;
    },
    _condition: function(expr) {
      return !this.negated ? expr : !expr;
    },
    /**
     * Negate current test.
     * @return {module:asserter} The asserter module.
     * @memberof module:asserter
     * @example asserter.test('Some label').not().<method>;
     */
    not: function() {
      this.negated = true;
      return this;
    },
    /**
     * Test if two arguments are equals (truthy).
     * @param {mixed} value Input value.
     * @param {mixed} reference Expected value.
     * @return {module:asserter} The asserter module.
     * @memberof module:asserter
     * @example asserter.test('Some label').equals(arg1, arg2);
     */
    equals: function(value, reference) {
      var val = this._get(value), ref = this._get(reference);
      return this._save(val, '==', ref, this._condition(val == ref));
    },
    /**
     * Test if two arguments are strictly equals.
     * @param {mixed} value Input value.
     * @param {mixed} reference Expected value.
     * @return {module:asserter} The asserter module.
     * @memberof module:asserter
     * @example asserter.test('Some label').strictEquals(arg1, arg2);
     */
    strictEquals: function(value, reference) {
      var val = this._get(value), ref = this._get(reference);
      return this._save(val, '===', ref, this._condition(val === ref));
    },
    /**
     * Test if value is greater than reference value.
     * @param {number} value Input value.
     * @param {number} reference Expected value.
     * @return {module:asserter} The asserter module.
     * @memberof module:asserter
     * @example asserter.test('Some label').isGreaterThan(num1, num2);
     */
    isGreaterThan: function(value, reference) {
      var val = this._get(value), ref = this._get(reference);
      return this._save(val, '>', ref, this._condition(val > ref));
    },
    /**
     * Test if value is greater than or equal reference value.
     * @param {number} value Input value.
     * @param {number} reference Expected value.
     * @return {module:asserter} The asserter module.
     * @memberof module:asserter
     * @example asserter.test('Some label').isGreaterThanOrEquals(num1, num2);
     */
    isGreaterThanOrEquals: function(value, reference) {
      var val = this._get(value), ref = this._get(reference);
      return this._save(val, '>=', ref, this._condition(val >= ref));
    },
    /**
     * Test if value is less than reference value.
     * @param {number} value Input value.
     * @param {number} reference Expected value.
     * @return {module:asserter} The asserter module.
     * @memberof module:asserter
     * @example asserter.test('Some label').isLessThan(num1, num2);
     */
    isLessThan: function(value, reference) {
      var val = this._get(value), ref = this._get(reference);
      return this._save(val, '<', ref, this._condition(val < ref));
    },
    /**
     * Test if value is less than or equal reference value.
     * @param {number} value Input value.
     * @param {number} reference Expected value.
     * @return {module:asserter} The asserter module.
     * @memberof module:asserter
     * @example asserter.test('Some label').isLessThanOrEquals(num1, num2);
     */
    isLessThanOrEquals: function(value, reference) {
      var val = this._get(value), ref = this._get(reference);
      return this._save(val, '<=', ref, this._condition(val <= ref));
    },
    /**
     * Test if regexp applies to string.
     * @param {RegExp} re Regular expression.
     * @param {string} str String to test the regular expression.
     * @return {module:asserter} The asserter module.
     * @memberof module:asserter
     * @example asserter.test('Some label').matches(/^B/, 'Bye');
     */
    matches: function(re, str) {
      var val = this._get(re), ref = this._get(str);
      return this._save(val, 'matches', ref, this._condition(val.test(ref)));
    },
    /**
     * Test if string contains substring.
     * @param {string} str Input string.
     * @param {string} sub Expected substring.
     * @return {module:asserter} The asserter module.
     * @memberof module:asserter
     * @example asserter.test('Some label').contains('Hi there', 'Hi');
     */
    contains: function(str, sub) {
      var val = this._get(str), ref = this._get(sub);
      return this._save(val, 'contains', ref, this._condition(val.indexOf(ref) > -1));
    },
    /**
     * Test if an error is thrown.
     * @param {mixed} value Input value.
     * @return {module:asserter} The asserter module.
     * @memberof module:asserter
     * @example asserter.test('Some label').throws(function() { throw new Error; });
     */
    throws: function(value) {
      try {
        this._get(value);
        this._save(new Error, new Error, 'throws', this._condition(false));
      } catch (err) {
        this._save(new Error, 'success', 'throws', this._condition(true));
      }
      return this;
    },
    /**
     * Output method.
     * @method
     * @param {...args} args Output message.
     * @return {module:asserter} The asserter module.
     * @memberof module:asserter
     */
    display: function() {
      var msg = sprintf.apply(this, [].slice.call(arguments));
      this.output(msg);
      return this;
    },
    /**
     * Output transport. Default: `console.log`.
     * @typeof {function}
     * @memberof module:asserter
     */
    output: console.log,
    /**
     * Run all tests.
     * @param {...args} args Suite label, with `sprintf` capability.
     * Useful to group tests or indicate the beginning of a test suite.
     * @return {module:asserter} The asserter module.
     * @memberof module:asserter
     */
    run: function() {
      var msg = sprintf.apply(this, [].slice.call(arguments));
      if (msg) this.display(msg);
      var successes = 0, errors = 0;
      this.tests.forEach(function(test) {
        var label = test.result ? greenBg('PASS') : redBg('FAIL');
        if (!test.result) {
          var reason = test.negated
            ? sprintf(
              'was NOT expecting "%s %s %s" (%s %s %s)',
              test.value, test.operator, test.reference,
              typeof test.value, test.operator, typeof test.reference
            )
            : sprintf('was expecting "%s %s %s" (%s %s %s)',
              test.value, test.operator, test.reference,
              typeof test.value, test.operator, typeof test.reference
            );
          test.message += ' ' + yellow(reason);
          errors++;
        } else {
          successes++;
        }
        this.display('[%s] %s', label, test.message);
      }, this);
      this.display('%s/%s tests passed (%s errors).\n', successes, successes + errors, errors);
      // Reset state.
      this.tests = [];
      return this;
    },
  };

  // How is that this function is not part of the std lib?
  function sprintf() {
    var args = [].slice.call(arguments);
    var str = args.shift();
    args.forEach(function(arg) {
      str = str.replace('%s', arg);
    });
    return str;
  }

  // Color helpers stuff.
  function colorize(color, msg) {
    if (!isNode) return msg;
    return color + msg + '\x1b[0m';
  }
  function redBg(msg) {
    return colorize('\x1b[41m', msg);
  }
  function greenBg(msg) {
    return colorize('\x1b[42m', msg);
  }
  function yellow(msg) {
    return colorize('\x1b[33m', msg);
  }

  // Expose library.
  if (isNode) {
    module.exports = asserter;
  } else {
    window.asserter = asserter;
  }

})();
