//Location to store helper functions needed around the app
var middle = {};
var express = require("express");
var app = express();

//loop through users and find one with matching id
middle.findIndexOfGoogleUser = function(users, profile){
	var returnVal = -1;
	users.forEach((user, i) => {
		if(user.id.toString() == profile.id.toString()){
			returnVal = i;
		}
	});
	return returnVal;
}

//Create new user object
middle.assembleGoogleUser = function(profile){
	var user = {
		username: profile.displayName,
		name: profile.displayName,
		id: profile.id,
		password: "null",
		type: "google"
	};
		
	return user
}

module.exports = middle;