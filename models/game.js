const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  title: String,
  rules: String,
  min_players: Number,
  max_players: Number,
  min_playtime: Number,
  min_age: Number,
  description: String,
  img: String,
  thumbnail: String,
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
});

module.exports = mongoose.model("Game", gameSchema);
