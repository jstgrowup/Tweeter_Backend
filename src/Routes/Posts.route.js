const express = require("express");
const postModel = require("../Models/Posts.model");

const app = express.Router();
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
