const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  text: String,
  user_ref: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Message", messageSchema);


