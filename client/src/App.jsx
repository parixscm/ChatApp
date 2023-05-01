import { Routes, Route, Navigate } from "react-router-dom";
import { Chat, Signup, Signin } from "./pages";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "./components";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import ChatContextProvider from "./context/ChatContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <ChatContextProvider user={user}>
      <NavBar />
      <Container>
        <Routes>
          <Route
            path="/"
            element={user ? <Chat /> : <Navigate to="/signin" replace={true} />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" replace={true} />}
          />
          <Route
            path="/signin"
            element={!user ? <Signin /> : <Navigate to="/" replace={true} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </ChatContextProvider>
  );
}

export default App;
