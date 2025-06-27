const jwt = require("jsonwebtoken");
const Reset = (req, res, next) => {
  const token = req.params.token;
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
  if (!decoded) {
    return;
  }
  req.user = decoded;
  next();
};
module.exports = Reset;
