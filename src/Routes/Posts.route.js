const express = require("express");
const postModel = require("../Models/Posts.model");
const { cloudinary } = require("../utils/Cloudinary");
const app = express.Router();
app.post("/uploadImage", async (req, res) => {
  try {
    const { data } = req.body;

    const uploadImage = await cloudinary.uploader.upload(data, {
      upload_preset: "tweeter",
    });
    console.log(uploadImage);
    res.send("file Uploaded");
  } catch (error) {
    res.status(404).send(error.message);
  }
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
