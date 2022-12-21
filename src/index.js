const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./Routes/User.route");
const postsRouter = require("./Routes/Posts.route");

require("dotenv").config();
app.use(cors());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use("/user", userRouter);
app.use("/posts", postsRouter);
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8080;
const MONGOURL = process.env.MONGO_URL;
mongoose.set("strictQuery", false);
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
