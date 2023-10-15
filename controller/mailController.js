const nodemailer = require("nodemailer");
const auth = require("../common/Auth");
const sanitize = require("../common/sanitize");
const userModel = require("../model/users");
const mongoose = require("mongoose");
let ObjectId = mongoose.Types.ObjectId;

//Create a Nodemailer Transport
let transport = nodemailer.createTransport({
  host: "localhost",
  port: process.env.smtpPort || 25,
  auth: true,
  auth: {
    user: process.env.user,
    pass: process.env.password
  },
  secureConection: false,
  tls: {
    rejectUnauthorized: false
  }
});

// Calling the Transporter function when we hit the send mail

let transporter = async (req, res) => {
  // Get From Email from cookie

  const { cookies } = req;
  const token = cookies.accessToken;
  const mail = await auth.decodeToken(token);

  let fromUser = mail.email;
  let recipient = req.body.to;
  let subject = req.body.subject;
  let body = req.body.body;
  let date = new Date().toTimeString().split(" ")[0];
  let requestReceived = req.body;

  // Destructuring the received objects

  const message = {
    from: fromUser,
    to: recipient,
    subject: subject,
    text: body,
    date: date
  };

  const validateEmail = (e) => {
    var emailPattern =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:[;,][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})*$/;

    return emailPattern.test(e);
  };
  // Check if the Email is Valid

  if (validateEmail(message.to)) {
    // Transporting the mail to SMTP
    transport.sendMail(message, async (error, info) => {
      if (error) {
        res.status(500).send({ errMessage: error.message });
        return console.log(error);
      }
      res.status(200).send({ message: "Mail sent successfully" });
    });
  } else {
    res.status(404).send({ message: "Please provide an valid email" });
  }
};

const deleteMailById = async (req, res) => {
  try {
    // Sanitize the received Params
    let receivedId = sanitize.isString(req.params.id);
    // Validate the Cookie
    let { cookies } = req;
    let token = cookies.accessToken;

    if (token) {
      // Decode the Token to get the email id of the logged in user
      let payload = await auth.decodeToken(token);

      // Delete the email based on the payload email and _id
      await userModel.updateOne(
        { email: payload.email },
        { $pull: { receivedMails: { _id: receivedId } } },
        { multi: true }
      );

      await userModel.updateOne(
        { email: payload.email },
        { $pull: { sentMails: { _id: receivedId } } },
        { multi: true }
      );

      res.status(200).send({
        message: "Mail Deleted Successfully"
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      errorMessage: error.message
    });
  }
};

const getMailById = async (req, res) => {
  try {
    //Sanitize the Received params
    let receivedId = new ObjectId(sanitize.isString(req.params.id));
    // Validate the Cookie
    let { cookies } = req;
    let token = cookies.accessToken;

    if (token) {
      // Decode the Token to get the email id of the logged in user
      let payload = await auth.decodeToken(token);

      let recievedMail = await userModel.findOne(
        { email: payload.email },
        { receivedMails: { $elemMatch: { _id: receivedId } } }
      );

      let sentMail = await userModel.findOne(
        { email: payload.email },
        { sentMails: { $elemMatch: { _id: receivedId } } }
      );

      res.status(200).send({
        recievedMail,
        sentMail
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      errorMessage: error.message
    });
  }
};

module.exports = { transporter, deleteMailById, getMailById };
