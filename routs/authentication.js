//authentication routs
var express = require("express");
var router = express.Router();
const passport = require("passport");
const passportCofig = require("../config/passport-setup");
const bcrypt = require('bcrypt');
const saltRounds = 10;
var User = require("../models/users");
var utilities = require("../middleware/utilities");

//Set authentication permissions
var authenticationPermission = {
	google: true,
	facebook: true,
	github: true
}

//Get authentication views
router.get("/login", (req, res) => {
	res.render("authentication/login", {allow: authenticationPermission});
});
router.get("/signup", (req, res) => {
	res.render("authentication/signUp", {allow: authenticationPermission});
});

//Local sign up
router.post("/signup", (req, res, next) => {
	//geting credentials from view form
	var username = req.body.username;
	var name = req.body.namefeild;
	var password = req.body.password;
	
	//Check if user exzists
	User.find({}, (err, users) => {
		//loop through all users and find out if incoming is dupe
		var dupeUserIndex = utilities.findIndexOfLocalUser(users, username);
		
		//if username already exzists
		if(dupeUserIndex >= 0){
			console.log("User already exzists");
			next();
		}
		
		//create new user
		else{
			console.log("New local user created");
			
			//hashing password
			bcrypt.hash(password, saltRounds, (err, hash) => {
				//Create user
				User.create(utilities.assembleLocalUser(username, name, hash), (err, user) => {
					if(err){
						console.log("Something went wrong");
						console.log(err.message);
					}
					else{
						console.log("Created new local user");
						next();
					}
				});
			});
		}
	});
}, passport.authenticate('local', { 
		successRedirect: '/',
		failureRedirect: '/login'
	})
);

//local login
router.post("/login", passport.authenticate('local', { 
		successRedirect: '/',
   		failureRedirect: '/login'
		})
);

//auththentication logout
router.get("/logout", (req, res) => {
	console.log("User logged out");
 	req.logout();
 	res.redirect('/');
});

//Authentication with google - Start

//Sign up with google
router.get("/register/google", (req, res) => {
	//handle app logic before authenticating
	res.redirect("/auth/google");
});

//Login with google
router.get("/login/google", (req, res) => {
	//handle app login logic here
	res.redirect("/auth/google");
});

//Authenticate with google
router.get("/auth/google", passport.authenticate("google", {
	scope: ["profile"]
}));
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
	res.redirect("/");
});

//Authentication with google - End

//Authentication with facebook - Start

//Sign up with facebook
router.get("/register/facebook", (req, res) => {
	//handle app logic before authenticating
	res.redirect("/auth/facebook");
});

//Login with facebook
router.get("/login/facebook", (req, res) => {
	//handle app login logic here
	res.redirect("/auth/facebook");
});

//Authenticate with facebook
router.get('/auth/facebook',
  passport.authenticate('facebook'));
router.get("/facebook/redirect", passport.authenticate("facebook"), (req, res) => {
	res.redirect("/");
});

//Authentication with facebook - End

//Authentication with github - Start

//login with github
router.get("/login/github", (req, res) => {
	//handle app login logic here
	res.redirect("/auth/github");
});

//Sign up with github
router.get("/register/github", (req, res) => {
	//handle app sign up logic here
	res.redirect("/auth/github");
});

//Authenticate with github
router.get('/auth/github', passport.authenticate('github'));
router.get('/github/redirect', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

//Authentication with github - End

module.exports = router;