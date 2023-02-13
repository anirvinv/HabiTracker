const { default: mongoose } = require("mongoose");
const { Habit, Checkin } = require("../models");

var express = require("express"),
	router = express.Router();

router.get("/all", async (req, res) => {
	const allHabits = await Habit.find();
	console.log("GET all habits");
	return res.status(200).json(allHabits);
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		mongoose.Types.ObjectId(id);
	} catch (error) {
		return res.status(502).json();
	}

	const habit = await Habit.findById(id);
	return res.status(200).json(habit);
});

router.post("/", async (req, res) => {
	const newHabit = new Habit({ ...req.body });
	const insertedHabit = await newHabit.save();
	return res.status(201).json(insertedHabit);
});

router.patch("/:id", async (req, res) => {
	// everytime user checks in, this is called
	let { id } = req.params;

	try {
		mongoose.Types.ObjectId(id);
	} catch (error) {
		return res.status(502).json();
	}

	let newCheckin = new Checkin({ habit_id: id, ...req.body });
	let insertedCheckin = await newCheckin.save();
	let checkinId = newCheckin._id.toString();
	await Habit.findOneAndUpdate(
		{ _id: id },
		{ $push: { checkinList: checkinId } }
	);
	res.json(insertedCheckin);
	return res.status(200);
});

router.delete("/:id", async (req, res) => {
	// need to delete all associated checkins
	let { id } = req.params;
	try {
		mongoose.Types.ObjectId(id);
	} catch (error) {
		return res.status(502).json();
	}
	await Checkin.deleteMany({ habit_id: id });
	await Habit.deleteOne({ _id: id });
	res.send(`delete request to ${id}`);
	return res.status(201);
});

module.exports = router;
