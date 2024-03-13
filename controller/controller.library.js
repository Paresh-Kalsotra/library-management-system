const path = require("path");
const bookModel = require("../models/bookModel.js");
const mongoose = require("mongoose");

//returning html page in response
async function lmsLoad(req, res) {
  res.status(200).sendFile(path.join(__dirname, "../library_page/index.html"));
}

//func to get book by title
async function getBook(req, res) {
  try {
    const title = req.params.title;
    const book = await bookModel.findOne({ title: title });
    res.status(200).json(book);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}

//add book to library
async function addBook(req, res) {
  try {
    // book document creation

    const bookData = req.body;
    await bookModel.create(bookData);

    res.status(201).json("Book added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json("Unable to add book");
  }
}

//func to get booklist
async function getAllBook(req, res) {
  try {
    let limit = 5;
    let page = req.params.pageNo || 1; //taking page number =1 or from req.params
    const booklist = await bookModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit * 1); //.find returns a query so we have to await it
    res.status(200).json(booklist);
  } catch (err) {
    console.log(err);
    res.status(500).json("Unable to get book list");
  }
}

//FUNC TO UPDATE BORROWED STATUS
async function updateBook(req, res) {
  try {
    const id = new mongoose.Types.ObjectId(req.body.id);
    const newStatus = !req.body.status;

    await bookModel.findOneAndUpdate({ _id: id }, { isBorrowed: newStatus });

    res.status(201).json(` Book Status updated, ID: ${id}`);
  } catch (err) {
    console.log(err);
    res.status(500).json("Can't update status");
  }
}

async function deleteBook(req, res) {
  try {
    const title = req.params.title;
    const deletedBook = await bookModel.findOneAndDelete({ title: title });
    if (!deletedBook) {
      return res.status(404).json("Book not found");
    }

    res.status(200).json("Book Removed ");
  } catch (err) {
    console.log(err);
    res.status(500).json("Can't remove book");
  }
}

module.exports = {
  lmsLoad,
  addBook,
  getBook,
  getAllBook,
  updateBook,
  deleteBook,
};
