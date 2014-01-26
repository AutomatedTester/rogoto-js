function RogotoParser () {
}

RogotoParser.prototype.parse = function(logoCode) {
    if (!logoCode) {
        throw "You need to pass in a string of code";
    }
};

module.exports = new RogotoParser();