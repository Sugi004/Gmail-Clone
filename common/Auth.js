const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  // Hash Password
  let saltRound = 15;
  let hashedPassword = await bcrypt.hash(password, saltRound);
  return hashedPassword;
};

// Compare Password while logging in
const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const createToken = async (payload) => {
  let token = await jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

// Decode token to get the payload
const decodeToken = async (token) => {
  return await jwt.decode(token);
};
// Validate token
const validate = async (req, res, next) => {
  try {
    let { cookies } = req;
    // Check Cookie is present or not
    if (cookies.accessToken) {
      // Cookie is present
      next();
    } else {
      res.status(401).send({ message: "Unauthorized Access" });
    }
  } catch (error) {
    res.status(500).send({ errorMessage: error.message });
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  createToken,
  validate,
  decodeToken
};
