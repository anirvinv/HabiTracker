const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    checkin_ids: { type: [String], default: [] },
    weeklySchedule: {
      type: [Boolean],
      default: [false, false, false, false, false, false, false],
    },

    // mongoose automatically adds _id to schemas
  },
  { timestamps: true }
);

const checkinSchema = new mongoose.Schema({
  habit_id: { type: String, required: true },
  checkinDate: { type: Date, required: true },
  description: { type: String, default: "" },
  notes: { type: String, default: "" },
  // mongoose automatically adds _id to schemas
});

const Habit = mongoose.model("Habit", habitSchema);
const Checkin = mongoose.model("Checkin", checkinSchema);

module.exports = { Habit, Checkin };
