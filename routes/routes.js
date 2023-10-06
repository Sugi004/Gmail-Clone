const express = require("express");
const router = express.Router();
const mailController = require("../controller/mailController");
const userController = require("../controller/userControler");
const auth = require("../common/Auth");

router.get("/", auth.validate, userController.getData);
router.post("/send", mailController.transporter);
router.post("/create-user", userController.createUser);
router.post("/login", userController.loginUser);
router.delete("/delete/:id", mailController.deleteMailById);
module.exports = router;
