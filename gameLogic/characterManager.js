const characters = require("./templetesAndPresets/testCharacters");

//Make this file as independent as possible
var cMan = {
    isCharacterServer: (character) => {
        if(character.character.job === "server"){
            return true;
        }
        return false;
    },
    isCharacterCook: (character) => {
        if(cMan.isCharacterServer(character)){
            return false;
        }
        return true;
    },
    getCharactersWhosNot: (characters, notArray) => {
        var characterAry = [];
        var name;
        var nameInvalid;
        characters.forEach((character, i) => {
            name = cMan.getFullName(character);
            nameInvalid = false;
            
            for(var j = 0; j < notArray.length; j++){
                if(cMan.getFullName(notArray[j]) === name){
                    nameInvalid = true;  
                }
            }

            if(!nameInvalid){
                characterAry.push(character);
            }
        });

        return characterAry;
    },
    getServersWhosNot: (characters, notArray) => {
        var avalibleCharacters = cMan.getCharactersWhosNot(characters, notArray);
        var avalibleServers = [];

        avalibleCharacters.forEach((character, i) => {
            if(cMan.isCharacterServer(character)){
                avalibleServers.push(character);
            }
        });

        return avalibleServers;
    },
    getCooksWhosNot: (characters, notArray) => {
        var avalibleCharacters = cMan.getCharactersWhosNot(characters, notArray);
        var avalibleCooks = [];

        avalibleCharacters.forEach((character, i) => {
            if(cMan.isCharacterCook(character)){
                avalibleCooks.push(character);
            }
        });

        return avalibleCooks;
    },
    getFullName: (character) => {
        return (character.person.name.firstName + " " + character.person.name.lastName);
    }
}

module.exports = cMan;