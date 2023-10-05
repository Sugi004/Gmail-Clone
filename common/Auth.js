const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  let hashedPassword = await bcrypt.hash(password, 15);

  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const createToken = async (payload) => {
  let token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
  return token;
};

const decodeToken = async (token) => {
  return await jwt.decode(token);
};

const validate = async (req, res, next) => {
  try {
    let token = req?.headers?.authorization?.split(" ")[1];

    if (token) {
      let payload = await decodeToken(token);
      let currTime = Math.round(+new Date() / 1000);

      if (currTime < payload.exp) {
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

const deleteEmail = async (req, res, next) => {
  try {
    let token = req?.headers?.authorization?.split(" ")[1];

    if (token) {
      let payload = await decodeToken(token);

      if (payload.role === "admin") {
        next();
      } else {
        res.status(400).send({ message: "Only Admin are alowed to access" });
      }
    } else {
      res.status(401).send({ message: "Token not found" });
    }
  } catch (error) {}
};

module.exports = {
  hashPassword,
  comparePassword,
  createToken,
  validate,
  decodeToken,
  deleteEmail
};
