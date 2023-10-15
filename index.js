require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes/routes");
const smtpServer = require("./controller/smtpController");
const cookieParser = require("cookie-parser");

const smtpPort = process.env.smtpPort || 25;
const port = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true
  })
);
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin: https://gmail-clone-fe--lambent-cascaron-86ce02.netlify.app, http://localhost:5173"
  );
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials: true");
  res.header("Access-Control-Allow-Headers: Content-Type, *");
  next();
});
app.use(cookieParser());
app.use("/", routes);

smtpServer.listen(smtpPort, () => {
  console.log(`SMTP server is listening on ${smtpPort}`);
});
app.listen(port, () => {
  `App is running on ${port}`;
});
