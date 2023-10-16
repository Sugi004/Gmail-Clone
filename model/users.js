const mongoose = require("./index");

const validateEmail = (e) => {
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(e);
};

const emailSchema = new mongoose.Schema({
  from: String,
  to: [String],
  subject: String,
  body: String,
  date: Date
});
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName is required"]
    },
    lastName: {
      type: String,
      required: [true, "lastName is required"]
    },
    email: {
      type: String,
      required: [true, "email is required"],
      validate: {
        validator: validateEmail,
        message: "Invalid Email Id"
      }
    },
    password: {
      type: String,
      required: [true, "password is required"]
    },

    receivedMails: [emailSchema],
    sentMails: [emailSchema]
  },
  { versionKey: false, collection: "users" }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;