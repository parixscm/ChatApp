import { Stack } from "react-bootstrap";
import avatar from "../../assets/avatar.svg";
import useFetchReceiverUser from "../../hooks/useFetchReceiverUser";

function UserChat({ user, chat }) {
  const { receiverUser } = useFetchReceiverUser(user, chat);

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
    >
      <div className="d-flex">
        <div className="me-2" style={{ color: "black" }}>
          <img src={avatar} height="35px" />
        </div>
        sfsdf
        <div className="text-content">
          <div className="name" style={{ color: "black" }}>
            {receiverUser?.name}
          </div>
          <div className="text">TEXT MESSAGE</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">2023/4/25</div>
        <div className="this-user-notifications">7</div>
        <span className="user-online"></span>
      </div>
    </Stack>
  );
}

export default UserChat;
