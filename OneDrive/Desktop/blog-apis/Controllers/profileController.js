const Profile = require("../models/profileModel");
const { uploadImage, deleteImage } = require("../helpers/cloudinaryHelper");

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate("user", "name email role");
    if (!profile) {
      return res.status(200).json({
        profile: {
          user: { _id: req.user.id },
          phone: "",
          bio: "",
          avatar: { url: "", public_id: "" },
        },
      });
    }

    return res.status(200).json({ profile });
  } catch (error) {
    return res.status(500).json({ message: "Server error while fetching profile" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { phone, bio } = req.body;

    const profile =
      (await Profile.findOne({ user: req.user.id })) || new Profile({ user: req.user.id, phone: "", bio: "" });

    if (phone !== undefined) profile.phone = phone;
    if (bio !== undefined) profile.bio = bio;

    if (req.file) {
      await deleteImage(profile.avatar.public_id);
      const uploaded = await uploadImage(req.file.buffer, "ecommerce/profiles");
      profile.avatar = uploaded;
    }

    await profile.save();
    const populatedProfile = await Profile.findById(profile._id).populate("user", "name email role");
    return res.status(200).json({ message: "Profile updated", profile: populatedProfile });
  } catch (error) {
    return res.status(500).json({ message: "Server error while updating profile" });
  }
};

module.exports = { getProfile, updateProfile };
