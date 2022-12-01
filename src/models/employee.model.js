const mongoose = require("mongoose");
const validator = require("validator");

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
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
      default: null,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    jobType: {
      type: String,
      required: true,
      enum: ["NURSE", "MAINTENANCE", "SECURITY", "EMERGENCY"],
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
