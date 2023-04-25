const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

// ✅ 토큰 생성
const createToken = _id => {
  const JWT_KEY = process.env.JWT_SECRET_KEY;
  return jwt.sign({ _id }, JWT_KEY, { expiresIn: "3d" });
};

// ✅ 회원가입
const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 👉🏻 DB에 동일한 이메일이 존재하는 경우
    let user = await userModel.findOne({ email });
    if (user) return res.status(400).json("동일한 이메일 계정이 존재합니다.");

    // 👉🏻 입력해야 하는 계정 정보가 누락된 경우
    if (!name || !email || !password)
      return res.status(400).json("올바른 정보를 입력해주세요.");

    // 👉🏻 이메일 유효성 검사
    if (!validator.isEmail(email))
      return res.status(400).json("이메일 형식이 올바르지 않습니다.");

    // 👉🏻 비밀번호 유효성 검사
    if (!validator.isStrongPassword(password))
      return res
        .status(400)
        .json(
          "비밀번호는 숫자/특수문자/소문자 알파벳/최소 1개의 대문자 알파벳을 포함해야 합니다."
        );

    // 👉🏻 회원가입 진행
    user = new userModel({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = createToken(user._id);
    res.status(200).json({ _id: user._id, name, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// ✅ 로그인
const signinUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });

    // 👉🏻 DB에 유저 정보가 없는 경우
    if (!user)
      return res.status(400).json("이메일 혹은 비밀번호를 확인해주세요.");

    // 👉🏻 비밀번호 일치 여부 확인
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).json("이메일 혹은 비밀번호를 확인해주세요");

    // 👉🏻 로그인 진행
    const token = createToken(user._id);
    res.status(200).json({ _id: user._id, name: user.name, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// ✅ 특정 유저 찾기
const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userModel
      .findById(userId)
      .select(["_id", "name", "email"]);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// ✅ 모든 유저 찾기
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find().select(["_id", "name", "email"]);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { signupUser, signinUser, getUser, getUsers };
