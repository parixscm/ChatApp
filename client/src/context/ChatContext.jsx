import { createContext, useCallback, useEffect, useState } from "react";
import { BASE_URL, getRequest, postRequest } from "../utils/services";

export const ChatContext = createContext();

function ChatContextProvider({ children, user }) {
  const [userChats, setUserChats] = useState(null);
  const [userChatsError, setUserChatsError] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  // 아직 채팅을 시작하지 않은 유저 목록
  const [potentialUsers, setPotentialUsers] = useState([]);

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(
      `${BASE_URL}/chats`,
      JSON.stringify({ firstId, secondId })
    );

    if (response.error) {
      console.log("Error creating a new chat", response);
    }

    setUserChats(prev => [response, ...prev]);
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      // 모든 유저 목록 불러오기
      const response = await getRequest(`${BASE_URL}/users`);

      // 에러가 발생한 경우
      if (response.error) {
        console.log("fetching users", response);
        return;
      }

      // 아직 채팅을 시작하지 않은 유저 필터링
      const pUsers = response.filter(pUser => {
        if (user?._id === pUser._id) return false;

        let isChatCreated = false;
        if (userChats) {
          isChatCreated = userChats?.some(
            chat =>
              chat.members[0] === pUser._id || chat.members[1] === pUser._id
          );
        }

        return !isChatCreated;
      });

      setPotentialUsers(pUsers);
    };
    getUsers();
  }, [userChats, user?._id]);

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
      value={{
        userChats,
        userChatsError,
        isUserChatsLoading,
        potentialUsers,
        createChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export default ChatContextProvider;
