const SMTPServer = require("smtp-server").SMTPServer;
const MailParser = require("mailparser").MailParser;
const userModel = require("../model/users");

const smtpServer = new SMTPServer({
  secure: false,
  authOptional: true,
  onAuth(auth, session, callback) {
    // Hardcoded username and password for testing (replace with your own values)
    const Username = process.env.user;
    const Password = process.env.password;

    // Check if provided credentials match the expected ones
    if (auth.username === Username && auth.password === Password) {
      // Authentication successful
      session.user = { username: auth.username };
      return callback(null, { user: session.user.username });
    } else {
      // Authentication failed
      return callback(new Error("Authentication failed"));
    }
  },
  onData(stream, session, callback) {
    let messageData = "";

    stream.on("data", (chunk) => {
      messageData += chunk.toString();
    });
    // When the entire email is received
    stream.on("end", () => {
      const mailParser = new MailParser();

      mailParser.on("headers", async (headers) => {
        const fromEmail = headers.get("from").text;
        const toEmail = headers.get("to").text;

        // Create an email object with the headers
        const emailObject = {
          from: fromEmail,
          to: toEmail,
          subject: headers.get("subject"),
          date: headers.get("date"),
          message: ""
        };

        // Listen for data and concatenate it to the data field
        mailParser.on("data", (data) => {
          emailObject.message += data.text.replace(/\n/g, "");

          console.log(emailObject.message);
        });

        // When the email parsing is complete
        mailParser.on("end", async () => {
          // Find the sender user by their email address
          let senderUser = await userModel.findOne({ email: fromEmail });

          // Check if the sender is the logged-in user (or the recipient)
          if (senderUser) {
            // Save the email object to the sentMails array
            senderUser.sentMails.push(emailObject);
            senderUser.save();
          }
          // Find the recipient user by their email address
          let recipientUser = await userModel.findOne({ email: toEmail });

          if (recipientUser) {
            // Save the email object to the receivedMails array of the recipient user
            recipientUser.receivedMails.push(emailObject);

            // Save the recipient user's changes to the database
            recipientUser.save();
            console.log("recipient saved successfully");
          }
        });
      });

      callback(null, "Message accepted");
      mailParser.write(messageData);
      mailParser.end();
    });
  }
});

module.exports = smtpServer;
