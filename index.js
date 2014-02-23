function RogotoParserException (message) {
    this.message = message;
    this.name = "RogotoParserException";
}

function RogotoParser () {
    this.codeToExecute = [];
    this.penState = 'up';
}

RogotoParser.prototype.parse = function(logoCode) {
    this.codeToExecute = [];
    if (!logoCode) {
        throw new RogotoParserException("You need to pass in a string of code");
    }

    var codeRegex = /pendown|pd|penup|pu|forward \d+|fd \d+|back \d+|bk \d+|right \d+|rt \d+|left \d+|lt \d+/;
    commands = logoCode.split('\n');
    for (var i = 0; i < commands.length; i++) {
      var match = codeRegex.exec(commands[i]);
      if (!match) {
        throw new RogotoParserException("You need to pass in valid syntax");
      }
      var cmd = match[0].split(' ');
      switch (cmd[0]) {
        case 'pendown':
        case 'pd':
          this.codeToExecute.push('pendown');
          this.penState = 'down';
          break;
        case 'penup':
        case 'pu':
          this.codeToExecute.push('penup');
          this.penState = 'up';
          break;
        case 'forward':
        case 'fd':
          var command = match[0].split(' ')[0] == 'forward'? match[0] : 'forward ' + cmd[1];
          this.codeToExecute.push(command);
          break;
        case 'back':
        case 'bk':
          var command = match[0].split(' ')[0] == 'back'? match[0] : 'back ' + cmd[1];
          this.codeToExecute.push(command);
          break;
        case 'right':
        case 'rt':
          var command = match[0].split(' ')[0] == 'right'? match[0] : 'right ' + cmd[1];
          this.codeToExecute.push(command);
          break;
        case 'left':
        case 'lt':
          var command = match[0].split(' ')[0] == 'left'? match[0] : 'left ' + cmd[1];
          this.codeToExecute.push(command);
          break;
      }
    };
    return this.codeToExecute;
};

RogotoParser.prototype.clean = function() {
    this.codeToExecute = [];
};

module.exports = RogotoParser;