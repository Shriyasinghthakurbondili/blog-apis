const mongoose = require("mongoose");
const Address = require("../models/addressModel");

const addAddress = async (req, res) => {
  try {
    const { fullName, phone, street, city, state, postalCode, country } = req.body;
    if (!fullName || !phone || !street || !city || !state || !postalCode) {
      return res.status(400).json({ message: "All required address fields must be provided" });
    }

    const address = await Address.create({
      user: req.user.id,
      fullName,
      phone,
      street,
      city,
      state,
      postalCode,
      country,
    });

    return res.status(201).json({ message: "Address added", address });
  } catch (error) {
    return res.status(500).json({ message: "Server error while adding address" });
  }
};

const getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json({ addresses });
  } catch (error) {
    return res.status(500).json({ message: "Server error while fetching addresses" });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid address id" });
    }

    const address = await Address.findOne({ _id: id, user: req.user.id });
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    await address.deleteOne();
    return res.status(200).json({ message: "Address deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Server error while deleting address" });
  }
};

module.exports = { addAddress, getAllAddresses, deleteAddress };
