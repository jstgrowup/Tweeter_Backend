const express = require("express");
const postModel = require("../Models/Posts.model");
const uploadImage = require("../utils/Cloudinary");

const app = express.Router();

app.post("/uploadImage", (req, res) => {
  console.log('req:', req.body)
  uploadImage(req.body.image)
    .then((url) => res.send(url))
    .catch((er) => res.status(500).send(er.message));
});
app.get("/", async (req, res) => {
  try {
    const repo = await postModel.find();
    res.send(repo);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
app.get("/createPost", async (req, res) => {
  try {
    const repo = await postModel.create(req.body);
    res.send(repo);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
module.exports = app;
