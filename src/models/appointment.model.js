const mongoose = require("mongoose");
const Statuses = require("../constants/appointment-state.constants");

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Patient",
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Doctor",
    },
    status: {
      type: String,
      default: "IN_SESSION",
      enum: Statuses,
    },
    handled_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model(
  "Appointment",
  appointmentSchema,
  "appointments"
);
