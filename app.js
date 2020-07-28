var express = require("express"),
app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.send("Landing page is working");
});

app.listen(process.env.PORT || 3000, process.env.IP, () => {
	console.log("Server has started!");
});