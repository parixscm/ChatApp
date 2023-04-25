import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  console.log(signupInfo);

  return (
    <AuthContext.Provider value={{ user, signupInfo, setSignupInfo }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
