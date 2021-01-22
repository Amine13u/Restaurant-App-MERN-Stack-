const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json([
        {
          msg: "User already registered",
        },
      ]);

    user = new User({ firstName, lastName, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      userID: user._id,
    };

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "7d" });

    res.send({
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        _id: user._id,
      },
    });
  } catch (err) {
    console.error(err.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send([{ msg: "Bad Credentials" }]);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send([{ msg: "Bad Credentials" }]);
    }
    const payload = {
      userID: user._id,
    };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "7d" });

    res.send({
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        _id: user._id,
      },
    });
  } catch (error) {
    console.error(error.message);
  }
};

const getAuthUser = (req, res) => {
  res.send({ user: req.user });
};

module.exports = {
  register,
  login,
  getAuthUser,
};
