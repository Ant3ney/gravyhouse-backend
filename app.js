var express = require("express"),
app = express();
var bodyParser = require("body-parser"),
	authenticationRouts = require("./routs/authentication");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//using routs
app.use(authenticationRouts);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("index");
});

app.listen(process.env.PORT || 3000, process.env.IP, () => {
	console.log("Server has started!");
});