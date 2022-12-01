const AdminModel = require("../models/admin.model");

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

  getAdmins: async ({ name, _id, limit = 0, skip = 0, sort }) => {
    const options = {};
    const query = {};

    if (name) query.name = name;
    if (_id) query._id = _id;

    options.limit = limit ? +limit : 0;
    options.skip = skip ? +skip : 0;
    if (sort) {
      options.sort = sort;
    }

    let data = await AdminModel.find(query, null, { ...options });
    let count = await AdminModel.find(query).countDocuments();

    [data, count] = await Promise.all([data, count]);

    if (_id) {
      return data;
    }
    return { data, count };
  },

  updateAdmin: async (req) => {
    const { id } = req.params;
    const { name, password, email } = req.body;
    const updates = {};

    if (name) {
      updates.name = name;
    }

    if (email) {
      updates.email = email;
    }
    if (password) {
      updates.password = password;
    }

    return AdminModel.findByIdAndUpdate(id, updates);
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
