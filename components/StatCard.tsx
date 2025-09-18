import React from 'react';

interface StatCardProps {
  icon: React.ReactElement;
  title: string;
  value: string;
  unit: string;
  colorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, unit, colorClass }) => {
  return (
    <div className="bg-secondary p-6 rounded-xl shadow-lg flex items-center gap-6 transform hover:-translate-y-1 transition-transform duration-300">
      <div className={`p-4 rounded-full ${colorClass}`}>
        {/* FIX: Use React.createElement with Object.assign to add props to the icon. This avoids a TypeScript error with prop spreading and is more robust than React.cloneElement for generic ReactElements. */}
        {React.createElement(icon.type, Object.assign({}, icon.props, { size: 32, className: 'text-white' }))}
      </div>
      <div>
        <p className="text-text-secondary text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-text-primary">
          {value} <span className="text-lg font-normal text-text-secondary">{unit}</span>
        </p>
      </div>
    </div>
  );
};

export default StatCard;