const DoctorService = require("../services/doctor.service");

const Controller = {
  registerDoctor: async (body) => {
    return await DoctorService.registerDoctor(body);
  },

  uploadProfile: async (req) => {
    return await DoctorService.uploadProfile(req);
  },

  getProfile: async ({ params }) => {
    return await DoctorService.getProfile(params);
  },

  getDoctors: async ({ params, query }) => {
    return await DoctorService.getDoctors({ ...params, ...query });
  },

  getDoctorByID: async ({ params }) => {
    return await DoctorService.getDoctors(params);
  },

  updateDoctorById: async (req) => {
    return DoctorService.updateDoctorById(req);
  },

  removeProfile: async ({ params }) => {
    return await DoctorService.removeProfile(params);
  },

  removeDoctorByID: async ({ id }) => {
    return await DoctorService.removeDoctorByID(id);
  },
};

module.exports = Controller;
