const Profile = require("../models/Profile");
const User = require("../models/User");

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["firstName", "lastName", "role"]);
    if (!profile) {
      return res.status(404).json([
        {
          msg: "There is no profile for this user",
        },
      ]);
    }
    res.send(profile);
  } catch (error) {
    console.error(error.message);
  }
};

const createOrUpdateProfile = async (req, res) => {
  const { address_1, address_2 } = req.body;
  const profileFields = {};
  profileFields.user = req.user.id;

  if (address_1) profileFields.address_1 = address_1;
  if (address_2) profileFields.address_2 = address_2;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    profile = new Profile(profileFields);
    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
  }
};

const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", [
      "firstName",
      "lastName",
      "role",
    ]);
    res.send(profiles);
  } catch (error) {
    console.error(err.message);
  }
};

const getProfileByID = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["firstName", "lastName", "role"]);

    if (!profile) {
      return res.status(400).json([{ msg: "Profile not Found" }]);
    }
    res.send(profile);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json([{ msg: "Profile not Found" }]);
    }
    console.error(error.message);
  }
};

const deleteProfileAndUser = async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.send({ msg: "User deleted" });
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  getProfile,
  createOrUpdateProfile,
  getAllProfiles,
  getProfileByID,
  deleteProfileAndUser,
};
