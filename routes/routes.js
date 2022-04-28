const userController = require("../controllers/users.controller");
const agencyClientController = require("../controllers/agency.client.controller"); 
const express = require("express");
const router = express.Router();

// users
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/user-profile", userController.userProfile);

//agency and client
router.post("/agency-client", agencyClientController.createAgencyWithClient);
router.put("/client/:id", agencyClientController.clientUpdate);
// router.get("/agency/:id", agencyClientController.findOne);
router.get("/agency", agencyClientController.findAll);

module.exports = router;