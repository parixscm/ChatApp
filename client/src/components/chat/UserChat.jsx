import { Stack } from "react-bootstrap";
import avatar from "../../assets/avatar.svg";
import useFetchReceiverUser from "../../hooks/useFetchReceiverUser";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

function UserChat({ user, chat }) {
  const { onlineUsers } = useContext(ChatContext);
  const { receiverUser } = useFetchReceiverUser(user, chat);

  const isOnline = onlineUsers?.some(
    onlineUser => onlineUser.userId === receiverUser?._id
  );

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
        <span className={isOnline ? "user-online" : ""}></span>
      </div>
    </Stack>
  );
}

export default UserChat;
