require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes/routes");
const smtpServer = require("./controller/smtpController");
const cookieParser = require("cookie-parser");

const smtpPort = process.env.smtpPort || 25;
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://gmail-clone-fe--lambent-cascaron-86ce02.netlify.app"
//     ],
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
//     preflightContinue: true,
//     accessControlMaxAge: 7200,
//     accessControlAllowHeaders: "Content-Type, *",
//     credentials: true
//   })
// );

app.use("/", routes);

smtpServer.listen(smtpPort, () => {
  console.log(`SMTP server is listening on ${smtpPort}`);
});
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
