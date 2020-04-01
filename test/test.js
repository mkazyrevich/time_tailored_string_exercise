import {getSpentTime} from '../src/index'

let assert = require('chai').assert;

describe('getSpentTime()', function() {
  var tests = [
    {string: 'all I did today; i 20m, 35m, 2.5h, 2h40m v 40m 35m 1.2h e 30, 60m', expected: {
      i: 205,
      v: 147,
      e: 90
    }},
    {string: 'all I did today; i  30m, 35m, 2m, 5m, 3h30m v 40m 35m 1.5h sef 350, 60', expected: {
      i: 282,
      v: 165,
      sef: 410
    }}
  ];

  tests.forEach(function(test) {
    it('test', function() {
      let res = JSON.stringify(getSpentTime(test.string));
      assert.equal(res, JSON.stringify(test.expected));
    });
  });
});