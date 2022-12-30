const express = require("express");
const userModel = require("../Models/User.model");
const app = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const crypto = require("crypto");
const jwtkey = process.env.JWT_KEY;
const validate = require("../config/Validate");
const loginvalidate = require("../config/LoginValidate");
const tokenModel = require("../Models/Token");
const sendEmail = require("../utils/sendEmail");
app.post("/postUser", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(401).send({ message: error.details[0].message });
    }
    const data = await userModel.findOne({ email: req.body.email });
    if (data) {
      return res
        .status(401)
        .send({ message: "User already exists please log in" });
    }
    const huru = await userModel.create(req.body);

    const token = await tokenModel.create({
      userId: huru._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    const url = `${process.env.BASE_URL}users/${huru._id}/verify/${token.token}`;
    await sendEmail(huru.email, "Verify email", url);
    res.send({ data: huru, message: "An email has been sent to your email" });
  } catch (error) {
    console.log("error:", error);
    res
      .status(401)
      .send({ message: "Internal server error please try again later" });
  }
});
app.get("/:id/verify/:token", async (req, res) => {
  const { id, token } = req.params;

  try {
    const data = await userModel.findOne({ _id: id });

    if (!data) {
      return res.status(401).send({ message: "Invalid link" });
    }
    const newtoken = await tokenModel.findOne({ userId: id, token: token });

    if (!newtoken) {
      return res.status(401).send({ message: "Invalid link" });
    }
    await userModel.findOneAndUpdate(
      { _id: data._id },
      { $set: { verfied: true } }
    );
    await newtoken.remove();
    res.send({ message: "Email Verified successfully" });
  } catch (error) {
    console.log("error:", error);
    res
      .status(401)
      .send({ message: "Internal server error please try again later" });
  }
});

app.post("/login", async (req, res) => {
  const { email } = req.body;
  try {
    const { error } = loginvalidate(req.body);

    if (error) {
      return res.status(401).send({ message: error.details[0].message });
    }
    const data = await userModel.findOne({
      email: email,
    });

    if (!data.email) {
      return res
        .status(401)
        .send({ message: "You dont have an account please create an account" });
    }
    const { _id } = data;
    const token = jwt.sign({ id: _id }, jwtkey, { expiresIn: "7d" });
    res.send({ token: token, message: "User Logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
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
app.post("/delete", async (req, res) => {
  const { id } = req.body;
  try {
    await userModel.findByIdAndDelete({ _id: id });

    res.send("Deleted Successfully");
  } catch (error) {
    res.status(401).send(error.message);
  }
});
module.exports = app;
