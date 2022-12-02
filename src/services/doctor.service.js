const DoctorModel = require("../models/doctor.model");
const sharp = require("sharp");

// helpers
const basicQueryHelper = require("../helpers/basic.handle-query.helper");

const Service = {
  registerDoctor: async ({
    name,
    dateOfBirth,
    email,
    gender,
    specialization,
  }) => {
    const doctor = new DoctorModel({
      name,
      email,
      dateOfBirth,
      gender,
      specialization,
    });

    await doctor.save();
    return doctor;
  },

  uploadProfile: async ({ params, file }) => {
    const { id } = params;
    const avatar = await sharp(file.buffer).png().toBuffer();

    return DoctorModel.findByIdAndUpdate(id, { avatar }, { new: true });
  },

  getProfile: async ({ id }) => {
    const { avatar } = await DoctorModel.findById(id);
    return avatar;
  },

  removeProfile: async ({ id }) => {
    const avatar = undefined;
    return DoctorModel.findByIdAndUpdate(id, { avatar }, { new: true });
  },

  getDoctors: async (query_obj) => {
    const { filter, options } = basicQueryHelper(query_obj);

    const { id } = query_obj;
    if (id) filter._id = id;

    let data = await DoctorModel.find(filter, null, options);
    let count = await DoctorModel.find(filter, null).countDocuments();

    [data, count] = await Promise.all([data, count]);

    if (id) {
      return data;
    }

    return { data, count };
  },

  updateDoctorById: async ({ params, body }) => {
    const { id } = params;
    const { filter: updates } = basicQueryHelper(body);

    return DoctorModel.findByIdAndUpdate(id, updates, { new: true });
  },

  removeDoctorByID: async (id) => {
    return DoctorModel.findByIdAndDelete(id);
  },
};

module.exports = Service;
