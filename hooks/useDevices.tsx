import React, { createContext, useState, useCallback, useContext, ReactNode } from 'react';
import { MOCK_DEVICES } from '../constants';
import type { Device } from '../types';

interface DeviceContextType {
  devices: Device[];
  handleToggle: (id: string, value: boolean) => void;
  handleValueChange: (id: string, value: number) => void;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const DeviceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [devices, setDevices] = useState<Device[]>(MOCK_DEVICES);

  const handleToggle = useCallback((id: string, value: boolean) => {
    setDevices(prevDevices =>
      prevDevices.map(device =>
        device.id === id ? { ...device, value } : device
      )
    );
  }, []);

  const handleValueChange = useCallback((id: string, value: number) => {
    setDevices(prevDevices =>
      prevDevices.map(device =>
        device.id === id ? { ...device, value } : device
      )
    );
  }, []);

  return (
    <DeviceContext.Provider value={{ devices, handleToggle, handleValueChange }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevices = () => {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error('useDevices must be used within a DeviceProvider');
  }
  return context;
};
