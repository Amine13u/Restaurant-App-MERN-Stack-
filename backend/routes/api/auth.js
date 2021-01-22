const express = require("express");
const router = express.Router();
const { register, login, getAuthUser } = require("../../controllers/auth");
const {
  validator,
  registerRules,
  loginRules,
} = require("../../middlewares/bodyValidator");
const auth = require("../../middlewares/auth");

// @route POST api/auth/register
// @description register user
// @access PUBLIC

router.post("/register", registerRules(), validator, register);

// @route POST api/auth/login
// @description login user
// @access PUBLIC

router.post("/login", loginRules(), validator, login);

// @route GET api/auth/me
// @description get auth user
// @access PRIVATE

router.get("/me", auth, getAuthUser);

module.exports = router;
