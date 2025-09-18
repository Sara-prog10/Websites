import React from 'react';
import NotificationItem from '../components/NotificationItem';
import { MOCK_NOTIFICATIONS } from '../constants';
import { Bell } from 'lucide-react';

const NotificationsPage: React.FC = () => {
    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <Bell size={32} className="text-accent" />
                <h1 className="text-3xl font-bold">Notifications</h1>
            </div>
            
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col gap-4">
                    {MOCK_NOTIFICATIONS.length > 0 ? (
                        MOCK_NOTIFICATIONS.map(notification => (
                            <NotificationItem key={notification.id} notification={notification} />
                        ))
                    ) : (
                        <div className="text-center py-12 bg-secondary rounded-lg">
                            <p className="text-text-secondary">You have no new notifications.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationsPage;
