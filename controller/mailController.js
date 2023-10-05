const nodemailer = require("nodemailer");
const auth = require("../common/Auth");
const sanitize = require("../common/sanitize");
const userModel = require("../model/users");

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
let transporter = (req, res) => {
  req.body.sentMails.forEach((e) => {
    (to = e.to), (subject = e.subject), (message = e.message);
  });

  var message = {
    from: req.body.email,
    to: to,
    subject: subject,
    text: message,
    date: new Date().toTimeString().split(" ")[0]
  };

  const validateEmail = (e) => {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(e);
  };

  if (validateEmail(message.to)) {
    transport.sendMail(message, async (error, info) => {
      if (error) {
        res.status(500).send({ errMessage: error.message });
        return console.log(error);
      }
      res.status(200).send({ message: "Mail sent successfully" });
      console.log("Message sent: %s", info.messageId);
    });
  } else {
    res.status(404).send({ message: "Please provide an valid email" });
  }
};

const deleteMailById = async (req, res) => {
  try {
    let receivedId = sanitize.isString(req.params.id);
    let token = req?.headers?.authorization?.split(" ")[1];
    if (token) {
      let payload = await auth.decodeToken(token);
      let user = await userModel.findOne({ email: payload.email });

      if (user) {
        await userModel.updateOne(
          {},
          { $pull: { receivedMails: { _id: receivedId } } },
          { multi: true }
        );
        await userModel.updateOne(
          {},
          { $pull: { sentMails: { _id: receivedId } } },
          { multi: true }
        );

        res.status(200).send({
          message: "Mail Deleted Successfully"
        });
      }
    } else {
      res.status(400).send({
        message: "Invalid Mail ID"
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
