const express = require("express");
require("./database/mongoose");

const app = express();
const port = process.env.PORT;

app.use(express.json());
