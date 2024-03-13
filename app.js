const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
var cors = require("cors");
var cookieParser = require("cookie-parser");

const libraryRouter = require("./routes/routes.library.js");
const loginRouter = require("./routes/routes.user.js");

const verifyToken = require("./middleware/tokenCheck.js");

const uri =
  "mongodb+srv://pareshkalsotra:pareshkanu@cluster0.oepwuys.mongodb.net/library";

const app = express();
const port = 8000;

mongoose.connect(uri); // connecting to mongodb

app.use(express.json()); //middlewares
app.use(cors());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "library_page")));
app.use(express.static(path.join(__dirname, "login_page")));

//routers
app.use("/library", verifyToken, libraryRouter);
app.use("/libraryuser", loginRouter);

app.listen(port, (err) => {
  if (!err) {
    console.log(`Server listening at ${port}`);
  }
});
