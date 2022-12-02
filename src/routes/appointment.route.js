const { Router } = require("express");

// handlers
const AppointmentHandler = require("../handlers/appointment.handler");

// middlewares
const isAuth = require("../middlewares/authentication.middleware");

const router = new Router();
router.use(isAuth);

router.post("/appointments", AppointmentHandler.createAppointment);

router.get("/appointments", AppointmentHandler.getAppointments);

router.get("/appointments/:id", AppointmentHandler.getAppointmentById);

router.patch("/appointments/:id", AppointmentHandler.updateAppointmentByID);

router.delete("/appointments/:id", AppointmentHandler.removeAppointmentByID);

module.exports = router;
