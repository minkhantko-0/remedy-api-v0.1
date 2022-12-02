const { Router } = require("express");

// handlers
const DoctorHandler = require("../handlers/doctor.handler");

// middlewares
const isAuth = require("../middlewares/authentication.middleware");
const upload = require("../middlewares/upload.middleware");

const router = new Router();
router.use(isAuth);

router.post("/doctors", DoctorHandler.registerDoctor);

router.get("/doctors", DoctorHandler.getDoctors);

router.get("/doctors/:id", DoctorHandler.getDoctorByID);

router.get("/doctors/:id/avatar", DoctorHandler.getProfile);

router.patch("/doctors/:id", DoctorHandler.updateDoctorById);

router.patch(
    "/doctors/:id/avatar",
    upload.single("avatar"),
    DoctorHandler.uploadProfile,
    (err, req, res, next) => {
        res.status(400).send({ error: err.message });
    }
);

router.delete("/doctors/:id/avatar", DoctorHandler.removeProfile);

router.delete("/doctors/:id", DoctorHandler.terminateDoctor);

module.exports = router;
