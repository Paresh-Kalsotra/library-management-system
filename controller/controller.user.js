const user = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const path = require("path");

async function loadPage(req, res) {
  res.status(200).sendFile(path.join(__dirname, "../login_page/login.html"));
}

async function signupUser(req, res) {
  try {
    let existedUser = await user.find({ email: req.body.email });
    if (existedUser.length >= 1) {
      return res.status(422).json("User Already Exits");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Creating a new user
    const newUser = new user({
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();

    //jwt token generation
    const token = jwt.sign({ email: newUser.email }, process.env.jwt_key, {
      expiresIn: "1h",
    });
    res.cookie("libUserToken", token);

    res.redirect(302, "../library"); //login success
  } catch (err) {
    if (err._message === "user validation failed") {
      return res.status(422).json("Enter a valid email");
    }
    console.log(err._message);
    return res.status(500).json("We are Sorry!, Can't signup");
  }
}

async function loginUser(req, res) {
  let logUser = await user.find({ email: req.body.email });

  //checking for null //can check for only one or multiple user with same email
  if (logUser.length !== 1) {
    return res.status(404).json("User doesn't exist, Please Signup!");
  }
  try {
    bcrypt.compare(req.body.password, logUser[0].password, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json("Server Error");
      }
      if (!result) {
        return res.status(401).json("Incorrect email or password"); //un authorized
      }

      //jwt token generation
      const token = jwt.sign({ email: logUser[0].email }, process.env.jwt_key, {
        expiresIn: "1h",
      });
      res.cookie("libUserToken", token);

      res.redirect(302, "../library"); //login success
    });
  } catch (err) {
    res.send(500).json("We are unable to log you in.");
  }
}

module.exports = { signupUser, loginUser, loadPage };
