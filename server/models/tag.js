const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    title: String,
    description: String
});

module.exports = mongoose.model("Tag", tagSchema);
