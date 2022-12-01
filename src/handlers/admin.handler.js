const adminController = require("../controllers/admin.controller");

const adminHandler = {
  createAdmin: async (req, res, next) => {
    try {
      const admin = await adminController.createAdmin(req.body);
      return res.status(201).send(admin);
    } catch (e) {
      return res.status(500).send({ message: "Server Error!" });
    }
  },

  loginAdmin: async (req, res, next) => {
    try {
      const admin = await adminController.loginAdmin(req.body);
      return res.status(200).send(admin);
    } catch (e) {
      return res
        .status(400)
        .send({ error: "Sorry we are unable to log u in!" });
    }
  },
  logoutAdmin: async (req, res, next) => {
    try {
      const admin = await adminController.logoutAdmin(req);
      return res.send();
    } catch (e) {
      return res.status(500).send({ massage: "Server Error on Logging out!" });
    }
  },

  logoutOfAllSessions: async (req, res, next) => {
    try {
      const admin = await adminController.logoutOfAllSessions(req);
      return res.send();
    } catch (e) {
      return res
        .status(500)
        .send({ massage: "Server Error on Logging out of all sessions!" });
    }
  },

  getAdmins: async (req, res, next) => {
    try {
      const admins = await adminController.getAdmins(req.query);
      return res.send(admins);
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Server Error on getting admins!" });
    }
  },

  getAdminById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const admin = await adminController.getAdminById(id);
      if (!admin) return res.status(404).send({ message: "Admin not found!" });
      return res.send(admin);
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Server Error on getting admin by id!" });
    }
  },

  updateAdminById: async (req, res, next) => {
    try {
      const admin = await adminController.updateAdminById(req);
      if (!admin) return res.status(404).send({ message: "Admin not found!" });

      return res.send(admin);
    } catch (e) {
      return res
        .status(500)
        .send({ message: "Server Error for updating admin by id!" });
    }
  },

  updateLoggedInAdmin: async (req, res, next) => {
    try {
      const admin = await adminController.updateLoggedInAdmin(req);
      return res.send(admin);
    } catch (e) {
      return res
        .status(500)
        .send({ message: "Server Error for updating loggedIn admin!" });
    }
  },

  removeAdminById: async (req, res, next) => {
    try {
      const admin = await adminController.removeAdminById(req.params);
      if (!admin) return res.status(404).send("Admin not found!");
      return res.status(204).send();
    } catch (e) {
      return res
        .status(500)
        .send({ message: "Server error for deleting the user!" });
    }
  },
};

module.exports = adminHandler;
