const EmployeeModel = require("../models/employee.model");
const sharp = require("sharp");

const Service = {
  registerEmployee: async ({ name, dateOfBirth, email, gender, jobType }) => {
    const employee = new EmployeeModel({
      name,
      email,
      dateOfBirth,
      gender,
      jobType,
    });

    await employee.save();
    return employee;
  },

  uploadProfile: async ({ params, file }) => {
    const { id } = params;
    const avatar = await sharp(file.buffer).png().toBuffer();

    return EmployeeModel.findByIdAndUpdate(id, { avatar }, { new: true });
  },

  getProfile: async ({ id }) => {
    const { avatar } = await EmployeeModel.findById(id);
    return avatar;
  },

  removeProfile: async ({ id }) => {
    const avatar = undefined;
    return EmployeeModel.findByIdAndUpdate(id, { avatar }, { new: true });
  },

  getEmployee: async ({
    id,
    name,
    gender,
    jobType,
    email,
    limit,
    skip,
    sort,
  }) => {
    // TODO: create a helper for filter and option
    const filter = {};
    const options = {};

    if (id) filter._id = id;
    if (jobType) filter.jobType = jobType;
    if (name) filter.name = name;
    if (email) filter.email = email;
    if (gender) filter.gender = gender;

    options.limit = limit ? +limit : 0;
    options.skip = skip ? +skip : 0;
    if (sort) {
      options.sort = sort;
    }
    let data = await EmployeeModel.find(filter, null, { ...options });
    let count = await EmployeeModel.find(filter, null).countDocuments();

    [data, count] = await Promise.all([data, count]);

    if (id) {
      return data;
    }

    return { data, count };
  },

  updateEmployeeById: async ({ params, body }) => {
    const { id } = params;
    const { name, dateOfBirth, email, gender, jobType } = body;
    const updates = {};

    if (jobType) {
      updates.jobType = jobType;
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

    return EmployeeModel.findByIdAndUpdate(id, updates, { new: true });
  },

  removeEmployeeByID: async (id) => {
    return EmployeeModel.findByIdAndDelete(id);
  },
};

module.exports = Service;
