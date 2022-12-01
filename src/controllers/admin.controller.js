const AdminService = require("../services/admin.service");

const adminController = {
  createAdmin: async (body) => {
    return AdminService.createAdmin(body);
  },

  getAdmins: async (query) => {
    return AdminService.getAdmins(query);
  },
};

module.exports = adminController;
