import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import BeatLoader from "react-spinners/BeatLoader";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";

function Signin() {
  const {
    signinInfo,
    setSigninInfo,
    signinUser,
    signinError,
    isSigninLoading,
  } = useContext(AuthContext);

  return (
    <>
      <Form onSubmit={signinUser}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "10%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>로그인</h2>
              <Form.Control
                type="email"
                value={signinInfo.email}
                placeholder="이메일"
                onChange={event =>
                  setSigninInfo({ ...signinInfo, email: event.target.value })
                }
              />
              <Form.Control
                type="password"
                value={signinInfo.password}
                placeholder="비밀번호"
                onChange={event =>
                  setSigninInfo({ ...signinInfo, password: event.target.value })
                }
              />
              <Button variant="secondary" type="submit">
                {isSigninLoading ? (
                  <BeatLoader color="#f1c40f" size={7} speedMultiplier={0.9} />
                ) : (
                  "시작하기"
                )}
              </Button>
              {signinError?.error && (
                <Alert variant="danger">
                  <p>{signinError?.message}</p>
                </Alert>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
}
export default Signin;
