import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { Home, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const baseLinkClasses = "flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200";
  const inactiveLinkClasses = "text-text-secondary hover:bg-highlight hover:text-text-primary";
  const activeLinkClasses = "bg-accent text-primary font-bold shadow-lg";

  return (
    <>
      {/* Overlay for mobile */}
      <div 
        onClick={() => setIsOpen(false)} 
        className={`fixed inset-0 bg-black/60 z-30 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
      />

      {/* Sidebar */}
      <aside className={`fixed lg:relative z-40 h-full w-64 bg-secondary flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between p-4 border-b border-highlight h-20 flex-shrink-0">
            <div className="flex items-center gap-3">
                <Home className="text-accent" size={28}/>
                <h1 className="text-xl font-bold text-text-primary">SmartHome</h1>
            </div>
            <button onClick={() => setIsOpen(false)} className="lg:hidden text-text-secondary hover:text-text-primary">
                <X size={24} />
            </button>
        </div>
        
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul>
            {NAV_LINKS.map(link => (
              <li key={link.name} className="mb-2">
                <NavLink
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => {
                    // Special case for dashboard route to match only exactly
                    const isDashboard = link.path === '/';
                    const isCurrentActive = isDashboard ? location.pathname === '/' : isActive;
                    return `${baseLinkClasses} ${isCurrentActive ? activeLinkClasses : inactiveLinkClasses}`;
                  }}
                >
                  {/* FIX: Use React.createElement to dynamically add props to the icon component. */}
                  {React.createElement(link.icon.type, Object.assign({}, link.icon.props, { size: 20 }))}
                  <span>{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-highlight text-center flex-shrink-0">
            <p className="text-xs text-text-secondary">&copy; 2024 SmartHome Inc.</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
