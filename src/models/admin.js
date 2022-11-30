const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Your email is invalid");
      },
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: 6,
      validate(value) {
        if (value.toLowerCase().includes("password"))
          throw new Error("Password must not contain password!");
      },
    },
    name: {
      type: String,
      trim: true,
      default: "Admin",
    },
  },
  { timestamps: true }
);

//TODO: find out where do i put these functions

// adminSchema.statics.findByCredentials = async (email, password) => {
//   const admin = await Admin;
// };
//
// adminSchema.pre("save", async function (next) {
//   const admin = this;
//
//   if (admin.isModified("password")) {
//     admin.password = await bcrypt.hash(admin.password, 8);
//   }
//
//   next();
// });

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
