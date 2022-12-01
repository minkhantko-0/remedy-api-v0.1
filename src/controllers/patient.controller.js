const PatientService = require("../services/patient.service");

const patientController = {
  registerPatient: async (body) => {
    return await PatientService.registerPatient(body);
  },

  uploadProfile: async (req) => {
    return await PatientService.uploadProfile(req);
  },

  getProfile: async ({ params }) => {
    return await PatientService.getProfile(params);
  },

  getPatients: async ({ params, query }) => {
    return await PatientService.getPatients({ ...params, ...query });
  },

  getPatientByID: async ({ params }) => {
    return await PatientService.getPatients(params);
  },

  updatePatientById: async (req) => {
    return PatientService.updatePatientById(req);
  },

  removeProfile: async ({ params }) => {
    return await PatientService.removeProfile(params);
  },

  removePatientByID: async ({ id }) => {
    return await PatientService.removePatientByID(id);
  },
};

module.exports = patientController;
