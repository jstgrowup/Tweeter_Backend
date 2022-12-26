const express = require("express");
const postModel = require("../Models/Posts.model");
// const uploadImage = require("../utils/Cloudinary");

const app = express.Router();

app.get("/", async (req, res) => {
  try {
    const repo = await postModel.find();
    res.send(repo);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
app.post("/createPost", async (req, res) => {
  try {
    const repo = await postModel.create(req.body);

    res.send(repo);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
app.post("/likesAndDislikes", async (req, res) => {
  const { id, type } = req.body;
  const data = await postModel.findById(id);
  try {
    if (type == "like") {
      await postModel.findByIdAndUpdate(data._id, {
        $set: { likes: data.likes + 1 },
      });
      res.send("updated likes");
    } else {
      await postModel.findByIdAndUpdate(data._id, {
        $set: { likes: data.likes - 1 },
      });
      res.send("updated dislikes");
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});
app.post("/delete", async (req, res) => {
  const { id } = req.body;
  const data = await postModel.findById(id);
  try {
    if (data) {
      await postModel.findByIdAndDelete(id);
      res.send("deleted");
    } else {
      res.status(404).send(error.message);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});
module.exports = app;
