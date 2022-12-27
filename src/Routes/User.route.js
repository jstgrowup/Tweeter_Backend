const express = require("express");
const userModel = require("../Models/User.model");
const app = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtkey = process.env.JWT_KEY;


app.post("/postUser", async (req, res) => {
  const { email } = req.body;
  const data = await userModel.findOne({ email: email });
  if (data) {
    res.status(401).send("User already exists please log in");
  } else {
    try {
      const huru = await userModel.create(req.body);
      res.send(huru);
    } catch (error) {
      res.status(401).send(error.message);
    }
  }
});
app.post("/login", async (req, res) => {
  const { username, email, password } = req.body;
  const data = await userModel.findOne({
    email: email,
    username: username,
    password: password,
  });
  try {
    if (!data.username) {
      res.status(401).send("User not Signed up");
    } else {
      const { _id } = data;
      const token = jwt.sign({ id: _id }, jwtkey, { expiresIn: "365d" });
  
     

      res.send({ token: token });
    }
  } catch (error) {
    res.status(401).send(error.message);
  }
});
app.post("/getuser", async (req, res) => {
  const { token } = req.body;

  const check = jwt.verify(token, jwtkey);
 
  try {
    const respo = await userModel.findOne({ _id: check.id });

    res.send(respo);
  } catch (error) {
    res.status(404).send(error.message);
  }

});
app.patch("/updateUser/:id", async (req, res) => {
  const { id } = req.params;
  const { fullname, email, password } = req.body;
  try {
    const data = await userModel.findByIdAndUpdate(
      { _id: id },
      { $set: { fullname: fullname, email: email, password: password } }
    );
   

    res.send(data);
  } catch (error) {
    res.status(401).send(error.message);
  }
});
module.exports = app;
