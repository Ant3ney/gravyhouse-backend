var testCharacter = require("./testCharacters");
var assemblySchedule = require("../assemblySchedule");

//In future this data should be derived from user mongo model
var data = {
    testCharacters: testCharacter,
    shiftStructure: assemblySchedule(testCharacter),

    //for now
    initialChapter: 0
}

module.exports = data;