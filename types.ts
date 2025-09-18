
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export enum DeviceType {
  Light = 'Light',
  AC = 'AC',
  Fan = 'Fan',
  Sensor = 'Sensor',
  SmartPlug = 'SmartPlug'
}

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  status: 'Online' | 'Offline';
  value: number | boolean; // e.g., temperature for AC, true/false for light
}

export enum NotificationType {
    Warning = 'Warning',
    Info = 'Info',
    Error = 'Error'
}

export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    timestamp: string;
}
