import React from 'react';
import DeviceCard from '../components/DeviceCard';
import { useDevices } from '../hooks/useDevices';

const DevicesPage: React.FC = () => {
    const { devices, handleToggle, handleValueChange } = useDevices();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Devices</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {devices.map(device => (
                    <DeviceCard 
                        key={device.id} 
                        device={device} 
                        onToggle={handleToggle} 
                        onValueChange={handleValueChange}
                    />
                ))}
            </div>
        </div>
    );
};

export default DevicesPage;