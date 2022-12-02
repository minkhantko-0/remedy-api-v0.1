const DoctorModel = require("../models/doctor.model");
const sharp = require("sharp");

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

  getDoctors: async ({
    id,
    gender,
    specialization,
    email,
    limit,
    skip,
    sort,
  }) => {
    const condition = {};
    const options = {};

    if (id) condition._id = id;
    if (specialization) condition.specialization = specialization;
    if (email) condition.email = email;
    if (gender) condition.gender = gender;

    options.limit = limit ? +limit : 0;
    options.skip = skip ? +skip : 0;
    if (sort) {
      options.sort = sort;
    }
    let data = await DoctorModel.find(condition, null, { ...options });
    let count = await DoctorModel.find(condition, null).countDocuments();

    [data, count] = await Promise.all([data, count]);

    if (id) {
      return data;
    }

    return { data, count };
  },

  updateDoctorById: async ({ params, body }) => {
    const { id } = params;
    const { name, dateOfBirth, email, gender, specialization } = body;
    const updates = {};

    if (specialization) {
      updates.specialization = specialization;
    }
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

    return DoctorModel.findByIdAndUpdate(id, updates, { new: true });
  },

  removeDoctorByID: async (id) => {
    return DoctorModel.findByIdAndDelete(id);
  },
};

module.exports = Service;
