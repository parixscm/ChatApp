const chatModel = require("../Models/ChatModel");

// ✅ 채팅 생성
const createChat = async (req, res) => {
  try {
    const { firstId, secondId } = req.body;
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    // 👉🏻 이미 채팅이 존재하는 경우
    if (chat) return res.stats(200).json(chat);

    // 👉🏻 채팅 생성
    const newChat = new chatModel({
      members: [firstId, secondId],
    });
    const response = await newChat.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// ✅ (로그인한 유저의) 모든 채팅 목록 불러오기
const findChats = async (req, res) => {
  try {
    const { userId } = req.params;
    const chats = await chatModel.find({
      members: { $in: [userId] },
    });
    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// ✅ (로그인한 유저의) 특정(1개) 채팅 목록 불러오기
const findChat = async (req, res) => {
  try {
    const { firstId, secondId } = req.params;
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { createChat, findChats, findChat };
