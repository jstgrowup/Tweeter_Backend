const express = require("express");
const userModel = require("../Models/User.model");
const app = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const validate = require("../config/Validate");
const loginvalidate = require("../config/LoginValidate");
// const tokenModel = require("../Models/Token.model");
// const sendEmail = require("../utils/sendEmail");
const bycrypt = require("bcrypt");
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
    const salt = await bycrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bycrypt.hash(req.body.password, salt);

    await userModel.create({
      ...req.body,
      password: hashPassword,
    });

    res.send({ message: "User Created Successfully" });
  } catch (error) {
    res
      .status(401)
      .send({ message: "Internal server error please try again later" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error } = loginvalidate(req.body);
    if (error) {
      return res.status(401).send({ message: error.details[0].message });
    }
    const data = await userModel.findOne({
      email: email,
    });
    if (!data) {
      return res.status(401).send({
        message: "User Does not exists please create an account",
      });
    }
    const isVerified = await bycrypt.compare(password, data.password);

    if (!isVerified) {
      return res.status(401).send({ message: "Invalid or Wrong Password" });
    }
    const updated = {
      _id: data._id,
      username: data.username,
      email: data.email,
      img: data.img,
    };
    const payload = { data: updated };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: "30d",
    });

    res.status(200).send({
      token: accessToken,
      message: "Log in successfull",
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});
app.post("/getuser", async (req, res) => {
  const { token } = req.body;

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, details) => {
      if (err) {
        return res.status(401).send("Invalid refresh token");
      }
      const { data } = details;
      return res.status(201).send({ data: data, message: "Valid User" });
    });
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
