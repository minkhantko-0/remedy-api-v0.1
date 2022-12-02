const AdminModel = require("../models/admin.model");

// helpers
const BasicQueryHelpers = require("../helpers/basic.handle-query.helper");

const adminService = {
  createAdmin: async ({ name, email, password }) => {
    const admin = new AdminModel({ name, email, password });
    await admin.save();

    return admin;
  },

  loginAdmin: async ({ email, password }) => {
    let admin = await AdminModel.findByCredentials({ email, password });
    let token = await admin.generateAuthToken();

    [admin, token] = await Promise.all([admin, token]);

    return { admin, token };
  },

  logoutAdmin: async (req) => {
    req.admin.tokens = req.admin.tokens.filter(({ token }) => {
      return token !== req.token;
    });
    await req.admin.save();
  },

  logoutOfAllSessions: async ({ admin }) => {
    admin.tokens = [];
    await admin.save();
  },

  getAdmins: async (query_obj) => {
    const { filter, options } = BasicQueryHelpers(query_obj);
    const { _id } = query_obj;
    if (_id) filter._id = _id;

    let data = await AdminModel.find(filter, null, options);
    let count = await AdminModel.find(filter).countDocuments();

    [data, count] = await Promise.all([data, count]);

    if (_id) {
      return data;
    }
    return { data, count };
  },

  updateAdmin: async ({ params, body }) => {
    const { id } = params;
    const { filter: updates } = BasicQueryHelpers(body);

    return AdminModel.findByIdAndUpdate(id, updates, { new: true });
  },

  updateLoggedInAdmin: async ({ admin, body }) => {
    const updates = Object.keys(body);
    const allowedUpdates = ["name", "email", "password"];

    const isAllowed = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isAllowed) throw new Error("Invalid patch attempt!");

    updates.forEach((update) => (admin[update] = body[update]));
    await admin.save();

    return admin;
  },

  removeAdminById: async ({ id }) => {
    return AdminModel.findByIdAndDelete(id);
  },
};

module.exports = adminService;
