const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  name: String,
  address: String
});

module.exports = mongoose.model("Place", placeSchema);
