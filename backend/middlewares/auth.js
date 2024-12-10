const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/CustomError");
const { verifyToken } = require("../utils/jwt");

// Authenication of users
const auth = asyncErrorHandler((req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new CustomError("No token, authorization denied", 401);
  }
  const decoded = verifyToken(token);
  req.user = decoded;
  console.log(req.user);
  next();
 
});

module.exports = auth;
