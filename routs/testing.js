var express = require("express");
var router = express.Router();
var initialData = require("../gameLogic/templetesAndPresets/initialData");

router.get("/characters", (req, res) => {
    res.json(initialData);
});

module.exports = router;