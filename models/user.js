const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  information: String,
  phone: String,
  avatar: {type: String, default: '/uploads/avatar.png'},
  fav_games: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
  googleID: String,
  vkId: String,
  userEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  userChats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
});

module.exports = mongoose.model("User", userSchema);
