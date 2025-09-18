import React from 'react';
import AnalyticsChart from '../components/AnalyticsChart';
import { MOCK_TEMP_DATA, MOCK_HUMIDITY_DATA, MOCK_ENERGY_DATA } from '../constants';
import { BarChart2 } from 'lucide-react';

const AnalyticsPage: React.FC = () => {
    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <BarChart2 size={32} className="text-accent" />
                <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <AnalyticsChart 
                    data={MOCK_TEMP_DATA}
                    title="Temperature Overview (Last 24h)"
                    dataKey="temp"
                    unit="°C"
                    color="#38bdf8" // accent color
                />
                <AnalyticsChart 
                    data={MOCK_HUMIDITY_DATA}
                    title="Humidity Overview (Last 24h)"
                    dataKey="humidity"
                    unit="%"
                    color="#4ade80" // success color
                />
                <div className="xl:col-span-2">
                    <AnalyticsChart 
                        data={MOCK_ENERGY_DATA}
                        title="Weekly Energy Consumption"
                        dataKey="usage"
                        unit=" kWh"
                        color="#facc15" // warning color
                    />
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
