var testCharacter = require("./testCharacters");
var assemblySchedule = require("../assemblySchedule");
var availableDays = require("./availableDays");

//In future this data should be derived from user mongo model
var data = {
    testCharacters: testCharacter,
    shiftStructure: assemblySchedule(testCharacter),
    availableDays: availableDays,
    
    //for now
    initialChapter: 0
}

module.exports = data;