import React from 'react';
import type { Notification } from '../types';
import { NOTIFICATION_ICONS } from '../constants';

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  return (
    <div className="flex items-start gap-4 p-4 bg-secondary rounded-lg shadow">
      <div className="w-6 h-6 mt-1">
        {NOTIFICATION_ICONS[notification.type]}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-text-primary">{notification.title}</h4>
          <span className="text-xs text-text-secondary">{notification.timestamp}</span>
        </div>
        <p className="text-sm text-text-secondary mt-1">{notification.message}</p>
      </div>
    </div>
  );
};

export default NotificationItem;
