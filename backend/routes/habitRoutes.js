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
  console.log(`GET habit ${id}`);
  const habit = await Habit.findById(id);
  return res.status(200).json(habit);
});

router.post("/", async (req, res) => {
  const newHabit = new Habit({ ...req.body });
  const insertedHabit = await newHabit.save();

  // have to add error checking here as well?

  console.log(`POST habit`);
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

  if (req.body.checkinDate == null) {
    throw new Error("No checkin date specified");
  }

  console.log(`PATCH habit ${id}`);

  let newCheckin = new Checkin({ habit_id: id, ...req.body });
  let insertedCheckin = await newCheckin.save();
  let checkinId = newCheckin._id.toString();
  await Habit.findOneAndUpdate(
    { _id: id },
    { $push: { checkin_ids: checkinId } } // some problem here?
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

  console.log(`DELETE habit ${id}`);

  await Checkin.deleteMany({ habit_id: id });
  await Habit.deleteOne({ _id: id });
  console.log(`delete request to ${id}`);
  return res.json({ msg: `delete request to ${id}` }).status(201);
});

module.exports = router;
