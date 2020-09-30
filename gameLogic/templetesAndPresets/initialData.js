var testCharacter = require("./testCharacters");

//In future this data should be derived from user mongo model
var data = {
    testCharacters: testCharacter,
    shiftStructure: {},

    //for now
    initialChapter: 0
}

module.exports = data;