import React, { useState } from 'react';
import { Bell, Check, X, Clock,Gavel, FileText, CalendarDays, ChevronDown } from 'lucide-react';

const NotificationView = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Case Assigned',
      message: 'You have been assigned a new case: Smith vs. Doe (Case #12453)',
      time: '2 hours ago',
      read: false,
      type: 'case'
    },
    {
      id: 2,
      title: 'Document Uploaded',
      message: 'Sarah Johnson uploaded a new document for review in Case #12453',
      time: 'Yesterday',
      read: false,
      type: 'document'
    },
    {
      id: 3,
      title: 'Upcoming Meeting',
      message: 'Client meeting with Michael Smith tomorrow at 3:00 PM',
      time: '1 day ago',
      read: true,
      type: 'meeting'
    },
    {
      id: 4,
      title: 'Court Date Reminder',
      message: 'Court appearance scheduled for April 25, 2025 at 9:30 AM',
      time: '2 days ago',
      read: true,
      type: 'court'
    },
  ]);

  const [filter, setFilter] = useState('all');

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => !n.read);

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'case': return <FileText className="w-5 h-5 text-indigo-600" />;
      case 'document': return <FileText className="w-5 h-5 text-blue-600" />;
      case 'meeting': return <CalendarDays className="w-5 h-5 text-emerald-600" />;
      case 'court': return <Gavel className="w-5 h-5 text-purple-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Notifications</h1>
              <p className="text-sm text-gray-500">
                {notifications.filter(n => !n.read).length} unread notifications
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none bg-white border rounded-lg pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
              >
                <option value="all">All Notifications</option>
                <option value="unread">Unread Only</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <button
              onClick={markAllAsRead}
              className="whitespace-nowrap px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              Mark all as read
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <Bell className="mx-auto w-10 h-10 text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-500">No notifications found</h3>
              <p className="text-sm text-gray-400 mt-1">
                {filter === 'unread' ? 'You have no unread notifications' : 'You have no notifications'}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-xl shadow-sm border-l-4 ${
                  notification.read 
                    ? 'border-transparent' 
                    : 'border-indigo-500'
                } p-4 transition-all hover:shadow-md`}
              >
                <div className="flex gap-3">
                  <div className="pt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h2 className={`text-base font-medium ${
                        notification.read ? 'text-gray-700' : 'text-gray-900'
                      }`}>
                        {notification.title}
                      </h2>
                      <div className="flex gap-2 ml-2">
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Delete notification"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className={`mt-1 ${
                      notification.read ? 'text-gray-500' : 'text-gray-700'
                    }`}>
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{notification.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationView;