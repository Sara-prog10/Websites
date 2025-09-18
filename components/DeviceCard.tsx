import React from 'react';
import type { Device } from '../types';
import { DeviceType } from '../types';
import { DEVICE_ICONS } from '../constants';

interface DeviceCardProps {
  device: Device;
  onToggle: (id: string, value: boolean) => void;
  onValueChange: (id: string, value: number) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onToggle, onValueChange }) => {
  const isOnline = device.status === 'Online';
  const isToggleable = device.type === DeviceType.Light || device.type === DeviceType.Fan || device.type === DeviceType.SmartPlug;

  return (
    <div className={`bg-secondary p-6 rounded-xl shadow-lg transition-all duration-300 ${!isOnline ? 'opacity-50' : 'hover:shadow-accent/20'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10">{DEVICE_ICONS[device.type]}</div>
          <div>
            <h3 className="font-bold text-text-primary">{device.name}</h3>
            <span className={`inline-block mt-1 text-xs font-semibold px-2 py-1 rounded-full ${isOnline ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'}`}>
              {device.status}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        {isToggleable && (
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">State</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={!!device.value}
                disabled={!isOnline}
                onChange={(e) => onToggle(device.id, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-highlight rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
            </label>
          </div>
        )}

        {device.type === DeviceType.AC && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-text-secondary">Temperature</span>
              <span className="font-bold text-accent">{device.value}°C</span>
            </div>
            <input
              type="range"
              min="16"
              max="30"
              value={device.value as number}
              disabled={!isOnline}
              onChange={(e) => onValueChange(device.id, parseInt(e.target.value))}
              className="w-full h-2 bg-highlight rounded-lg cursor-pointer accent-accent"
            />
          </div>
        )}

        {device.type === DeviceType.Sensor && (
          <div className="text-center">
            <p className="text-4xl font-bold text-accent">{device.value}°C</p>
            <p className="text-text-secondary">Current Reading</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceCard;