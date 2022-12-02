const EmployeeController = require("../controllers/employee.controller");

const Handler = {
  registerEmployee: async (req, res, next) => {
    try {
      const employee = await EmployeeController.registerEmployee(req.body);
      res.status(201).send(employee);
    } catch (e) {
      res.status(500).send({ massage: "Server Error on registering employee" });
    }
  },

  uploadProfile: async (req, res, next) => {
    try {
      const employee = await EmployeeController.uploadProfile(req);
      if (!employee)
        return res.status(404).send({ message: "Employee not found!" });
      const { avatar } = employee;
      res.set("Content-Type", "image/jpg");
      res.status(200).send(avatar);
    } catch (e) {
      res.status(500).send({ message: "Server Error on uploading profile!" });
    }
  },

  getProfile: async (req, res, next) => {
    try {
      const avatar = await EmployeeController.getProfile(req);
      res.set("Content-Type", "image/jpg");
      res.send(avatar);
    } catch (e) {
      res.status(500).send({ message: "Server Error on getting profile!" });
    }
  },

  getEmployees: async (req, res, next) => {
    try {
      const employee = await EmployeeController.getEmployee(req);
      res.send(employee);
    } catch (e) {
      res
        .status(500)
        .send({ message: "Server Error on getting employee list" });
    }
  },

  getEmployeeByID: async (req, res, next) => {
    try {
      const employee = await EmployeeController.getEmployeeByID(req);
      if (!employee)
        return res.status(404).send({ message: "Employee not found!" });
      res.send(employee);
    } catch (e) {
      res
        .status(500)
        .send({ message: "Server Error on getting employee by ID" });
    }
  },

  updateEmployeeById: async (req, res, next) => {
    try {
      const employee = await EmployeeController.updateEmployeeById(req);
      if (!employee)
        return res.status(404).send({ message: "Employee not found!" });
      return res.send(employee);
    } catch (e) {
      return res
        .status(500)
        .send({ message: "Server Error for updating employee!" });
    }
  },

  removeProfile: async (req, res, next) => {
    try {
      const employee = await EmployeeController.removeProfile(req);
      if (!employee)
        return res.status(404).send({ message: "Employee not found!" });
      return res.status(204).send();
    } catch (e) {
      return res
        .status(500)
        .send({ message: "Server Error for removing profile!" });
    }
  },

  terminateEmployee: async (req, res, next) => {
    try {
      const employee = await EmployeeController.removeEmployeeByID(req.params);
      if (!employee)
        return res.status(404).send({ message: "Employee not found!" });
      res.status(204).send();
    } catch (e) {
      return res
        .status(500)
        .send({ message: "Server Error for removing employee!" });
    }
  },
};

module.exports = Handler;
