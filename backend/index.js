const cors = require("cors");
const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

const habitRoutes = require("./routes/habitRoutes");
const checkinRoutes = require("./routes/checkinRoutes");

app.use("/habit", habitRoutes);
app.use("/checkin", checkinRoutes);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
    });
  });
