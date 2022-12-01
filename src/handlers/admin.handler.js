const adminController = require("../controllers/admin.controller");
const e = require("express");

const adminHandler = {
  createAdmin: async (req, res, next) => {
    try {
      const admin = await adminController.createAdmin(req.body);
      return res.status(201).send(admin);
    } catch (e) {
      return res.status(500).send({ message: "Server Error!" });
    }
  },

  getAdmins: async (req, res, next) => {
    try {
      const admins = await adminController.getAdmins();
      if (admins) {
        return res.status(200).send(admins);
      }
    } catch (error) {
      return res.status(500).send({ message: "Server Error!" });
    }
  },
};

module.exports = adminHandler;
