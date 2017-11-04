/* eslint-env browser */
(function() {
  'use strict';

  // Detect env.
  var isNode = typeof module !== 'undefined' && module.exports;
  // Create some unique string to enable syntactic sugar methods (see below).
  // Otherwise, we couldn't compare any falsy value against a reference
  // using the `.that()` operator because it'd be ill-defined.
  var seed = (new Date).getTime() + Math.random();

  /**
   * A tiny assertion lib for both nodejs and the browser.
   * @module asserter
   * @author Luis Leiva
   * @todo Async support.
   * @example
   * // Import asserter via require (node) or in a script tag (browser).
   * asserter.test('Equals').equals(1, 1);
   * asserter.run();
   */
  var asserter = {
    /**
     * Current test set. Will be empty after calling `asserter.run()`.
     * @type {array}
     * @memberof module:asserter
     */
    tests: [],
    _message: null,
    _negated: false,
    _subject: seed,
    /**
     * Define test.
     * @param {...args} args Test label, with `sprintf` capability.
     * @return {module:asserter} The asserter module.
     * @memberof module:asserter
     * @example asserter.test('Some label').<method>(arg1, arg2)
     * @example asserter.test('Some label').that(arg1).<method>(arg2);
     */
    test: function() {
      this._message = sprintf.apply(this, [].slice.call(arguments));
      this._negated = false;
      this._subject = seed;
      return this;
    },
    /**
     * Defines the argument to be tested.
     * @param {mixed} arg Input value.
     * @return {module:asserter} The asserter module.
     * @memberof module:asserter
     * @example asserter.test('label').that(1).equals(1);
     */
    that: function(arg) {
      this._subject = arg;
      return this;
    },
    _save: function(value, operator, reference, result) {
      this.tests.push({
        value: value,
        reference: reference,
        operator: operator,
        negated: this._negated,
        result: result,
        message: this._message,
      });
      return this;
    },
    _get: function(what) {
      if (typeof what === 'function') what = what();
      return what;
    },
    _condition: function(expr) {
      return !this._negated ? expr : !expr;
    },
    /**
     * Negate current test.
     * @return {module:asserter} The asserter module.
     * @memberof module:asserter
     * @example asserter.test('Some label').not().<method>;
     */
    not: function() {
      this._negated = true;
      return this;
    },
    /**
     * Test if two arguments are equals (truthy).
     * @param {mixed} value Input value.
     * @param {mixed} reference Expected value.
     * @return {module:asserter} The asserter module.
     * @memberof module:asserter
     * @example asserter.test('Some label').equals(1, '1');
     * @example asserter.test('Some label').that(1).equals('1');
     */
    equals: function(value, reference) {
      var val = this._get(this._subject !== seed ? this._subject : value);
      var ref = this._get(this._subject !== seed ? value : reference);
      if (val && typeof val === 'object') val = JSON.stringify(val);
      if (ref && typeof ref === 'object') ref = JSON.stringify(ref);
      return this._save(val, '==', ref, this._condition(val == ref));
    },
    /**
     * Test if two arguments are strictly equals.
     * @param {mixed} value Input value.
     * @param {mixed} reference Expected value.
     * @return {module:asserter} The asserter module.
     * @memberof module:asserter
     * @example asserter.test('Some label').strictEquals(1, 1);
     * @example asserter.test('Some label').is(1, 1);
     * @example asserter.test('Some label').that(1).is(1);
     */
    strictEquals: function(value, reference) {
      var val = this._get(this._subject !== seed ? this._subject : value);
      var ref = this._get(this._subject !== seed ? value : reference);
      return this._save(val, '===', ref, this._condition(val === ref));
    },
    /**
     * Test if value is greater than reference value.
     * @param {number} value Input value.
     * @param {number} reference Expected value.
     * @return {module:asserter} The asserter module.
     * @memberof module:asserter
     * @example asserter.test('Some label').isGreaterThan(2, 1);
     * @example asserter.test('Some label').that(2).isGreaterThan(1);
     */
    isGreaterThan: function(value, reference) {
      var val = this._get(this._subject !== seed ? this._subject : value);
      var ref = this._get(this._subject !== seed ? value : reference);
      return this._save(val, '>', ref, this._condition(val > ref));
    },
    /**
     * Test if value is greater than or equal reference value.
     * @param {number} value Input value.
     * @param {number} reference Expected value.
     * @return {module:asserter} The asserter module.
     * @memberof module:asserter
     * @example asserter.test('Some label').isGreaterThanOrEquals(2, 1);
     * @example asserter.test('Some label').that(2).isGreaterThanOrEquals(1);
     */
    isGreaterThanOrEquals: function(value, reference) {
      var val = this._get(this._subject !== seed ? this._subject : value);
      var ref = this._get(this._subject !== seed ? value : reference);
      return this._save(val, '>=', ref, this._condition(val >= ref));
    },
    /**
     * Test if value is less than reference value.
     * @param {number} value Input value.
     * @param {number} reference Expected value.
     * @return {module:asserter} The asserter module.
     * @memberof module:asserter
     * @example asserter.test('Some label').isLessThan(1, 2);
     * @example asserter.test('Some label').that(1).isLessThan(2);
     */
    isLessThan: function(value, reference) {
      var val = this._get(this._subject !== seed ? this._subject : value);
      var ref = this._get(this._subject !== seed ? value : reference);
      return this._save(val, '<', ref, this._condition(val < ref));
    },
    /**
     * Test if value is less than or equal reference value.
     * @param {number} value Input value.
     * @param {number} reference Expected value.
     * @return {module:asserter} The asserter module.
     * @memberof module:asserter
     * @example asserter.test('Some label').isLessThanOrEquals(1, 2);
     * @example asserter.test('Some label').that(1).isLessThanOrEquals(2);
     */
    isLessThanOrEquals: function(value, reference) {
      var val = this._get(this._subject !== seed ? this._subject : value);
      var ref = this._get(this._subject !== seed ? value : reference);
      return this._save(val, '<=', ref, this._condition(val <= ref));
    },
    /**
     * Test if string matches regular expression.
     * @param {string} str String to test the regular expression.
     * @param {RegExp} re Regular expression.
     * @return {module:asserter} The asserter module.
     * @memberof module:asserter
     * @example asserter.test('Some label').matches('Bye', /^B/);
     * @example asserter.test('Some label').that('Bye').matches(/^B/);
     */
    matches: function(str, re) {
      var val = this._get(this._subject !== seed ? this._subject : str);
      var ref = this._get(this._subject !== seed ? str : re);
      return this._save(val, 'matches', ref, this._condition(val.match(ref)));
    },
    /**
     * Test if string contains substring.
     * @param {string} str Input string.
     * @param {string} sub Expected substring.
     * @return {module:asserter} The asserter module.
     * @memberof module:asserter
     * @example asserter.test('Some label').contains('Hi there', 'Hi');
     * @example asserter.test('Some label').that('Hi there').contains('Hi');
     */
    contains: function(str, sub) {
      var val = this._get(this._subject !== seed ? this._subject : str);
      var ref = this._get(this._subject !== seed ? str : sub);
      return this._save(val, 'contains', ref, this._condition(val.indexOf(ref) > -1));
    },
    /**
     * Test if value is of given type.
     * @param {number} value Input value.
     * @param {string} type Expected type.
     * @return {module:asserter} The asserter module.
     * @memberof module:asserter
     * @example asserter.test('Some label').hasType('Hi', 'string');
     * @example asserter.test('Some label').that('Hi').hasType('string');
     */
    hasType: function(value, type) {
      var val = this._get(this._subject !== seed ? this._subject : value);
      var ref = this._get(this._subject !== seed ? value : type);
      return this._save(val, 'hasType', ref, this._condition(typeof val === ref.toLowerCase()));
    },
    /**
     * Test if value is an instance of given type.
     * @param {number} value Input value.
     * @param {string} type Expected instance type.
     * @return {module:asserter} The asserter module.
     * @memberof module:asserter
     * @example asserter.test('Some label').inherits([], 'array');
     * @example asserter.test('Some label').that([]).inherits('array');
     */
    inherits: function(value, type) {
      var val = this._get(this._subject !== seed ? this._subject : value);
      var ref = this._get(this._subject !== seed ? value : type);
      return this._save(val, 'inherits', ref, this._condition(val.constructor.name.toLowerCase() === ref.toLowerCase()));
    },
    /**
     * Test if an error is thrown.
     * @param {mixed} value Input value.
     * @return {module:asserter} The asserter module.
     * @memberof module:asserter
     * @example asserter.test('Some label').throws(function() { throw new Error; });
     * @example asserter.test('Some label').that(function() { throw new Error; }).throws();
     */
    throws: function(value) {
      try {
        this._get(this._subject !== seed ? this._subject : value);
        return this._save(new Error, new Error, 'throws', this._condition(false));
      } catch (err) {
        return this._save(new Error, 'success', 'throws', this._condition(true));
      }
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
     * @type {function}
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
  /**
   * Alias of {@link module:asserter.strictEquals}
   * @function is
   * @memberof module:asserter
   */
  asserter.is = asserter.strictEquals;

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
