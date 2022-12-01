const { Router } = require("express");

// handlers
const AdminHandler = require("../handlers/admin.handler");

// middlewares
const isAuth = require("../middlewares/authentication.middleware");

const router = new Router();

router.post("/admins/login", AdminHandler.loginAdmin);

router.use(isAuth);

router.post("/admins/create", AdminHandler.createAdmin);

router.post("/admins/logout", AdminHandler.logoutAdmin);

router.post("/admins/logout-all", AdminHandler.logoutOfAllSessions);

router.get("/admins", AdminHandler.getAdmins);

router.get("/admins/:id", AdminHandler.getAdminById);

router.patch("/admins/me", AdminHandler.updateLoggedInAdmin);

router.patch("/admins/:id", AdminHandler.updateAdminById);

router.delete("/admins/:id", AdminHandler.removeAdminById);

module.exports = router;
