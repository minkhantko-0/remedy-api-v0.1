const DoctorController = require("../controllers/doctor.controller");

const Handler = {
  registerDoctor: async (req, res, next) => {
    try {
      const doctor = await DoctorController.registerDoctor(req.body);
      res.status(201).send(doctor);
    } catch (e) {
      res.status(500).send({ massage: "Server Error on registering doctor" });
    }
  },

  uploadProfile: async (req, res, next) => {
    try {
      const doctor = await DoctorController.uploadProfile(req);
      if (!doctor)
        return res.status(404).send({ message: "Doctor not found!" });
      const { avatar } = doctor;
      res.set("Content-Type", "image/jpg");
      res.status(200).send(avatar);
    } catch (e) {
      res.status(500).send({ message: "Server Error on uploading profile!" });
    }
  },

  getProfile: async (req, res, next) => {
    try {
      const avatar = await DoctorController.getProfile(req);
      res.set("Content-Type", "image/jpg");
      res.send(avatar);
    } catch (e) {
      res.status(500).send({ message: "Server Error on getting profile!" });
    }
  },

  getDoctors: async (req, res, next) => {
    try {
      const doctor = await DoctorController.getDoctors(req);
      res.send(doctor);
    } catch (e) {
      res
        .status(500)
        .send({ message: "Server Error on getting employee list" });
    }
  },

  getDoctorByID: async (req, res, next) => {
    try {
      const doctor = await DoctorController.getDoctorByID(req);
      if (!doctor)
        return res.status(404).send({ message: "Doctor not found!" });
      res.send(doctor);
    } catch (e) {
      res.status(500).send({ message: "Server Error on getting doctor by ID" });
    }
  },

  updateDoctorById: async (req, res, next) => {
    try {
      const doctor = await DoctorController.updateDoctorById(req);
      if (!doctor)
        return res.status(404).send({ message: "Doctor not found!" });
      return res.send(doctor);
    } catch (e) {
      return res
        .status(500)
        .send({ message: "Server Error for updating doctor!" });
    }
  },

  removeProfile: async (req, res, next) => {
    try {
      const doctor = await DoctorController.removeProfile(req);
      if (!doctor)
        return res.status(404).send({ message: "Doctor not found!" });
      return res.status(204).send();
    } catch (e) {
      return res
        .status(500)
        .send({ message: "Server Error for removing profile!" });
    }
  },

  terminateDoctor: async (req, res, next) => {
    try {
      const doctor = await DoctorController.removeDoctorByID(req.params);
      if (!doctor)
        return res.status(404).send({ message: "Doctor not found!" });
      res.status(204).send();
    } catch (e) {
      return res
        .status(500)
        .send({ message: "Server Error for removing doctor!" });
    }
  },
};

module.exports = Handler;
