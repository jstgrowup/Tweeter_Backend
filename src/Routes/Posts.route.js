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
    console.log('repo:', repo)
    res.send(repo);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
module.exports = app;
