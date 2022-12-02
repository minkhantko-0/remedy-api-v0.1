const express = require("express");
require("./database/mongoose");

// routers
const adminRouter = require("./routes/admin.route");
const patientRouter = require("./routes/patient.route");
const employeeRouter = require("./routes/employee.route");
const doctorRouter = require("./routes/doctor.route");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(adminRouter);
app.use(patientRouter);
app.use(employeeRouter);
app.use(doctorRouter);

app.listen(port, () => {
  console.log("Hello from " + port);
});
