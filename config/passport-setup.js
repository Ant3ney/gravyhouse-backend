//passport config
/*
*This file is incharge of seting up stratigies for passport authentication
*/

var app = require("express")();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
var User = require("../models/users");
var utilities = require("../middleware/utilities");
var localStrategy = require("passport-local").Strategy;

//password hashing setup
const bcrypt = require('bcrypt');
const saltRounds = 10;

//local Statigy config
passport.use(new localStrategy(
	function(username, password, done) {
		//find out if username and password match
		User.find({}, (err, users) => {
			if(err){
				console.log("Something went wrong");
				console.log(err.message);
			}
			
			//get index of user with matching username
			var correctUserIndex = utilities.findIndexOfLocalUser(users, username);
			
			//no user with given username was found
			if(correctUserIndex < 0){
				return done(null, false);
			}
			
			//get hash from correct user
			var hash = users[correctUserIndex].password;
			
			//check password 
			bcrypt.compare(password, hash, function(err, res) {
				if(err){
				  	console.log("Something went wrong");
					console.log(err.message);
					return done(err, false);
			  	}
				else{
					if(res){//password mached
						console.log("User sucessfully logged in");
						return done(err, users[correctUserIndex]);
					}
					else{//password didnt match
						return done(err, false);
					}
				}
			});
		});
  	}
));

//Google stratigy options
var stratOptionsGoogle = {
	//options for strategy
	callbackURL: process.env.CALLBACKURL,
	clientID: process.env.CLIENTID,
	clientSecret: process.env.CLIENTSECRET
}

passport.use(new GoogleStrategy(stratOptionsGoogle, (accesToken, refreshToken, profile, done) => {
	//passport callback function

	//Find all exzisting DB users
	User.find({}, (err, users) => {
		if(err){
			console.log("Something went wrong in passport config");
			console.log(err.message);
		}
		else{
			//Function retruns index of user that matches google profile id if any
			var correctIndex = utilities.findIndexOfGoogleUser(users, profile);

			if(correctIndex >= 0){ //user already has account
				console.log("User logged in");
				return done(err, users[correctIndex]);
			}
			else{ //if user dose not already have a google acount
				User.create(utilities.assembleGoogleUser(profile), (err, user) => {
					console.log("User signed up");
					return done(err, user);
				});
			}
		}
	});
}));