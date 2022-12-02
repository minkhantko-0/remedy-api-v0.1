const mongoose = require("mongoose");
const validator = require("validator");

// constants
const Genders = require("../constants/gender.constants");
const JobTypes = require("../constants/employee.jobtypes.constants");

const EmployeeSchema = new mongoose.Schema(
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
      enum: Genders,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
      enum: JobTypes,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

EmployeeSchema.methods.toJSON = function () {
  const employee = this;
  const employeeObj = employee.toObject();

  delete employeeObj.avatar;

  return employeeObj;
};

module.exports = mongoose.model("Employee", EmployeeSchema, "employees");
