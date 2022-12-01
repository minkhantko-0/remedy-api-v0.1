const patientController = require("../controllers/patient.controller");

const patientHandler = {
  registerPatient: async (req, res, next) => {
    try {
      const patient = await patientController.registerPatient(req.body);
      res.status(201).send(patient);
    } catch (e) {
      res
        .status(500)
        .send({ massage: "Server Error on  registering a patient" });
    }
  },

  uploadProfile: async (req, res, next) => {
    try {
      const patient = await patientController.uploadProfile(req);
      if (!patient)
        return res.status(404).send({ message: "Patient not found!" });
      const { avatar } = patient;
      res.set("Content-Type", "image/jpg");
      res.status(200).send(avatar);
    } catch (e) {
      res.status(500).send({ message: "Server Error on uploading profile!" });
    }
  },

  getProfile: async (req, res, next) => {
    try {
      const avatar = await patientController.getProfile(req);
      res.set("Content-Type", "image/jpg");
      res.send(avatar);
    } catch (e) {
      res.status(500).send({ message: "Server Error on getting profile!" });
    }
  },

  getPatients: async (req, res, next) => {
    try {
      const patients = await patientController.getPatients(req);
      res.send(patients);
    } catch (e) {
      res.status(500).send({ message: "Server Error on getting patient list" });
    }
  },

  getPatientByID: async (req, res, next) => {
    try {
      const patient = await patientController.getPatientByID(req);
      if (!patient)
        return res.status(404).send({ message: "Patient not found!" });
      res.send(patient);
    } catch (e) {
      res
        .status(500)
        .send({ message: "Server Error on getting patient by ID" });
    }
  },

  updatePatient: async (req, res, next) => {
    try {
      const patient = await patientController.updatePatientById(req);
      if (!patient)
        return res.status(404).send({ message: "Patient not found!" });
      return res.send(patient);
    } catch (e) {
      return res
        .status(500)
        .send({ message: "Server Error for updating patient!" });
    }
  },

  removeProfile: async (req, res, next) => {
    try {
      const patient = await patientController.removeProfile(req);
      if (!patient)
        return res.status(404).send({ message: "Patient not found!" });
      return res.status(204).send();
    } catch (e) {
      return res
        .status(500)
        .send({ message: "Server Error for removing patient profile!" });
    }
  },

  dismissPatient: async (req, res, next) => {
    try {
      const patient = await patientController.removePatientByID(req.params);
      if (!patient)
        return res.status(404).send({ message: "Patient not found!" });
      res.status(204).send();
    } catch (e) {
      return res
        .status(500)
        .send({ message: "Server Error for removing patient!" });
    }
  },
};

module.exports = patientHandler;
