import { createContext, useCallback, useEffect, useState } from "react";
import { BASE_URL, postRequest } from "../utils/services";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [signinError, setSigninError] = useState(null);
  const [isSigninLoading, setIsSigninLoading] = useState(false);
  const [signinInfo, setSigninInfo] = useState({
    email: "",
    password: "",
  });
  const [signupError, setSignupError] = useState(null);
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ✅ 회원가입
  const signupUser = useCallback(
    async event => {
      event.preventDefault();
      setIsSignupLoading(true);
      setSignupError(null);
      const response = await postRequest(
        `${BASE_URL}/users/signup`,
        JSON.stringify(signupInfo)
      );
      setIsSignupLoading(false);
      setSignupInfo({ name: "", email: "", password: "" });

      // 에러가 발생한 경우
      if (response.error) {
        setSignupError(response);
        return;
      }

      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    },
    [signupInfo]
  );

  // ✅ 로그인
  const signinUser = useCallback(
    async event => {
      event.preventDefault();
      setIsSigninLoading(true);
      setSigninError(null);
      const response = await postRequest(
        `${BASE_URL}/users/signin`,
        JSON.stringify(signinInfo)
      );
      setIsSigninLoading(false);
      setSigninInfo({ email: "", password: "" });

      // 에러가 발생한 경우
      if (response.error) {
        setSigninError(response);
        return;
      }

      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    },
    [signinInfo]
  );

  // ✅ 로그아웃
  const signoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  // signupUser 함수 때문에 user가 업데이트 되면 다시 실행되면서 로컬스토리지에서 값을 불러옴
  useEffect(() => {
    const user = localStorage.getItem("User");
    setUser(JSON.parse(user));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        // 회원가입
        signupInfo,
        setSignupInfo,
        signupUser,
        signupError,
        isSignupLoading,
        // 로그인
        signinInfo,
        setSigninInfo,
        signinUser,
        signinError,
        isSigninLoading,
        // 로그아웃
        signoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
