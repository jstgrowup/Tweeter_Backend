const { model, Schema } = require("mongoose");
const postsSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  userName: { type: String, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number, required: true, default: 0 },
  dislikes: { type: Number, required: true, default: 0 },
});
const postModel = model("posts", postsSchema);
module.exports = postModel;
