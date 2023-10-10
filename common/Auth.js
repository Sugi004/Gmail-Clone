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

    if (cookies.accessToken) {
      // If token present getting the expire time
      let payload = await decodeToken(cookies.accessToken);
      let currTime = Math.round(+new Date() / 1000);
      console.log(currTime, payload.exp);
      // Compare current time and Expire time
      if (currTime < payload.exp) {
        // If Expire time is less than currentTime moving to next
        next();
      } else {
        res.status(400).send({ message: "Token expired" });
      }
    } else {
      res.status(401).send({ message: "Unauthorized access" });
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
