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
      type: Buffer,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    diagnosis: {
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

patientSchema.methods.toJSON = function () {
  const patient = this;
  const patientObject = patient.toObject();

  delete patientObject.avatar;

  return patientObject;
};

module.exports = mongoose.model("Patient", patientSchema, "patients");
