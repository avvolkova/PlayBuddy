const mongoose = require("mongoose");

const levelSchema = new mongoose.Schema({
  title: String
});

module.exports = mongoose.model("Level", levelSchema);
