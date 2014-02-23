var assert = require('assert')
  , RogotoParser = require('../index.js');

describe('RogotoParser', function  () {
  describe('#parse', function  () {
    it('should clear the parser array everytime it is called', function () {
      var parser = new RogotoParser();
      var result = parser.parse('pendown');
      assert.deepEqual(result, ['pendown']);
      result = [];
      result = parser.parse('penup\nforward 10');
      assert.deepEqual(result, ['penup', 'forward 10']);
    });

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

    it('should parse a "forward 10" command as forward and return "forward 10"', function  () {
      var parser = new RogotoParser();
      var result = parser.parse('forward 10');
      assert.equal(result, 'forward 10', 'Parse should return an array with forward 10 but got ' + result);
    });

    it('should parse a "fd 11" command as forward 11 and return "forward 11"', function  () {
      var parser = new RogotoParser();
      var result = parser.parse('fd 11');
      assert.equal(result, 'forward 11', 'Parse should return an array with forward 11 but got ' + result);
    });

    it('should parse a "back 10" command as back and return "back 10"', function  () {
      var parser = new RogotoParser();
      var result = parser.parse('back 10');
      assert.equal(result, 'back 10', 'Parse should return an array with back 10 but got ' + result);
    });

    it('should parse a "back 10" command as back and return "back 10"', function  () {
      var parser = new RogotoParser();
      var result = parser.parse('bk 11');
      assert.equal(result, 'back 11', 'Parse should return an array with back 11 but got ' + result);
    });

    it('should parse a "right 45" command as back and return "right 45"', function  () {
      var parser = new RogotoParser();
      var result = parser.parse('right 45');
      assert.equal(result, 'right 45', 'Parse should return an array with right 45 but got ' + result);
    });

    it('should parse a "rt 45" command as back and return "right 45"', function  () {
      var parser = new RogotoParser();
      var result = parser.parse('rt 45');
      assert.equal(result, 'right 45', 'Parse should return an array with right 45 but got ' + result);
    });

    it('should parse a "left 45" command as back and return "left 45"', function  () {
      var parser = new RogotoParser();
      var result = parser.parse('left 45');
      assert.equal(result, 'left 45', 'Parse should return an array with left 45 but got ' + result);
    });

    it('should parse a "lt 45" command as back and return "left 45"', function  () {
      var parser = new RogotoParser();
      var result = parser.parse('lt 45');
      assert.equal(result, 'left 45', 'Parse should return an array with left 45 but got ' + result);
    });

    it('should keep the state of the pen', function () {
      var parser = new RogotoParser();
      assert.equal(parser.penState, 'up', 'Pen state should be up');
      parser.parse('pendown');
      assert.equal(parser.penState, 'down', 'Pen state should be down');
      parser.parse('penup');
      assert.equal(parser.penState, 'up', 'Pen state should be up');
    });

    it('should parse multiline code and return an array', function () {
      var parser = new RogotoParser();
      var result = parser.parse('pd\nforward 10\nlt 45\nforward 20\npu')
      assert.deepEqual(result, ['pendown', 'forward 10', 'left 45', 'forward 20', 'penup'])
    })
  });

  describe("#clean", function () {
    it("should allow us to clear the current code", function () {
      var parser = new RogotoParser();
      parser.parse('lt 45');
      parser.clean();
      assert.equal(parser.codeToExecute, '', 'codeToExecute should have nothing in it but has ' + parser.codeToExecute);
    });
  });
});