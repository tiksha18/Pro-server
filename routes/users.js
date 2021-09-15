const express = require("express");
const { signin, signup, verify } = require("../controllers/auth.js");
const router = express.Router();

router.post("/signin" , signin);
router.post("/signup" , signup);
router.post("/verify", verify);

module.exports = router;