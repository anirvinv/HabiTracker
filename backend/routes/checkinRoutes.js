const mongoose = require("mongoose");
const { Habit, Checkin } = require("../models");

var express = require("express"),
	router = express.Router();

// router.post("/", async (req, res) => {

// });

router.get("/all", async (req, res) => {
	console.log(`GET all checkins`);
	let checkinList = await Checkin.find();
	return res.json(checkinList);
});

// this comes after the above /all route or else /all ==> id = all
router.get("/:id", async (req, res) => {
	let { id } = req.params;

	console.log(`GET checkin ${id}`);

	try {
		mongoose.Types.ObjectId(id);
	} catch (error) {
		console.log(error);
		return res.status(502).json();
	}

	let checkin = await Checkin.findById(id);
	return res.status(200).json(checkin);
});

// this comes after the above /all route or else /all ==> id = all
router.delete("/:id", async (req, res) => {
	let { id } = req.params;

	console.log(`DELETE checkin ${id}`);

	try {
		mongoose.Types.ObjectId(id);
	} catch (error) {
		console.log(error);
		return res.status(502).json();
	}
	// findOneAndDelete returns the query first and then deletes it
	let checkin = await Checkin.findOneAndDelete({ _id: id });
	const habit_id = checkin.habit_id;
	console.log(habit_id);
	let habit = await Habit.updateOne(
		{ _id: habit_id },
		{
			$pull: { checkin_ids: id },
		}
	);
	return res.status(200).json({ habit_id });
});

module.exports = router;
