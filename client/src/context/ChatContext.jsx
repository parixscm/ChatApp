import { createContext, useCallback, useEffect, useState } from "react";
import { BASE_URL, getRequest, postRequest } from "../utils/services";

export const ChatContext = createContext();

function ChatContextProvider({ children, user }) {
  const [userChats, setUserChats] = useState(null);
  const [userChatsError, setUserChatsError] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  // 아직 채팅을 시작하지 않은 유저의 목록
  const [potentialUsers, setPotentialUsers] = useState([]);
  // 클릭한 채팅(해당 채팅에 대한 메시지 view)
  const [currentChat, setCurrentChat] = useState(null);
  // 클릭한 채팅 메시지
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);

  // ✅ 채팅 생성
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

  // ✅ 채팅 시작하지 않은 유저 목록 불러오기
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

  // ✅ 유저 채팅 목록 불러오기
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

  // ✅ 선택한 채팅방의 메시지 내용 불러오기
  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);
      setMessagesError(null);

      const response = await getRequest(
        `${BASE_URL}/messages/${currentChat?._id}`
      );
      setIsMessagesLoading(false);

      if (response.error) {
        setMessagesError(response);
        return;
      }

      setMessages(response);
    };
    getMessages();
  }, [currentChat]);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        userChatsError,
        isUserChatsLoading,
        potentialUsers,
        createChat,
        currentChat,
        setCurrentChat,
        messages,
        messagesError,
        isMessagesLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export default ChatContextProvider;
