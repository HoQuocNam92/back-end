const verifyRole = (role) => {
  return (req, res, next) => {
    console.log("Check role", req.user.role);
    if (!req.user || !role.includes(req.user.role)) {
      return res.status(403).json({ error: "Premisson define" });
    }
    next();
  };
};
module.exports = verifyRole;
