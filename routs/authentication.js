var express = require("express");
var router = express.Router();

router.get("/login", (req, res) => {
	res.render("authentication/login");
});
router.get("/signup", (req, res) => {
	res.render("authentication/signUp");
})

module.exports = router;