import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import useFetchReceiverUser from "../hooks/useFetchReceiverUser";
import BeatLoader from "react-spinners/BeatLoader";
import { Stack } from "react-bootstrap";
import moment from "moment";

function ChatBox() {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, sendMessage } =
    useContext(ChatContext);
  const { receiverUser } = useFetchReceiverUser(user, currentChat);
  const [textMessage, setTextMessage] = useState("");
  const scrollRef = useRef();

  const handleSendMessage = () => {
    sendMessage(currentChat._id, user._id, textMessage);
    setTextMessage("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // if (!receiverUser || messages.length === 0)
  if (!receiverUser)
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
              ref={scrollRef}
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
      <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
        <input
          type="text"
          value={textMessage}
          onKeyDown={event =>
            event.key === "Enter" &&
            event.nativeEvent.isComposing === false &&
            handleSendMessage()
          }
          onChange={event => setTextMessage(event.target.value)}
          placeholder="메시지를 입력하세요!"
          className="message-input"
        />
        <button onClick={handleSendMessage} className="send-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-send-fill"
            viewBox="0 0 16 16"
          >
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
          </svg>
        </button>
      </Stack>
    </Stack>
  );
}

export default ChatBox;
