const mongoose = require("mongoose");
const validator = require("validator");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
      min: new Date(),
    },
    email: {
      type: String,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Your email is invalid");
      },
      trim: true,
      lowercase: true,
    },
    avatar: {}, //TODO: to config patient profile
    Gender: {
      type: String,
      required: true,
    },
    Diagnosis: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Patient", patientSchema);
