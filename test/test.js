import {getSpentTime} from '../src/index'

let assert = require('chai').assert;

describe('getSpentTime()', function() {
  let tests = [
    {string: 'all I did today; i 20m, 35m, 2.5h, 2h40m v 40m 35m 1.2h e 30, 60m', expected: {
      i: 365,
      v: 147,
      e: 90
    }},
    {string: 'all I did today; i  30m, 35m, 2m, 5m, 3h30m v 40m 35m 1.5h sef 350, 60', expected: {
      i: 282,
      v: 165,
      sef: 410
    }},
    {string: 'all I did today;r i vlad 20m, 20, 20m, g 35m, 2.5h, 2hu40m v 40h20m vlad 132h20m r1.2h e 30, 60m i pp', expected: {
      vlad: 8000,
      g: 185,
      v: 2420,
      e: 90
    }},
    {string: 'all I did today;r 22 i vlad 20m, 20h 20m, g 35m, 2.5h 2hu40m v 40h20m vlad 132h20m r1.2h e 30, 60m i pp 1h4m 2m', expected: {
      r: 22,
      vlad: 9180,
      g: 185,
      v: 2420,
      e: 90,
      pp: 66,
    }},
    {string: 'all I did today;r 22 i vlad 20m, 20h 20m, g 35m, 2.5h2hu40m v 40h20m vlad 132h20m r1.2h e 30, 60m i pp 1h4m 2m', expected: {
      r: 22,
      vlad: 9180,
      g: 35,
      v: 2420,
      e: 90,
      pp: 66,
    }}
  ];

  tests.forEach(function(test) {
    it(`string: ${test.string}
      result: ${JSON.stringify(getSpentTime(test.string))}
      expected: ${JSON.stringify(test.expected)}`, function() {
      let res = JSON.stringify(getSpentTime(test.string));
      assert.equal(res, JSON.stringify(test.expected));
    });
  });
});