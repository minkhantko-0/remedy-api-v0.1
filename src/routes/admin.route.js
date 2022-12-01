const { Router } = require("express");
const AdminHandler = require('../handlers/admin.handler')
const isAuth = require("../middlewares/authentication.middleware");


const router = new Router();


router.post("/login", AdminHandler.adminLogin);

router.post("/logout", AdminHandler.adminLogout);

router.post("/logout-all", AdminHandler.logoutAllSessions);

router.post("/sign-up", AdminHandler.createAdmin);

router.get("/admins", AdminHandler.getAdmins);

router.get("/admins/:id", AdminHandler.getAdminByID);
