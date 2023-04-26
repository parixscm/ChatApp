const express = require("express");
const {
  createChat,
  findChats,
  findChat,
} = require("../Controllers/chatController");

const router = express.Router();

router.post("/", createChat);
router.get("/:userId", findChats);
router.get("/find/:firstId/:secondId", findChat);

module.exports = router;
