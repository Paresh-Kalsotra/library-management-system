const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    let token = req.cookies.libUserToken;

    const decoded = jwt.verify(token, process.env.jwt_key); // .decode only decode but doesn't verify
    console.log(decoded);
    next();
  } catch (err) {
    res.redirect(302, "../libraryuser"); //authentication failed
  }
};
