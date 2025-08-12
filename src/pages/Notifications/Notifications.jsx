import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoIosNotificationsOutline } from "react-icons/io";
import PageHeading from "../../Components/Shared/PageHeading";

const notificationsData = [
  {
    id: "1",
    type: "user_joined",
    title: "New User Joined",
    description: "Emily Johnson has joined the platform.",
    date: "2025-04-24",
    time: "09:20 AM",
    avatar: "https://avatar.iran.liara.run/public/11",
  },
  {
    id: "2",
    type: "listing_request",
    title: "New Listing Request",
    description: 'Michael Brown submitted a new listing: "Downtown Event Space"',
    date: "2024-12-14",
    time: "08:00 AM",
    avatar: "https://avatar.iran.liara.run/public/12",
  },
  {
    id: "3",
    type: "listing_request",
    title: "New Listing Request",
    description: 'Anna Lee submitted a new listing: "Cozy Book Café"',
    date: "2024-12-14",
    time: "08:00 AM",
    avatar: "https://avatar.iran.liara.run/public/13",
  },
  {
    id: "4",
    type: "user_joined",
    title: "New User Joined",
    description: "David Wilson has joined the platform.",
    date: "2025-04-23",
    time: "02:15 PM",
    avatar: "https://avatar.iran.liara.run/public/14",
  },
  {
    id: "5",
    type: "listing_approved",
    title: "Listing Approved",
    description: 'Your listing "Modern Office Space" has been approved.',
    date: "2025-04-22",
    time: "11:30 AM",
    avatar: "https://avatar.iran.liara.run/public/15",
  },
  {
    id: "6",
    type: "payment_received",
    title: "Payment Received",
    description: "Payment of $250 received from subscription renewal.",
    date: "2025-04-21",
    time: "04:45 PM",
    avatar: "https://avatar.iran.liara.run/public/16",
  },
];

function Notifications() {
  const [notifications, setNotifications] = useState(notificationsData);

  const handleDismiss = (notificationId) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
  };

  const handleMarkAllAsRead = () => {
    setNotifications([]);
  };

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <PageHeading title="Notifications" />
        {notifications.length > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="bg-[#00823b] !text-white font-semibold py-2 px-4 rounded-lg"
          >
            Mark All as Read
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        {notifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="relative p-6 hover:bg-gray-50 transition-colors"
              >
                <button
                  onClick={() => handleDismiss(notification.id)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
                  aria-label="Dismiss notification"
                >
                  <RxCross2 className="w-5 h-5 text-gray-400 hover:text-red-500" />
                </button>

                <div className="flex gap-4 pr-8">
                  <div className="flex-shrink-0">
                    <img
                      src={notification.avatar}
                      alt={notification.title}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {notification.title}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        notification.type === 'user_joined' 
                          ? 'bg-blue-100 text-blue-800'
                          : notification.type === 'listing_request'
                          ? 'bg-yellow-100 text-yellow-800'
                          : notification.type === 'listing_approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {notification.type.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-2">{notification.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{notification.date}</span>
                      <span>{notification.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <IoIosNotificationsOutline className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-500">You're all caught up! Check back later for new notifications.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
