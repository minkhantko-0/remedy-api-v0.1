function isAuthenticated(req, res, next) {
  if (req.token && req.admin) {
    return next();
  }

  return res.status(401).send({ error: "auth-error/unauthorized" });
}

module.exports = isAuthenticated;
