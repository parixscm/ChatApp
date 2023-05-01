import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import BeatLoader from "react-spinners/BeatLoader";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";

function Signup() {
  const {
    signupInfo,
    setSignupInfo,
    signupUser,
    signupError,
    isSignupLoading,
  } = useContext(AuthContext);

  return (
    <>
      <Form onSubmit={signupUser}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "10%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>회원가입</h2>
              <Form.Control
                type="text"
                value={signupInfo.name}
                placeholder="이름"
                onChange={event =>
                  setSignupInfo({ ...signupInfo, name: event.target.value })
                }
              />
              <Form.Control
                type="email"
                value={signupInfo.email}
                placeholder="이메일"
                onChange={event =>
                  setSignupInfo({ ...signupInfo, email: event.target.value })
                }
              />
              <Form.Control
                type="password"
                value={signupInfo.password}
                placeholder="비밀번호"
                onChange={event =>
                  setSignupInfo({ ...signupInfo, password: event.target.value })
                }
              />
              <Button variant="secondary" type="submit">
                {isSignupLoading ? (
                  <BeatLoader color="#f1c40f" size={7} speedMultiplier={0.9} />
                ) : (
                  "가입하기"
                )}
              </Button>
              {signupError?.error && (
                <Alert variant="danger">
                  <p>{signupError?.message}</p>
                </Alert>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
}
export default Signup;
