const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
  } catch (e) {
    res.status(401).send({ error: "Please authenticate!" });
  }
};
