var express = require("express");
var router = express.Router();
var useController = require("../app/Controllers/GuestController");
var auth = require("../app/Controllers/AuthController");

router.post("/lists", auth.authenticateToken, useController.getAllGuest); //Get All Guest By IdEvent
router.post("/create", auth.authenticateToken, useController.createGuest); //Create Guest
router.delete("/delete", auth.authenticateToken, useController.deleteGuest); //Delete Guest
router.put("/update", auth.authenticateToken, useController.updateGuest); //Update Guest
router.put("/rsvp", auth.authenticateToken, useController.updateGuestRSVP); //Update Guest RSVP
router.put("/attend", auth.authenticateToken, useController.updateGuestAttend); //Update Guest Attend
module.exports = router;