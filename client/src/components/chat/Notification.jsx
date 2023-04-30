import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { getUnreadNotifications } from "../../utils/getUnreadNotifications";
import moment from "moment";

function Notification() {
  const { user } = useContext(AuthContext);
  const {
    notifications,
    userChats,
    allUsers,
    markAllNotificationsAsRead,
    markNotificationAsRead,
  } = useContext(ChatContext);
  const [isNotificationOpened, setIsNotificationOpened] = useState(false);

  const unreadNotifications = getUnreadNotifications(notifications);
  const modifiedNotifications = notifications.map(notification => {
    const sender = allUsers.find(user => user._id === notification.senderId);

    return {
      ...notification,
      senderName: sender?.name,
    };
  });

  return (
    <div className="notifications">
      <div
        onClick={() => setIsNotificationOpened(prev => !prev)}
        className="notifications-icon"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-chat-left-fill"
          viewBox="0 0 16 16"
        >
          <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
        </svg>
        {notifications?.length > 0 && (
          <span className="notification-count">
            <span>{notifications.length}</span>
          </span>
        )}
      </div>
      {isNotificationOpened && (
        <div className="notifications-box">
          <div className="notifications-header">
            <h3>알림</h3>
            <div
              onClick={() => markAllNotificationsAsRead(notifications)}
              className="mark-as-read"
            >
              모든 알림 읽음으로 표시
            </div>
          </div>
          {modifiedNotifications?.length === 0 && (
            <span className="notification">새 알림이 없습니다</span>
          )}
          {modifiedNotifications.length > 0 &&
            modifiedNotifications.map((notification, idx) => (
              <div
                key={idx}
                onClick={() => {
                  markNotificationAsRead(notification);
                  setIsNotificationOpened(prev => !prev);
                }}
                className="notification"
              >
                <span>{`${notification.senderName} 님이 새 메시지를 보냈습니다`}</span>
                <span className="notification-time">
                  {moment(notification.date).calendar()}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Notification;
