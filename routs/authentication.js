//authentication routs
var express = require("express");
var router = express.Router();
const passport = require("passport");
const passportCofig = require("../config/passport-setup")

//Get authentication views
router.get("/login", (req, res) => {
	res.render("authentication/login");
});
router.get("/signup", (req, res) => {
	res.render("authentication/signUp");
});

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

module.exports = router;