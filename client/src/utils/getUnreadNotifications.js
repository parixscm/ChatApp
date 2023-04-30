export const getUnreadNotifications = notifications => {
  const unreadNotifications = notifications.filter(
    notification => notification.isRead === false
  );
  return unreadNotifications;
};
