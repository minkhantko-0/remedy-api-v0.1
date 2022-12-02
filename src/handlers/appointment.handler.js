const AppointmentController = require("../controllers/appointment.controller");

const Handler = {
  createAppointment: async (req, res, next) => {
    try {
      const appointment = await AppointmentController.createAppointment(req);
      return res.status(201).send(appointment);
    } catch (e) {
      res
        .status(500)
        .send({ message: "Server Error on creating an appointment!" });
    }
  },

  getAppointments: async (req, res, next) => {
    try {
      const appointments = await AppointmentController.getAppointments(req);
      return res.send(appointments);
    } catch (e) {
      res
        .status(500)
        .send({ message: "Server Error on getting appointments!" });
    }
  },

  getAppointmentById: async (req, res, next) => {
    try {
      const appointment = await AppointmentController.getAppointmentById(req);
      if (!appointment)
        return res.status(404).send({ message: "Appointment not found" });
      res.send(appointment);
    } catch (e) {
      res
        .status(500)
        .send({ message: "Server Error on getting appointment by ID!" });
    }
  },

  updateAppointmentByID: async (req, res, next) => {
    try {
      const appointment = await AppointmentController.updateAppointmentByID(
        req
      );
      if (!appointment)
        return res.status(404).send({ message: "Appointment not found" });
      res.send(appointment);
    } catch (e) {
      res
        .status(500)
        .send({ message: "Server Error on updating appointment by ID!" });
    }
  },

  removeAppointmentByID: async (req, res, next) => {
    try {
      const appointment = await AppointmentController.removeAppointmentByID();
      if (!appointment)
        return res.status(404).send({ message: "Appointment not found" });
      res.status(204).send();
    } catch (e) {
      res
        .status(500)
        .send({ message: "Server Error on removing appointment by ID!" });
    }
  },
};

module.exports = Handler;
