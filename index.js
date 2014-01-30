function RogotoParserException (message) {
    this.message = message;
    this.name = "RogotoParserException";
}

function RogotoParser () {
    this.codeToExecute = [];
}

RogotoParser.prototype.parse = function(logoCode) {
    if (!logoCode) {
        throw new RogotoParserException("You need to pass in a string of code");
    }

    var codeRegex = /pendown|pd|penup|pu|forward \d+|fd \d+/;
    var match = codeRegex.exec(logoCode);
    if (!match) {
      throw new RogotoParserException("You need to pass in valid syntax");
    }
    var cmd = match[0].split(' ')
    switch (cmd[0]) {
      case 'pendown':
      case 'pd':
        this.codeToExecute.push('pendown');
        break;
      case 'penup':
      case 'pu':
        this.codeToExecute.push('penup');
        break;
      case 'forward':
      case 'fd':
        var command = match[0].split(' ')[0] == 'forward'? match[0] : 'forward ' + cmd[1];
        this.codeToExecute.push(command);
        break;
    }
    return this.codeToExecute;
};

module.exports = RogotoParser;