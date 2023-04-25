import { createContext, useCallback, useEffect, useState } from "react";
import { BASE_URL, postRequest } from "../utils/services";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
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

  // signupUser 함수 때문에 user가 업데이트 되면 다시 실행되면서 로컬스토리지에서 값을 불러옴
  useEffect(() => {
    const user = localStorage.getItem("User");
    setUser(JSON.parse(user));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signupUser,
        signupError,
        isSignupLoading,
        signupInfo,
        setSignupInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
