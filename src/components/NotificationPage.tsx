
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export const NotificationPage = () => {
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Module Completed!',
      message: 'Congratulations! You\'ve completed the School module and earned a key.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'New Content Available',
      message: 'Check out the updated visa requirements for 2025 in the News section.',
      time: '1 day ago',
      read: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'Deadline Reminder',
      message: 'Don\'t forget: Campus France applications for Fall 2025 are due March 15th.',
      time: '2 days ago',
      read: true
    },
    {
      id: 4,
      type: 'info',
      title: 'Community Update',
      message: 'New discussion thread: "Tips for opening a French bank account" in Community Hub.',
      time: '3 days ago',
      read: true
    },
    {
      id: 5,
      type: 'success',
      title: 'Welcome!',
      message: 'Welcome to pasS2Kampus! Start with the School module to begin your journey.',
      time: '1 week ago',
      read: true
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500 bg-green-50';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'info':
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Bell className="h-8 w-8 mr-3 text-blue-600" />
          Notifications
        </h1>
        <p className="text-lg text-gray-600">
          Stay updated with your progress and important information
        </p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </span>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            Mark All as Read
          </Button>
          <Button variant="outline" size="sm">
            Clear All
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`transition-all duration-200 hover:shadow-md ${
              !notification.read ? 'ring-2 ring-blue-200' : ''
            }`}
          >
            <CardContent className="p-0">
              <div className={`border-l-4 p-4 ${getNotificationColor(notification.type)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-gray-700 mb-2">
                        {notification.message}
                      </p>
                      <div className="text-sm text-gray-500">
                        {notification.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {!notification.read && (
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardContent className="p-6 text-center">
          <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Stay Updated
          </h3>
          <p className="text-gray-600 mb-4">
            Customize your notification preferences to get the most relevant updates.
          </p>
          <Button variant="outline">
            Notification Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
