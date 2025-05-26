import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Users, Bell, UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Logo from '../ui/Logo';

interface SidebarProps {
  closeSidebar: () => void;
}

const Sidebar = ({ closeSidebar }: SidebarProps) => {
  const { user, logout } = useAuth();

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 flex items-center">
        <Logo />
      </div>

      <div className="p-4">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
            <UserCircle size={24} className="text-primary-700" />
          </div>
          <div>
            <h3 className="font-medium text-neutral-800">{user?.name}</h3>
            <p className="text-sm text-neutral-500">{user?.role}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-2 space-y-1">
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          onClick={closeSidebar}
        >
          <Home size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/patients" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          onClick={closeSidebar}
        >
          <Users size={20} />
          <span>Patients</span>
        </NavLink>
        
        <NavLink 
          to="/reminders" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          onClick={closeSidebar}
        >
          <Bell size={20} />
          <span>Reminders</span>
        </NavLink>
        
        <NavLink 
          to="/profile" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          onClick={closeSidebar}
        >
          <UserCircle size={20} />
          <span>Profile</span>
        </NavLink>
      </nav>

      <div className="p-4 mt-auto">
        <button 
          onClick={logout}
          className="sidebar-link w-full text-neutral-600 hover:text-error"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;