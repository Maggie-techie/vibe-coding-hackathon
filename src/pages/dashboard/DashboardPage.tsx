import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Bell, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useSound from 'use-sound';
import StatCard from './components/StatCard';
import ReminderItem from './components/ReminderItem';

// Mock data
const reminderStats = [
  { name: 'Mon', sent: 12, failed: 2 },
  { name: 'Tue', sent: 19, failed: 1 },
  { name: 'Wed', sent: 15, failed: 0 },
  { name: 'Thu', sent: 22, failed: 3 },
  { name: 'Fri', sent: 18, failed: 1 },
  { name: 'Sat', sent: 10, failed: 0 },
  { name: 'Sun', sent: 8, failed: 1 },
];

const recentReminders = [
  { id: 1, patient: 'John Doe', phone: '+1234567890', type: 'General check-up', status: 'sent', sentAt: '2024-07-01T09:30:00' },
  { id: 2, patient: 'Alice Smith', phone: '+1987654321', type: 'Lab test review', status: 'sent', sentAt: '2024-07-01T10:15:00' },
  { id: 3, patient: 'Bob Johnson', phone: '+1122334455', type: 'Vaccination', status: 'failed', sentAt: '2024-07-01T11:00:00' },
  { id: 4, patient: 'Emily Davis', phone: '+1555666777', type: 'Dental check-up', status: 'pending', sentAt: null },
];

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalReminders: 0,
    sentReminders: 0,
    pendingReminders: 0,
  });
  
  const [playSuccess] = useSound('https://assets.mixkit.co/active_storage/sfx/933/933-preview.mp3', { volume: 0.5 });

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setStats({
        totalPatients: 128,
        totalReminders: 432,
        sentReminders: 401,
        pendingReminders: 31,
      });
      
      // Play success sound when stats are loaded
      playSuccess();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [playSuccess]);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <StatCard 
          title="Total Patients"
          value={stats.totalPatients}
          icon={<Users size={24} className="text-primary-500" />}
          change="+12% from last month"
          positive={true}
        />
        <StatCard 
          title="Total Reminders"
          value={stats.totalReminders}
          icon={<Bell size={24} className="text-secondary-500" />}
          change="+8% from last month"
          positive={true}
        />
        <StatCard 
          title="Sent Successfully"
          value={stats.sentReminders}
          icon={<CheckCircle size={24} className="text-success" />}
          change="92.8% success rate"
          positive={true}
        />
        <StatCard 
          title="Pending Reminders"
          value={stats.pendingReminders}
          icon={<AlertTriangle size={24} className="text-warning" />}
          change="7.2% of total"
          positive={false}
        />
      </motion.div>
      
      {/* Charts & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reminder Stats Chart */}
        <motion.div 
          className="lg:col-span-2 card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Reminder Activity</h2>
            <select className="form-input py-1 px-3">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={reminderStats}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sent" fill="#2196F3" name="Sent" />
                <Bar dataKey="failed" fill="#F44336" name="Failed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        {/* Recent Reminders */}
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent Reminders</h2>
            <Link to="/reminders" className="text-primary-500 hover:text-primary-600 flex items-center">
              <span className="text-sm">View all</span>
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentReminders.map((reminder) => (
              <ReminderItem key={reminder.id} reminder={reminder} />
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Quick Actions */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="/patients/add" 
            className="p-4 bg-primary-50 hover:bg-primary-100 rounded-lg flex flex-col items-center text-center transition-all duration-300"
          >
            <Users size={32} className="text-primary-500 mb-2" />
            <h3 className="font-medium text-neutral-800">Add New Patient</h3>
            <p className="text-sm text-neutral-600 mt-1">Register a new patient in the system</p>
          </Link>
          
          <Link 
            to="/reminders" 
            className="p-4 bg-secondary-50 hover:bg-secondary-100 rounded-lg flex flex-col items-center text-center transition-all duration-300"
          >
            <Bell size={32} className="text-secondary-500 mb-2" />
            <h3 className="font-medium text-neutral-800">Manage Reminders</h3>
            <p className="text-sm text-neutral-600 mt-1">View and manage all scheduled reminders</p>
          </Link>
          
          <div className="p-4 bg-neutral-50 hover:bg-neutral-100 rounded-lg flex flex-col items-center text-center transition-all duration-300 cursor-pointer">
            <AlertTriangle size={32} className="text-warning mb-2" />
            <h3 className="font-medium text-neutral-800">View Failed Reminders</h3>
            <p className="text-sm text-neutral-600 mt-1">Check and resolve failed reminder deliveries</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;