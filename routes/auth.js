var express = require("express");
var router = express.Router();
var useController = require("../app/Controllers/AuthController");

router.post("/login", useController.login); //Validate Login Information
router.post("/token", useController.refreshToken); //Refresh Token
router.delete("/logout", useController.logout); //Delete Refresh Token

module.exports = router;