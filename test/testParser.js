var assert = require('assert')
  , RogotoParser = require('../index.js');

describe('RogotoParser', function  () {
  describe('#parse', function  () {
    it('should parse a string and error if no string passed in', function  () {
      var parser = new RogotoParser();
      var passed = 0;
      try {
        parser.parse();
      } catch (e) {
        if (e.name == 'RogotoParserException' && e.message == 'You need to pass in a string of code') {
            passed = 1;
        }
        // If we get here we have passed
      }
      assert.equal(passed, 1, 'Parse should have thrown an error');
    });

    it('should return a "syntax" error if it doesnt understand a command', function  () {
      var parser = new RogotoParser();
      var passed = 0;
      try {
        parser.parse('blahblahh');
      } catch (e) {
        if (e.name == 'RogotoParserException' && e.message == 'You need to pass in valid syntax') {
          passed = 1;
        }
      }
      assert.equal(passed, 1, 'Parse should have thrown a "syntax" error');
    });

    it('should parse a "pendown" command', function  () {
      var parser = new RogotoParser();
      var result = parser.parse('pendown');
      assert.equal(result, 'pendown', 'Parse should return an array with pendown but got ' + result);
    });

    it('should parse a "pd" command as pendown and return "pendown"', function  () {
      var parser = new RogotoParser();
      var result = parser.parse('pd');
      assert.equal(result, 'pendown', 'Parse should return an array with pendown but got ' + result);
    });

    it('should parse a "penup" command', function  () {
      var parser = new RogotoParser();
      var result = parser.parse('penup');
      assert.equal(result, 'penup', 'Parse should return an array with penup but got ' + result);
    });

    it('should parse a "pu" command as penup and return "penup"', function  () {
      var parser = new RogotoParser();
      var result = parser.parse('pu');
      assert.equal(result, 'penup', 'Parse should return an array with penup but got ' + result);
    });
  });
});