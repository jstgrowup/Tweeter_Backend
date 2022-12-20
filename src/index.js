const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8080;
const MONGOURL = process.env.MONGO_URL;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose.set("strictQuery", false);
app.use(cors());
app.get("/", (req, res) => {
  res.send("HOMEPAGE");
});
app.listen(PORT, () => {
  mongoose
    .connect(MONGOURL)
    .then(() => {
      console.log("Server started on port 8080");
    })
    .catch((err) => console.log(err));
});
