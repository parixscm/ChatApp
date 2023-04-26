import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

function Chat() {
  const { userChats, userChatsError, isUserChatsLoading } =
    useContext(ChatContext);

  console.log(userChats);
  return <h1>{userChats[0]?.createdAt}</h1>;
}

export default Chat;
