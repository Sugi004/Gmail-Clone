const userModel = require("../model/users");
const sanitize = require("../common/sanitize");
const auth = require("../common/Auth");

const getData = async (req, res) => {
  try {
    let { cookies } = req;

    let token = cookies.accessToken;
    // Decode Token to get the Email ID
    let payload = await auth.decodeToken(token);

    // Show data of logged in user
    let data = await userModel.find({ email: payload.email });
    res.status(200).send({
      data
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      errorMessage: error.message
    });
  }
};

const createUser = async (req, res) => {
  try {
    const firstName =
      sanitize.isString(req.body.firstName) &&
      sanitize.isTitleCase(req.body.firstName);
    const lastName =
      sanitize.isString(req.body.lastName) &&
      sanitize.isTitleCase(req.body.lastName);

    const email = sanitize.isString(req.body.email).toLowerCase();
    let password = sanitize.isString(req.body.password);

    password = await auth.hashPassword(password);

    let existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      await userModel.create({
        firstName,
        lastName,
        email,
        password
      });

      res.status(200).send({
        message: "User Created Successfully"
      });
    } else {
      res.status(400).send({
        message: `${req.body.email} already exists`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      errorMessage: error.message
    });
  }
};

const loginUser = async (req, res) => {
  try {
    let email = sanitize.isString(req.body.email);
    let password = sanitize.isString(req.body.password);

    let user = await userModel.findOne({ email: email });
    if (user) {
      if (await auth.comparePassword(password, user.password)) {
        let token = await auth.createToken({
          firstName: user.firstName,
          email: user.email
        });

        res.status(200).send({
          message: "Login Successfull",
          token
        });
      } else {
        res.status(400).send({
          message: "Invalid Password"
        });
      }
    } else {
      res.status(400).send({
        message: "Invalid Email address"
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      errorMessage: error.message
    });
  }
};

const signOut = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.status(200).send({ message: "User Signed out Successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server error", errorMessage: error.message });
  }
};
module.exports = { createUser, loginUser, getData, signOut };
