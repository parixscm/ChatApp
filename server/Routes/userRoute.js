const express = require("express");
const {
  getUsers,
  getUser,
  signupUser,
  signinUser,
} = require("../Controllers/userController");

const router = express.Router();

router.get("/", getUsers);
router.get("/find/:userId", getUser);
router.post("/signup", signupUser);
router.post("/signin", signinUser);

module.exports = router;
