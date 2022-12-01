const { Router } = require("express");

// handlers
const EmployeeHandler = require("../handlers/employee.handler");

// middlewares
const isAuth = require("../middlewares/authentication.middleware");
const upload = require("../middlewares/upload.middleware");

const router = new Router();
router.use(isAuth);

router.post("/employees", EmployeeHandler.registerEmployee);

router.get("/employees", EmployeeHandler.getEmployees);

router.get("/employees/:id", EmployeeHandler.getEmployeeByID);

router.get("/employees/:id/avatar", EmployeeHandler.getProfile);

router.patch("/employees/:id", EmployeeHandler.updateEmployeeById);

router.patch(
    "/employees/:id/avatar",
    upload.single("avatar"),
    EmployeeHandler.uploadProfile,
    (err, req, res, next) => {
        res.status(400).send({ error: err.message });
    }
);

router.delete("/employees/:id/avatar", EmployeeHandler.removeProfile);

router.delete("/employees/:id", EmployeeHandler.terminateEmployee);

module.exports = router;
