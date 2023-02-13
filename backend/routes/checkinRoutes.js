const { Checkin } = require("../models");

var express = require("express"),
	router = express.Router();

// router.post("/", async (req, res) => {

// });

router.get("/all", async (req, res) => {
	let checkinList = await Checkin.find();
	return res.json(checkinList);
});

// this comes after the /all route or else /all ==> id = all
router.get("/:id", async (req, res) => {
	let { id } = req.params;
	let checkin = await Checkin.find({ _id: id });
	return res.json(checkin);
});

module.exports = router;
