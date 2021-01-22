const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const isAdmin = require("../../middlewares/isAdmin");
const {
  getProfile,
  getAllProfiles,
  createOrUpdateProfile,
  getProfileByID,
  deleteProfileAndUser,
} = require("../../controllers/profile");
const { validator, addressrules } = require("../../middlewares/bodyValidator");

// @route GET api/profile/me
// @description get current profile
// @access PRIVATE

router.get("/me", auth, getProfile);

// @route GET api/profile
// @description get all profiles
// @acess PRIVATE

router.get("/", auth, isAdmin, getAllProfiles);

// @route GET api/profile/:user_id
// @description get profile by userID
// @acess PRIVATE

router.get("/:user_id", auth, getProfileByID);

// @route POST api/profile
// @description create or update profile
// @acess PRIVATE

router.post("/", auth, addressrules(), validator, createOrUpdateProfile);

// @route DELETE api/profile
// @description Delete Profile & user
// @acess PRIVATE

router.delete("/", auth, deleteProfileAndUser);

module.exports = router;
