var express = require("express");
var router = express.Router();
var testCharacters = require("../gameLogic/templetesAndPresets/testCharacters");

router.get("/characters", (req, res) => {
    res.json(testCharacters);
});

module.exports = router;