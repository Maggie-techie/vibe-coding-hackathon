import { ReactNode } from 'react';
import { Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  children?: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  const location = useLocation();
  
  // Generate title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/patients/add')) return 'Add Patient';
    if (path.includes('/patients/') && path.length > 10) return 'Patient Details';
    if (path.includes('/patients')) return 'Patients';
    if (path.includes('/reminders')) return 'Reminders';
    if (path.includes('/profile')) return 'Profile';
    return 'MediRemind';
  };

  return (
    <header className="bg-white border-b border-neutral-200 h-16 flex items-center px-4 sticky top-0 z-10">
      <div className="flex-1 flex items-center">
        {children}
        <motion.h1 
          className="text-xl font-semibold ml-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          key={location.pathname}
        >
          {getPageTitle()}
        </motion.h1>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 rounded-full hover:bg-neutral-100">
          <Bell size={20} className="text-neutral-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;