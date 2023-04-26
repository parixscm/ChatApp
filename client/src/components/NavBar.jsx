import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function NavBar() {
  const { user, signoutUser } = useContext(AuthContext);

  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "5rem" }}>
      <Container>
        <h2>
          <Link
            to="/"
            className="link-light text-decoration-none"
            style={{ fontFamily: "Vina Sans" }}
          >
            MasonTALK
          </Link>
        </h2>
        {user && (
          <span className="text-warning">{user?.name}님, 환영합니다 🎉</span>
        )}

        <Nav>
          <Stack direction="horizontal" gap={3}>
            {user && (
              <Link
                to="/signin"
                onClick={signoutUser}
                className="link-light text-decoration-none"
              >
                로그아웃
              </Link>
            )}
            {!user && (
              <>
                <Link to="/signin" className="link-light text-decoration-none">
                  로그인
                </Link>
                <Link to="/signup" className="link-light text-decoration-none">
                  회원가입
                </Link>
              </>
            )}
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
