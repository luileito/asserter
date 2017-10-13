/* eslint-env browser */
(function() {
  'use strict';
  // Detect env.
  var isNode = typeof module !== 'undefined' && module.exports;
  /**
    A tiny assertion lib for both nodejs and the browser.
    @module asserter
    @author Luis Leiva
  */
  var asserter = {
    tests: [],
    currentTest: null,
    negated: false,
    test: function(message) {
      this.currentTest = message;
      this.negated = false;
      return this;
    },
    _set: function(value, reference, operator, result) {
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
    _condition: function(expr) {
      return !this.negated ? expr : !expr;
    },
    not: function() {
      this.negated = true;
      return this;
    },
    // BEGIN General-purpose matchers.
    equals: function(value, reference) {
      return this._set(value, reference, '==', this._condition(value == reference));
    },
    strictEquals: function(value, reference) {
      return this._set(value, reference, '===', this._condition(value === reference));
    },
    // BEGIN Numberical matchers.
    isGreaterThan: function(value, reference) {
      return this._set(value, reference, '>', this._condition(value > reference));
    },
    isGreaterThanOrEquals: function(value, reference) {
      return this._set(value, reference, '>=', this._condition(value >= reference));
    },
    isLessThan: function(value, reference) {
      return this._set(value, reference, '<', this._condition(value < reference));
    },
    isLessThanOrEquals: function(value, reference) {
      return this._set(value, reference, '<=', this._condition(value <= reference));
    },
    // BEGIN RegExp matchers.
    matches: function(value, reference) {
      return this._set(value, reference, 'matches', this._condition(value.test(reference)));
    },
    // BEGIN String matchers.
    contains: function(value, reference) {
      return this._set(value, reference, 'contains', this._condition(value.indexOf(reference) > -1));
    },
    // BEGIN Other matchers.
    throws: function(fn) {
      try {
        fn();
        this._set(new Error, new Error, 'throws', this._condition(false));
      } catch (err) {
        this._set(new Error, 'success', 'throws', this._condition(true));
      }
    },
    display: console.log,
    // Main.
    run: function() {
      var successes = 0;
      var errors = 0;
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
        asserter.display(sprintf('[%s] %s', label, test.message));
      });
      asserter.display(sprintf('\n%s/%s tests passed (%s errors).', successes, successes + errors, errors));
      // Reset state.
      this.tests = [];
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
