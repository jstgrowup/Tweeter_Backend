const { model, Schema } = require("mongoose");

require("dotenv").config();

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    fullname: { type: String, required: true },
    password: { type: String, required: true },
    img: { type: String, required: true },
    verfied: { type: Boolean, default: false },
  },
  {
    versionKey: false,
  }
);
// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign({ _id: this._id }, process.env.JWT_SIGNUP_KEY, {
//     expiresIn: "7d",
//   });
//   return token;
// };
const userModel = model("users", userSchema);
module.exports = userModel;
