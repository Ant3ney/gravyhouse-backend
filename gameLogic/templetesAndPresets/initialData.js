var testCharacter = require("./testCharacters");
var assemblySchedule = require("../assemblySchedule");
var availableDays = require("./availableDays");

module.exports = () => {

    //In future this data should be derived from user mongo model
    return {
        testCharacters: testCharacter,
        shiftStructure: assemblySchedule(testCharacter),
        availableDays: availableDays,
    
        //for now
        initialChapter: 0,
        currentDay: "monday"
    }
};