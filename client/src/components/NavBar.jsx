import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "5rem" }}>
      <Container>
        <h2>
          <Link to="/" className="link-light text-decoration-none">
            MasonTALK
          </Link>
        </h2>
        <span className="text-warning">OOO님, 환영합니다!</span>
        <Nav>
          <Stack direction="horizontal" gap={3}>
            <Link to="/signin" className="link-light text-decoration-none">
              로그인
            </Link>
            <Link to="/signup" className="link-light text-decoration-none">
              회원가입
            </Link>
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
