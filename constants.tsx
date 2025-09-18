import React from 'react';
import { LayoutDashboard, Power, BarChart2, Bell, Settings, Lightbulb, Snowflake, Fan, RadioTower, Plug, AlertTriangle, Info, XCircle } from 'lucide-react';
import { Device, DeviceType, Notification, NotificationType } from './types';

export const NAV_LINKS = [
  { name: 'Dashboard', path: '/', icon: <LayoutDashboard /> },
  { name: 'Devices', path: '/devices', icon: <Power /> },
  { name: 'Analytics', path: '/analytics', icon: <BarChart2 /> },
  { name: 'Notifications', path: '/notifications', icon: <Bell /> },
  { name: 'Settings', path: '/settings', icon: <Settings /> },
];

export const DEVICE_ICONS: Record<DeviceType, React.ReactElement> = {
  [DeviceType.Light]: <Lightbulb className="w-full h-full text-yellow-400" />,
  [DeviceType.AC]: <Snowflake className="w-full h-full text-blue-400" />,
  [DeviceType.Fan]: <Fan className="w-full h-full text-gray-400" />,
  [DeviceType.Sensor]: <RadioTower className="w-full h-full text-green-400" />,
  [DeviceType.SmartPlug]: <Plug className="w-full h-full text-purple-400" />,
};

export const NOTIFICATION_ICONS: Record<NotificationType, React.ReactElement> = {
  [NotificationType.Warning]: <AlertTriangle className="w-full h-full text-warning" />,
  [NotificationType.Info]: <Info className="w-full h-full text-accent" />,
  [NotificationType.Error]: <XCircle className="w-full h-full text-danger" />,
};

export const MOCK_DEVICES: Device[] = [
  { id: '1', name: 'Living Room Light', type: DeviceType.Light, status: 'Online', value: true },
  { id: '2', name: 'Main AC', type: DeviceType.AC, status: 'Online', value: 22 },
  { id: '3', name: 'Bedroom Fan', type: DeviceType.Fan, status: 'Offline', value: false },
  { id: '4', name: 'Balcony Temp Sensor', type: DeviceType.Sensor, status: 'Online', value: 28.5 },
  { id: '5', name: 'Kitchen Smart Plug', type: DeviceType.SmartPlug, status: 'Online', value: false },
  { id: '6', name: 'Study Lamp', type: DeviceType.Light, status: 'Online', value: false },
  { id: '7', name: 'Guest Room AC', type: DeviceType.AC, status: 'Offline', value: 24 },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
    { id: '1', type: NotificationType.Warning, title: 'High Energy Usage', message: 'Your main AC has been running for over 8 hours straight.', timestamp: '15m ago' },
    { id: '2', type: NotificationType.Info, title: 'Device Offline', message: 'Bedroom Fan has gone offline. Please check its connection.', timestamp: '1h ago' },
    { id: '3', type: NotificationType.Error, title: 'Sensor Malfunction', message: 'Balcony temperature sensor is reporting unusual values.', timestamp: '2h ago' },
    { id: '4', type: NotificationType.Info, title: 'Firmware Update', message: 'A new firmware is available for your Kitchen Smart Plug.', timestamp: '1d ago' },
];

export const MOCK_TEMP_DATA = [
  { name: '00:00', temp: 24 },
  { name: '03:00', temp: 23.5 },
  { name: '06:00', temp: 23 },
  { name: '09:00', temp: 25 },
  { name: '12:00', temp: 28 },
  { name: '15:00', temp: 29 },
  { name: '18:00', temp: 27 },
  { name: '21:00', temp: 25.5 },
];

export const MOCK_HUMIDITY_DATA = [
    { name: '00:00', humidity: 60 },
    { name: '03:00', humidity: 62 },
    { name: '06:00', humidity: 65 },
    { name: '09:00', humidity: 58 },
    { name: '12:00', humidity: 50 },
    { name: '15:00', humidity: 48 },
    { name: '18:00', humidity: 55 },
    { name: '21:00', humidity: 59 },
];

export const MOCK_ENERGY_DATA = [
  { name: 'Mon', usage: 15 },
  { name: 'Tue', usage: 18 },
  { name: 'Wed', usage: 17 },
  { name: 'Thu', usage: 20 },
  { name: 'Fri', usage: 22 },
  { name: 'Sat', usage: 25 },
  { name: 'Sun', usage: 23 },
];
