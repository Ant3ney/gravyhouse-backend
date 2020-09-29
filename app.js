var express = require("express"),
app = express();

//ENV setup
require('dotenv').config();

//Declaring varibles
var bodyParser = require("body-parser"),
	passportSetup = require("./config/passport-setup"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	User = require("./models/users"),
	expressSession = require("express-session"),
	flash = require('connect-flash');

//passport setup
app.use(expressSession({
	secret: "Login app",
	resave: false,
	saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(user, done) {
 	done(null, user);
});

//app.use
app.use((req, res, next) => {
	//populate req.app.loacls with app info
	req.app.locals.currentUser = req.user;
	req.app.locals.message = req.flash('authentication');
	req.app.locals.err = req.flash('error');
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:19006, https://www.google.com');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//connecting mongoose
mongoose.connect(process.env.DBURL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
}).then(() => {
	console.log("MongoDB has concected!")
}).catch((err) => {
	console.log("Something went wrong");
	console.log(err.message);
});

//Handling routs
//route file locations
var authenticationRouts = require("./routs/authentication"),
	indexRouts = require("./routs/index");
//using routs files
app.use(authenticationRouts);
app.use(indexRouts);

//app setings
app.set("view engine", "ejs");

app.get("/api", (req, res) => {
	res.json({
		testData: "This is test info"
	});
});

app.listen(process.env.PORT || 3000, process.env.IP, () => {
	console.log("Server has started!");
});