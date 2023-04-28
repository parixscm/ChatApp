const { Server } = require("socket.io");

let onlineUsers = [];

const io = new Server({
  cors: ["http://localhost:5173", "http://localhost:5174"],
});

// 소켓 연결 시
io.on("connection", socket => {
  console.log("new connection", socket.id);

  // ✅ (수신) 유저 연결
  socket.on("addNewUser", userId => {
    !onlineUsers.some(user => user.userId === userId) &&
      onlineUsers.push({ userId, socketId: socket.id });

    console.log("onlineUsers: ", onlineUsers);

    io.emit("getOnlineUsers", onlineUsers);
  });

  // ✅ 메시지 추가
  socket.on("sendMessage", message => {
    const user = onlineUsers.find(
      onlineUser => onlineUser.userId === message.receiverId
    );

    if (user) {
      io.to(user.socketId).emit("getMessage", message);
    }
  });

  // ✅ (수신) 유저 연결 종료
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});

io.listen(3000);
