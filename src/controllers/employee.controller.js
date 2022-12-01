const EmployeeService = require("../services/employee.service");

const Controller = {
  registerEmployee: async (body) => {
    return await EmployeeService.registerEmployee(body);
  },

  uploadProfile: async (req) => {
    return await EmployeeService.uploadProfile(req);
  },

  getProfile: async ({ params }) => {
    return await EmployeeService.getProfile(params);
  },

  getEmployee: async ({ params, query }) => {
    return await EmployeeService.getEmployee({ ...params, ...query });
  },

  getEmployeeByID: async ({ params }) => {
    return await EmployeeService.getEmployee(params);
  },

  updateEmployeeById: async (req) => {
    return EmployeeService.updateEmployeeById(req);
  },

  removeProfile: async ({ params }) => {
    return await EmployeeService.removeProfile(params);
  },

  removeEmployeeByID: async ({ id }) => {
    return await EmployeeService.removeEmployeeByID(id);
  },
};

module.exports = Controller;
