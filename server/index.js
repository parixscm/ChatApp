const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute");
require("dotenv").config();

const app = express();

// 미들웨어
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);

const PORT = process.env.PORT || 3333;
const URI = process.env.ATLAS_URI;

app.listen(PORT, (req, res) => console.log(`${PORT} 포트에서 서버 실행중`));

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB 연결 완료"))
  .catch(error => console.log("MongoDB 연결 실패", error.message));
