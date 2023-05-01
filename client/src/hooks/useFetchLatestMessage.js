import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { BASE_URL, getRequest } from "../utils/services";

function useFetchLatestMessage(chat) {
  const [latestMessage, setLatestMessage] = useState("");
  const { messages, notifications } = useContext(ChatContext);

  useEffect(() => {
    const getMessages = async () => {
      const response = await getRequest(`${BASE_URL}/messages/${chat?._id}`);

      if (response.error) {
        console.log("Error getting messages", response.error);
      }

      setLatestMessage(response.at(-1));
    };
    getMessages();
  }, [chat, messages, notifications]);

  return { latestMessage };
}

export default useFetchLatestMessage;
