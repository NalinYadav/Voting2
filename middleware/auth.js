const { Password } = require("../config/db");

const authenticate = async (req, res, next) => {
  var { password } = req.body;
  password += "\r";

  try {
    const foundPassword = await Password.findOne({ password });
    if (foundPassword) {
      if (foundPassword.isValid) {
        console.log("Authentication successful");
        foundPassword.isValid = false;
        await foundPassword.save();
        next();
      } else {
        res.render("login");
      }
    } else {
      res.render("login");
    }
  } catch (err) {
    console.error("Error during authentication:", err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = authenticate;
