const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isBorrowed: {
    type: Boolean,
    default: false,
  },
});

const bookModel = model("book", bookSchema);

module.exports = bookModel;
