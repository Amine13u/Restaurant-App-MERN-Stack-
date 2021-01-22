const User = require("../models/User");
const jwt = require("jsonwebtoken");

const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decoded.userID).select("-password");
    if (user.role !== "admin") {
      return res.status(401).send([{ msg: "Client access denied" }]);
    }
    next();
  } catch (error) {
    res.send([{ msg: "Client access denied" }]);
  }
};

module.exports = isAdmin;
