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

    var codeRegex = /pendown|pd/;
    var match = codeRegex.exec(logoCode);
    if (!match) {
      throw new RogotoParserException("You need to pass in valid syntax");
    }
    switch (match[0]) {
      case 'pendown':
      case 'pd':
        this.codeToExecute.push(match[0]);
        break;
    }
    return this.codeToExecute;
};

module.exports = RogotoParser;