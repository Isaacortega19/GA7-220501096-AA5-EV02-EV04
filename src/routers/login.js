/*
const express = require("express");
const LoginController = require("../controllers/loginController");

const router = express.Router();

router.get("/login", LoginController.login);
router.post("/login", LoginController.auth);
router.get("/registro", LoginController.registro);
router.post("/registro", LoginController.storeUser);
router.get("/logout", LoginController.logout);

module.exports = router;
*/

/*nuevo*/ 
const express = require("express");
const LoginController = require("../controllers/loginController");

const router = express.Router();
router.get("/login", LoginController.login);
router.get("/registro", LoginController.registro);
router.post("/login", LoginController.auth);
router.post("/registro", LoginController.storeUser);
router.post("/logout", LoginController.logout);

module.exports = router;
/*hasta aqui*/