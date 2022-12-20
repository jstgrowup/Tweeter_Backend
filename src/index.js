const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./Routes/User.route");
require("dotenv").config();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8080;
const MONGOURL = process.env.MONGO_URL;
mongoose.set("strictQuery", false);
app.get("/", (req, res) => {
  res.send("HOMEPAGE");
});
app.use("/user", userRouter);
app.listen(PORT, () => {
  mongoose
    .connect(MONGOURL)
    .then(() => {
      console.log("Server started on port 8080");
    })
    .catch((err) => console.log(err));
});
