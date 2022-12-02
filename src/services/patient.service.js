const PatientModel = require("../models/patient.model");
const sharp = require("sharp");

// helpers
const BasicQueryHelper = require("../helpers/basic.handle-query.helper");
const BasicQueryHelpers = require("../helpers/basic.handle-query.helper");

const patientService = {
  registerPatient: async ({ name, dateOfBirth, email, gender, diagnosis }) => {
    const patient = new PatientModel({
      name,
      email,
      dateOfBirth,
      gender,
      diagnosis,
    });

    await patient.save();
    return patient;
  },

  uploadProfile: async ({ params, file }) => {
    const { id } = params;
    const avatar = await sharp(file.buffer).png().toBuffer();

    return PatientModel.findByIdAndUpdate(id, { avatar }, { new: true });
  },

  getProfile: async ({ id }) => {
    const { avatar } = await PatientModel.findById(id);
    return avatar;
  },

  removeProfile: async ({ id }) => {
    const avatar = undefined;
    return PatientModel.findByIdAndUpdate(id, { avatar }, { new: true });
  },

  getPatients: async (query_obj) => {
    const { filter, options } = BasicQueryHelpers(query_obj);
    const id = { query_obj };
    if (id) filter._id = id;

    let data = await PatientModel.find(filter, null, { ...options });
    let count = await PatientModel.find(filter, null).countDocuments();

    [data, count] = await Promise.all([data, count]);

    if (id) {
      return data;
    }

    return { data, count };
  },

  updatePatientById: async ({ params, body }) => {
    const { id } = params;
    const { filter: updates } = BasicQueryHelper(body);

    return PatientModel.findByIdAndUpdate(id, updates, { new: true });
  },

  removePatientByID: async (id) => {
    return PatientModel.findByIdAndDelete(id);
  },
};

module.exports = patientService;
