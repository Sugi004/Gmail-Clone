const nodemailer = require("nodemailer");
const auth = require("../common/Auth");
const sanitize = require("../common/sanitize");
const userModel = require("../model/users");

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

let transporter = (req, res) => {
  let fromUser = req.body.email;
  let recipient = [];
  let subject;
  let body;
  let date = new Date().toTimeString().split(" ")[0];
  let requestReceived = req.body.sentMails;

  // Destructuring the received objects

  requestReceived.forEach((e) => {
    e.to.forEach((e) => {
      return recipient.push(e);
    });
    subject = e.subjec;
    body = e.body;
  });

  const message = {
    from: fromUser,
    to: recipient,
    subject: subject,
    text: body,
    date: date
  };

  const validateEmail = (e) => {
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return e.every((email) => emailPattern.test(email));
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
    // Validate whether Token is present
    let token = req?.headers?.authorization?.split(" ")[1];

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

module.exports = { transporter, deleteMailById };
