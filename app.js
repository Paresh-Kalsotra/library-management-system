const express = require("express");
const mongoose = require("mongoose");
const libraryRouter = require("./routes/routes.library.js");
const loginRouter = require("./routes/routes.user.js");
const path = require("path");

const uri =
  "mongodb+srv://pareshkalsotra:pareshkanu@cluster0.oepwuys.mongodb.net/library";

const server = express();
const port = 8000;

mongoose.connect(uri); // connecting to mongodb

server.use(express.json()); //middlewares
server.use(express.static(path.join(__dirname, "library_page")));
server.use(express.static(path.join(__dirname, "login_page")));

//routers
server.use("/library", libraryRouter);
server.use("/libraryUser", loginRouter);

server.listen(port, (err) => {
  if (!err) {
    console.log(`server listening at ${port}`);
  }
});
