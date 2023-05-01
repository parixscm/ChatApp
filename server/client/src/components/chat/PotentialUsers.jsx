import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

function PotentialUsers() {
  const { user } = useContext(AuthContext);
  const { potentialUsers, createChat, onlineUsers } = useContext(ChatContext);

  return (
    <>
      <div className="all-users">
        {potentialUsers &&
          potentialUsers.map((potentialUser, idx) => (
            <div
              onClick={() => createChat(user._id, potentialUser._id)}
              key={idx}
              className="single-user"
            >
              {potentialUser.name}
              <span
                className={
                  onlineUsers?.some(
                    onlineUser => onlineUser.userId === potentialUser?._id
                  )
                    ? "user-online"
                    : ""
                }
              ></span>
            </div>
          ))}
      </div>
    </>
  );
}

export default PotentialUsers;
