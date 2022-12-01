const PatientModel = require("../models/patient.model");
const sharp = require("sharp");

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

  getPatients: async ({ id, gender, email, limit, skip, sort }) => {
    const query = {};
    const options = {};

    if (id) query._id = id;
    if (email) query.email = email;
    if (gender) query.gender = gender;

    options.limit = limit ? +limit : 0;
    options.skip = skip ? +skip : 0;
    if (sort) {
      options.sort = sort;
    }
    let data = await PatientModel.find(query, null, { ...options });
    let count = await PatientModel.find(query, null).countDocuments();

    [data, count] = await Promise.all([data, count]);

    if (id) {
      return data;
    }

    return { data, count };
  },

  updatePatientById: async ({ params, body }) => {
    const { id } = params;
    const { name, dateOfBirth, email, gender, diagnosis } = body;
    const updates = {};

    if (name) {
      updates.name = name;
    }
    if (email) {
      updates.email = email;
    }
    if (dateOfBirth) {
      updates.dateOfBirth = dateOfBirth;
    }
    if (gender) {
      updates.gender = gender;
    }
    if (diagnosis) {
      updates.diagnosis = diagnosis;
    }

    return PatientModel.findByIdAndUpdate(id, updates, { new: true });
  },

  removePatientByID: async (id) => {
    return PatientModel.findByIdAndDelete(id);
  },
};

module.exports = patientService;
