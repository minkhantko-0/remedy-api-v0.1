const EmployeeModel = require("../models/employee.model");
const sharp = require("sharp");

// helpers
const BasicQueryHelper = require("../helpers/basic.handle-query.helper");

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

  getEmployee: async (query_obj) => {
    const { filter, options } = BasicQueryHelper(query_obj);

    const { id } = query_obj;
    if (id) filter._id = id;
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
    const { filter: updates } = BasicQueryHelper(body);

    return EmployeeModel.findByIdAndUpdate(id, updates, { new: true });
  },

  removeEmployeeByID: async (id) => {
    return EmployeeModel.findByIdAndDelete(id);
  },
};

module.exports = Service;
