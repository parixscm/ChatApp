import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";

function Signup() {
  return (
    <>
      <Form>
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
              <Form.Control type="text" placeholder="이름" />
              <Form.Control type="email" placeholder="이메일" />
              <Form.Control type="password" placeholder="비밀번호" />
              <Button variant="secondary" type="submit">
                가입하기
              </Button>
              <Alert variant="danger">
                <p>에러가 발생했습니다.</p>
              </Alert>
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
}
export default Signup;
