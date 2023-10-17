const SMTPServer = require("smtp-server").SMTPServer;
const MailParser = require("mailparser").MailParser;
const userModel = require("../model/users");

const smtpServer = new SMTPServer({
  secure: false,
  authOptional: true,
  onAuth(auth, session, callback) {
    // Hardcoded username and password as it's for Development
    const Username = process.env.user;
    const Password = process.env.password;

    // Check if provided credentials match
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
        const fromEmail = headers.get("from").text.trim();
        let toEmail = headers.get("to").text.split(",");

        // Filter if recipient and Sender are same
        toEmail = toEmail.filter((e) => e.trim() !== fromEmail);

        // Creating an emailObject with headers

        const emailObject = {
          from: fromEmail,
          to: toEmail,
          subject: headers.get("subject"),
          date: headers.get("date"),
          body: ""
        };

        // Listen for data and concatenate it to the data field
        mailParser.on("data", (data) => {
          if (data.type === "text" && !data.text) {
            emailObject.body += "";
          } else {
            emailObject.body += data.text.replace(/\n/g, "");
          }
        });

        // When the email parsing is complete
        mailParser.on("end", async () => {
          if (!emailObject.to.length) {
            return;
          }
          // Find the sender user by their email address
          let senderUser = await userModel.findOne({ email: fromEmail });

          // Check if the sender is the logged-in user (or the recipient)
          if (senderUser) {
            // Save the emailObject to the sentMails array
            senderUser.sentMails.push(emailObject);
            senderUser.save();
          }

          // Check if there are multiple recipients in mail
          for (const element of emailObject.to) {
            const recipientEmail = element.trim(); // Delete trailing spaces if any

            // Find the recipient user by their email address
            let recipientUser = await userModel.findOne({
              email: recipientEmail
            });

            if (recipientUser) {
              // Save the emailObject to the receivedMails array of the recipient user
              recipientUser.receivedMails.push(emailObject);
              recipientUser.save();
            }
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
