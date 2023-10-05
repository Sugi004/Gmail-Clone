require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes/routes");
const smtpServer = require("./controller/smtpController");
const port = process.env.port || 8000;
const smtpPort = process.env.smtpPort || 25;

app.use(express.json());
app.use(cors());

app.use("/", routes);

smtpServer.listen(smtpPort, () => {
  console.log(`SMTP server is listening on ${smtpPort}`);
});
app.listen(port, () => console.log(`App is running on ${port}`));
