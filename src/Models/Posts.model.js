const { model, Schema } = require("mongoose");
const postsSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    userName: { type: String, required: true },
    caption: { type: String, required: true },
    url: { type: String, required: true },
    likes: { type: Number, required: true, default: 0 },
    dislikes: { type: Number, required: true, default: 0 },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const postModel = model("posts", postsSchema);
module.exports = postModel;
