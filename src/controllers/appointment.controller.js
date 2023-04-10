const AppointmentService = require("../services/appointment.service");

const Controller = {
  createAppointment: async ({ body, admin }) => {
    return await AppointmentService.createAppointment({
      ...body,
      handled_by: admin,
    });
  },

  getAppointments: async (req) => {
    return await AppointmentService.getAppointments(req);
  },

  getAppointmentById: async ({ params }) => {
    return await AppointmentService.getAppointmentById(params);
  },

  updateAppointmentByID: async ({ params, body }) => {
    return await AppointmentService.updateAppointmentByID({
      ...params,
      ...body,
    });
  },

  removeAppointmentByID: async ({params}) => {
    return await AppointmentService.removeAppointmentByID(params);
  },
};

module.exports = Controller;
