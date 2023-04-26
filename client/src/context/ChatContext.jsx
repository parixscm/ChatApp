import { createContext, useEffect, useState } from "react";
import { BASE_URL, getRequest } from "../utils/services";

export const ChatContext = createContext();

function ChatContextProvider({ children, user }) {
  const [userChats, setUserChats] = useState(null);
  const [userChatsError, setUserChatsError] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);

  useEffect(() => {
    // 렌더링 되고 나서 로그인한 유저의 채팅 목록을 불러옴
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);

        const response = await getRequest(`${BASE_URL}/chats/${user._id}`);

        setIsUserChatsLoading(false);

        // 에러 발생한 경우
        if (response.error) {
          setUserChatsError(response);
          return;
        }

        setUserChats(response);
      }
    };
    getUserChats();
  }, [user]);

  return (
    <ChatContext.Provider
      value={{ userChats, userChatsError, isUserChatsLoading }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export default ChatContextProvider;
