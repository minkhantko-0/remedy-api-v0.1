const AdminService = require("../services/admin.service");

const adminController = {
  createAdmin: async (body) => {
    return await AdminService.createAdmin(body);
  },

  loginAdmin: async (body) => {
    return await AdminService.loginAdmin(body);
  },

  logoutAdmin: async (req) => {
    return await AdminService.logoutAdmin(req);
  },

  logoutOfAllSessions: async (req) => {
    return await AdminService.logoutOfAllSessions(req);
  },

  getAdmins: async (query) => {
    return await AdminService.getAdmins(query);
  },

  getAdminById: async (_id) => {
    return await AdminService.getAdmins({ _id });
  },

  updateAdminById: async (req) => {
    return await AdminService.updateAdmin(req);
  },

  updateLoggedInAdmin: async (req) => {
    return await AdminService.updateLoggedInAdmin(req);
  },

  removeAdminById: async (params) => {
    return await AdminService.removeAdminById(params);
  },
};

module.exports = adminController;
