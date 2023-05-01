import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import BeatLoader from "react-spinners/BeatLoader";
import PotentialUsers from "../components/chat/PotentialUsers";
import ChatBox from "../components/ChatBox";

function Chat() {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, setCurrentChat } =
    useContext(ChatContext);

  return (
    <Container>
      <PotentialUsers />
      {userChats?.length < 1 ? null : (
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className="flex-grow-0 messages-box pe-3" gap={3}>
            {isUserChatsLoading && (
              <BeatLoader size={7} speedMultiplier={0.9} />
            )}
            {userChats?.map((chat, idx) => (
              <div key={idx} onClick={() => setCurrentChat(chat)}>
                <UserChat user={user} chat={chat} />
              </div>
            ))}
          </Stack>

          <ChatBox />
        </Stack>
      )}
    </Container>
  );
}

export default Chat;
