import React from 'react';
import { useAuth } from '../hooks/useAuth';
import StatCard from '../components/StatCard';
import { MOCK_NOTIFICATIONS } from '../constants';
import { Lightbulb, Thermometer, Zap, Bell } from 'lucide-react';
import DeviceCard from '../components/DeviceCard';
import NotificationItem from '../components/NotificationItem';
import { Link } from 'react-router-dom';
import { useDevices } from '../hooks/useDevices';

const DashboardPage: React.FC = () => {
    const { user } = useAuth();
    const { devices, handleToggle, handleValueChange } = useDevices();

    const onlineDevices = devices.filter(d => d.status === 'Online').length;
    const powerConsumption = devices.reduce((acc, device) => {
        if (device.status === 'Online' && (device.type === 'Light' || device.type === 'SmartPlug') && device.value) {
            return acc + 60; // Mock value: 60W per light/plug
        }
        if (device.status === 'Online' && device.type === 'AC') {
            return acc + 1500; // Mock value: 1500W for AC
        }
        return acc;
    }, 0);
    const avgTemp = devices.find(d => d.type === 'Sensor')?.value || 28;
    const newNotifications = MOCK_NOTIFICATIONS.length;

    return (
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Welcome back, {user?.displayName || 'User'}!</h1>
            <p className="text-text-secondary mb-8">Here's a quick overview of your smart home.</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard 
                    icon={<Lightbulb />} 
                    title="Online Devices" 
                    value={String(onlineDevices)} 
                    unit={`/ ${devices.length}`}
                    colorClass="bg-success"
                />
                <StatCard 
                    icon={<Zap />} 
                    title="Power Usage" 
                    value={(powerConsumption / 1000).toFixed(2)} 
                    unit="kW"
                    colorClass="bg-warning"
                />
                <StatCard 
                    icon={<Thermometer />} 
                    title="Avg. Temperature" 
                    value={String(avgTemp)} 
                    unit="°C"
                    colorClass="bg-accent"
                />
                <StatCard 
                    icon={<Bell />} 
                    title="New Alerts" 
                    value={String(newNotifications)} 
                    unit="today"
                    colorClass="bg-danger"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Quick Access Devices */}
                <div className="lg:col-span-2 bg-secondary p-6 rounded-xl shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Quick Access</h2>
                        <Link to="/devices" className="text-accent hover:underline">View All</Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {devices.slice(0, 4).map(device => (
                            <DeviceCard 
                                key={device.id}
                                device={device}
                                onToggle={handleToggle}
                                onValueChange={handleValueChange}
                            />
                        ))}
                    </div>
                </div>

                {/* Recent Notifications */}
                <div className="bg-secondary p-6 rounded-xl shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Recent Alerts</h2>
                        <Link to="/notifications" className="text-accent hover:underline">View All</Link>
                    </div>
                    <div className="flex flex-col gap-4">
                        {MOCK_NOTIFICATIONS.slice(0, 3).map(notif => (
                            <NotificationItem key={notif.id} notification={notif} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;