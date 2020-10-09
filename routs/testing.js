var express = require("express");
var router = express.Router();
var initialData = require("../gameLogic/templetesAndPresets/initialData");
var assembleSchedule = require("../gameLogic/assemblySchedule");

router.get("/characters", (req, res) => {
    res.json(initialData());
});
router.get("/schedule", (req, res) => {
    res.json(assembleSchedule(require("../gameLogic/templetesAndPresets/testCharacters")));
});
router.get("/resetData", (req, res) => {
    res.json(initialData());
})

module.exports = router;