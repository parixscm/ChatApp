import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import useFetchReceiverUser from "../hooks/useFetchReceiverUser";
import BeatLoader from "react-spinners/BeatLoader";
import { Stack } from "react-bootstrap";
import moment from "moment";

function ChatBox() {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, messagesError, isMessagesLoading } =
    useContext(ChatContext);
  const { receiverUser } = useFetchReceiverUser(user, currentChat);

  if (!receiverUser || messages.length === 0)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        대화 내용이 존재하지 않습니다. 대화를 시작해보세요!
      </p>
    );

  if (isMessagesLoading) return <BeatLoader size={7} speedMultiplier={0.9} />;

  return (
    <Stack gap={4} className="chat-box">
      <div className="chat-header">
        <strong>{receiverUser?.name}</strong>
      </div>
      <Stack gap={3} className="messages">
        {messages &&
          messages.map((message, idx) => (
            <Stack
              key={idx}
              className={`${
                message.senderId === user?._id
                  ? "message self align-self-end flex-grow-0"
                  : "message align-self-start flex-grow-0"
              }`}
            >
              <span>{message.text}</span>
              <span className="message-footer">
                {moment(message.createdAt).calendar()}
              </span>
            </Stack>
          ))}
      </Stack>
    </Stack>
  );
}

export default ChatBox;
