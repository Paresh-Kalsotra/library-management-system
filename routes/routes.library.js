const express = require("express");
const libraryController = require("../controller/controller.library.js");

const router = express.Router();

//route to load library page
router.get("/", libraryController.lmsLoad);

//route to get book by title
router.get("/books/:title", libraryController.getBook);

//route to post book
router.post("/books", libraryController.addBook);

//route to get all books
router.get("/books/page/:pageNo", libraryController.getAllBook);

//route to update borrowed status
router.patch("/books", libraryController.updateBook);

//route to delete
router.delete("/books/:title", libraryController.deleteBook);

module.exports = router;
