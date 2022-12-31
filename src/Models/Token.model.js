const { model, Schema } = require("mongoose");

require("dotenv").config();

const TokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    refreshtoken: { required: true, type: String },
    created: { type: Date, default: Date.now(), expires: 30 * 86400 },
  },
  {
    versionKey: false,
  }
);

const TokenModel = model("token", TokenSchema);
module.exports = TokenModel;
