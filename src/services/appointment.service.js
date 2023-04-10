const AppointmentModel = require("../models/appointment.model");

// helpers
const queryHandlingHelper = require("../helpers/appointment.handle-query.helper");

const Service = {
  createAppointment: async ({ doctor, patient, handled_by }) => {
    const appointment = new AppointmentModel({ patient, doctor, handled_by });
    return await appointment.save();
  },

  getAppointments: async (query_obj) => {
    const { filter, options } = queryHandlingHelper(query_obj);

    let data = await AppointmentModel.find(filter, null, options);
    let count = await AppointmentModel.find(filter, null).countDocuments();

    [data, count] = await Promise.all([data, count]);

    return { data, count };
  },

  getAppointmentById: async ({ id }) => {
    return AppointmentModel.findById(id);
  },

  updateAppointmentByID: async ({ id, status }) => {
    return AppointmentModel.findByIdAndUpdate(id, { status }, { new: true });
  },

  removeAppointmentByID: async ({ id }) => {
    return AppointmentModel.findByIdAndDelete(id);
  },
};

module.exports = Service;
