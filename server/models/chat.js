const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  eventTitle: String,
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  });

module.exports = mongoose.model("Chat", chatSchema);
