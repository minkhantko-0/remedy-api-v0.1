const AdminModel = require("../models/admin.model");

const adminService = {
  createAdmin: async ({ name, email, password }) => {
    const admin = new AdminModel({ name, email, password });
    await admin.save();

    const token = await AdminModel.generateAuthToken();
    [admin, token] = await Promise.all([admin, token]);

    return { admin, token };
  },

  getAdmins: async ({ limit = 0, skip = 0, sort }) => {
    const options = { limit: +limit, skip: +skip, sort };

    const data = await AdminModel.find({}, null, options);
    const count = await AdminModel.find({}, null, options).countDocuments();

    [data, count] = await Promise.all([data, count]);

    return { data, count };
  },
};

module.exports = adminService;
