const { Router } = require("express");

// handlers
const PatientHandlers = require("../handlers/patient.handler");

// middlewares
const isAuth = require("../middlewares/authentication.middleware");
const upload = require("../middlewares/upload.middleware");

const router = new Router();
router.use(isAuth);

router.post("/patients", PatientHandlers.registerPatient);

router.get("/patients", PatientHandlers.getPatients);

router.get("/patients/:id", PatientHandlers.getPatientByID);

router.get("/patients/:id/avatar", PatientHandlers.getProfile);

router.patch("/patients/:id", PatientHandlers.updatePatient);

router.patch(
  "/patients/:id/avatar",
  upload.single("avatar"),
  PatientHandlers.uploadProfile,
  (err, req, res, next) => {
    res.status(400).send({ error: err.message });
  }
);

router.delete("/patients/:id/avatar", PatientHandlers.removeProfile);

router.delete("/patients/:id", PatientHandlers.dismissPatient);

module.exports = router;
