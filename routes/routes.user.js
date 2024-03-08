const express = require("express");
const loginController = require("../controller/controller.user.js");

const router = express.Router();

router.get("/", loginController.loadPage);

router.post("/signup", loginController.signupUser);

router.post("/login", loginController.loginUser);

module.exports = router;
