const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
  },
});
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");
require("dotenv").config();

// 미들웨어
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

const PORT = process.env.PORT || 3333;
const URI = process.env.ATLAS_URI;

let onlineUsers = [];

// 소켓 연결
io.on("connection", socket => {
  console.log("new connection", socket.id);

  // ✅ 유저 연결
  socket.on("addNewUser", userId => {
    !onlineUsers.some(user => user.userId === userId) &&
      onlineUsers.push({ userId, socketId: socket.id });

    io.emit("getOnlineUsers", onlineUsers);
  });

  // ✅ 메시지 추가
  socket.on("sendMessage", message => {
    // 메시지를 받는 사람 찾기
    const user = onlineUsers.find(
      onlineUser => onlineUser.userId === message.receiverId
    );

    if (user) {
      io.to(user.socketId).emit("getMessage", message);
      io.to(user.socketId).emit("getNotification", {
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      });
    }
  });

  // ✅ 유저 연결 종료
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB 연결 완료"))
  .catch(error => console.log("MongoDB 연결 실패", error.message));

server.listen(PORT, (req, res) => console.log(`${PORT} 포트에서 서버 실행중`));
