import { Routes, Route, Navigate } from "react-router-dom";
import { Chat, Signup, Signin } from "./pages";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "./components";

function App() {
  return (
    <>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
