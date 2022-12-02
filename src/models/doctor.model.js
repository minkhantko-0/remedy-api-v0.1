const validator = require("validator");
const mongoose = require("mongoose");

// constants
const Genders = require("../constants/gender.constants");
const Specializations = require("../constants/doctor.specialization.constants");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
      max: new Date(),
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
    avatar: {
      Type: Buffer,
    },
    gender: {
      type: String,
      required: true,
      enum: Genders,
    },
    specialization: {
      type: String,
      required: true,
      enum: Specializations,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

doctorSchema.methods.toJSON = function () {
  const doctor = this;
  const doctorObj = doctor.toObject();

  delete doctorObj.avatar;

  return doctorObj;
};

module.exports = mongoose.model("Doctor", doctorSchema, "doctors");
