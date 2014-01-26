var assert = require('assert')
  , parser = require('../index.js');

describe('RogotoParser', function  () {
  describe('#parse', function  () {
    it('should parse a string and error if no string passed in', function  () {
      var passed = 0;
      try {
        parser.parse();
      } catch (e) {
        passed = 1;
        // If we get here we have passed
      }
      assert.equal(passed, 1, 'Parse should have thrown an error');
    })
  })
})