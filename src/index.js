const express = require("express");
require("./database/mongoose");

// routers
const adminRouter = require("./routes/admin.route");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(adminRouter);

app.listen(port, () => {
  console.log("Hello from " + port);
});
