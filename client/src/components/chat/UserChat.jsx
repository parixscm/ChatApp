import { Stack } from "react-bootstrap";
import avatar from "../../assets/avatar.svg";
import useFetchReceiverUser from "../../hooks/useFetchReceiverUser";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import useFetchLatestMessage from "../../hooks/useFetchLatestMessage";
import moment from "moment";

function UserChat({ user, chat }) {
  const { onlineUsers, notifications, markNotificationAsRead } =
    useContext(ChatContext);
  const { receiverUser } = useFetchReceiverUser(user, chat);
  const { latestMessage } = useFetchLatestMessage(chat);

  const notificationsPerUser = notifications?.filter(
    notification => notification.senderId === receiverUser?._id
  );

  const isOnline = onlineUsers?.some(
    onlineUser => onlineUser.userId === receiverUser?._id
  );

  const truncateMessage = text => {
    let shortText = text.substring(0, 30);
    if (text.length > 20) {
      shortText += "...";
    }

    return shortText;
  };

  return (
    <Stack
      gap={3}
      role="button"
      direction="horizontal"
      onClick={() => markNotificationAsRead({ senderId: receiverUser?._id })}
      className="user-card align-items-center p-2 justify-content-between"
    >
      <div className="d-flex">
        <div className="me-2" style={{ color: "black" }}>
          <img src={avatar} height="35px" />
        </div>
        <div className="text-content">
          <div className="name" style={{ color: "black" }}>
            {receiverUser?.name}
          </div>
          <div className="text">
            {latestMessage?.text && (
              <span>{truncateMessage(latestMessage.text)}</span>
            )}
          </div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">
          {moment(latestMessage?.createdAt).calendar()}
        </div>
        <div
          className={
            notificationsPerUser?.length > 0 ? "this-user-notifications" : ""
          }
        >
          {notificationsPerUser?.length > 0 && notificationsPerUser.length}
        </div>
        <span className={isOnline ? "user-online" : ""}></span>
      </div>
    </Stack>
  );
}

export default UserChat;
