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
  let token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
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

    if (cookies.accessToken) {
      // If token present getting the expire time
      let payload = await decodeToken(cookies.accessToken);
      let currTime = Math.round(+new Date() / 1000);

      // Compare current time and Expire time
      if (currTime < payload.exp) {
        // If Expire time is less than currentTime moving to next
        next();
      } else {
        res.status(400).send({ message: "Token expired" });
      }
    } else {
      res.status(401).send({ message: "Token not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  createToken,
  validate,
  decodeToken
};
