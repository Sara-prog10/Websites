import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { auth } from '../services/firebase';
import { NAV_LINKS } from '../constants';
import { Sun, Moon, LogOut, User as UserIcon, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  const getPageTitle = () => {
    // Match root path specifically, otherwise find by path.
    if (location.pathname === '/') {
        return 'Dashboard';
    }
    const currentLink = NAV_LINKS.find(link => link.path !== '/' && location.pathname.startsWith(link.path));
    return currentLink ? currentLink.name : 'Dashboard';
  };

  return (
    <header className="flex items-center justify-between p-4 sm:p-6 bg-secondary border-b border-highlight flex-shrink-0">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden text-text-secondary hover:text-text-primary">
            <Menu size={24} />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-text-primary">{getPageTitle()}</h1>
      </div>
      <div className="flex items-center gap-3 sm:gap-6">
        <button onClick={toggleTheme} className="text-text-secondary hover:text-accent transition-colors">
          {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
        </button>
        <div className="relative group">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary font-bold">
              {user?.displayName?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="hidden md:block">
              <p className="font-semibold text-text-primary">{user?.displayName || 'User'}</p>
              <p className="text-xs text-text-secondary">{user?.email}</p>
            </div>
          </div>
          <div className="absolute right-0 mt-2 w-48 bg-secondary border border-highlight rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-10">
            <button
              onClick={() => navigate('/settings')}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-text-secondary hover:bg-highlight hover:text-text-primary rounded-md text-left"
            >
              <UserIcon size={16} />
              <span>Profile</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-danger hover:bg-danger/20 rounded-md text-left"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
