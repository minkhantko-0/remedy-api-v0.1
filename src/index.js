const express = require("express");
require("./database/mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
