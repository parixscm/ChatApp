import { useEffect, useState } from "react";
import { BASE_URL, getRequest } from "../utils/services";

function useFetchReceiverUser(user, chat) {
  const [receiverUser, setReceiverUser] = useState(null);
  const [error, setError] = useState(null);

  const receiverId = chat?.members?.find(id => id !== user?._id);

  useEffect(() => {
    const getUser = async () => {
      if (!receiverId) return null;

      const response = await getRequest(`${BASE_URL}/users/find/${receiverId}`);

      // 에러가 발생한 경우
      if (response.error) {
        setError(response);
      }

      setReceiverUser(response);
    };
    getUser();
  }, [receiverId]);

  return { receiverUser };
}

export default useFetchReceiverUser;
