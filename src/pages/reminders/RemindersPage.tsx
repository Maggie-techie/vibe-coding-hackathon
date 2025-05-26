import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, CheckCircle, XCircle, Clock, ArrowUpDown, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import useSound from 'use-sound';

// Mock data
const initialReminders = [
  { id: 1, patient: 'John Doe', phone: '+1234567890', date: '2024-06-29', type: 'General check-up', status: 'pending', message: 'Hi John! Your follow-up appointment is tomorrow at 10 AM. Tip: Stay hydrated before your visit!' },
  { id: 2, patient: 'Alice Smith', phone: '+1987654321', date: '2024-06-25', type: 'Lab test review', status: 'sent', message: 'Hello Alice, this is a reminder for your lab test review appointment tomorrow at 2 PM. Remember to bring your previous test results.' },
  { id: 3, patient: 'Bob Johnson', phone: '+1122334455', date: '2024-06-28', type: 'Vaccination', status: 'failed', message: 'Hi Bob, your vaccination appointment is scheduled for tomorrow at 11 AM. Please arrive 15 minutes early to complete paperwork.' },
  { id: 4, patient: 'Emily Davis', phone: '+1555666777', date: '2024-07-05', type: 'Dental check-up', status: 'pending', message: 'Hello Emily, this is a reminder for your dental check-up appointment tomorrow at 9 AM. Remember to brush and floss before your visit!' },
  { id: 5, patient: 'Michael Wilson', phone: '+1999888777', date: '2024-06-30', type: 'Other', status: 'pending', message: 'Hi Michael, your follow-up appointment is tomorrow at 3 PM. If you need to reschedule, please call us at least 24 hours in advance.' },
];

const RemindersPage = () => {
  const [reminders, setReminders] = useState(initialReminders);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const [playSuccess] = useSound('https://assets.mixkit.co/active_storage/sfx/933/933-preview.mp3', { volume: 0.5 });
  
  const handleResendReminder = async (id: number) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update reminder status
      setReminders(reminders.map(reminder => 
        reminder.id === id ? { ...reminder, status: 'sent' } : reminder
      ));
      
      // Play success sound
      playSuccess();
      
      toast.success('Reminder resent successfully');
    } catch (error) {
      console.error('Error resending reminder:', error);
      toast.error('Failed to resend reminder');
    }
  };
  
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };
  
  // Filter and sort reminders
  const filteredReminders = reminders
    .filter(reminder => filterStatus === 'all' || reminder.status === filterStatus)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold">Reminders</h1>
        
        <div className="flex flex-wrap gap-3">
          <div className="relative inline-block">
            <button className="btn btn-outline flex items-center">
              <Filter size={18} className="mr-2" />
              Filter: {filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
            </button>
            <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 hidden group-hover:block">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <button 
                  onClick={() => setFilterStatus('all')}
                  className={`block px-4 py-2 text-sm w-full text-left ${filterStatus === 'all' ? 'bg-primary-50 text-primary-700' : 'text-neutral-700'}`}
                >
                  All Reminders
                </button>
                <button 
                  onClick={() => setFilterStatus('sent')}
                  className={`block px-4 py-2 text-sm w-full text-left ${filterStatus === 'sent' ? 'bg-primary-50 text-primary-700' : 'text-neutral-700'}`}
                >
                  Sent
                </button>
                <button 
                  onClick={() => setFilterStatus('pending')}
                  className={`block px-4 py-2 text-sm w-full text-left ${filterStatus === 'pending' ? 'bg-primary-50 text-primary-700' : 'text-neutral-700'}`}
                >
                  Pending
                </button>
                <button 
                  onClick={() => setFilterStatus('failed')}
                  className={`block px-4 py-2 text-sm w-full text-left ${filterStatus === 'failed' ? 'bg-primary-50 text-primary-700' : 'text-neutral-700'}`}
                >
                  Failed
                </button>
              </div>
            </div>
          </div>
          
          <button 
            onClick={toggleSortDirection}
            className="btn btn-outline flex items-center"
          >
            <Calendar size={18} className="mr-2" />
            <ArrowUpDown size={18} className="mr-2" />
            Date: {sortDirection === 'asc' ? 'Earliest first' : 'Latest first'}
          </button>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="space-y-4"
      >
        {filteredReminders.length > 0 ? (
          filteredReminders.map((reminder) => (
            <motion.div 
              key={reminder.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="card"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="font-medium text-lg">{reminder.patient}</h3>
                    <div className={`ml-3 px-2 py-0.5 text-xs rounded-full ${
                      reminder.status === 'sent' 
                        ? 'bg-success bg-opacity-10 text-success' 
                        : reminder.status === 'pending' 
                          ? 'bg-warning bg-opacity-10 text-warning' 
                          : 'bg-error bg-opacity-10 text-error'
                    }`}>
                      <div className="flex items-center">
                        {reminder.status === 'sent' ? (
                          <CheckCircle size={12} className="mr-1" />
                        ) : reminder.status === 'pending' ? (
                          <Clock size={12} className="mr-1" />
                        ) : (
                          <XCircle size={12} className="mr-1" />
                        )}
                        {reminder.status.charAt(0).toUpperCase() + reminder.status.slice(1)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-neutral-500">Phone</p>
                      <p className="text-neutral-800">{reminder.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">Date</p>
                      <p className="text-neutral-800">{new Date(reminder.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">Appointment Type</p>
                      <p className="text-neutral-800">{reminder.type}</p>
                    </div>
                  </div>
                  
                  <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200 mb-4">
                    <p className="text-sm text-neutral-700">{reminder.message}</p>
                  </div>
                </div>
                
                <div className="flex md:flex-col space-x-3 md:space-x-0 md:space-y-2">
                  {reminder.status === 'failed' && (
                    <button 
                      onClick={() => handleResendReminder(reminder.id)}
                      className="btn btn-primary py-1 text-sm flex-1 md:flex-none"
                    >
                      Resend
                    </button>
                  )}
                  <button className="btn btn-outline py-1 text-sm flex-1 md:flex-none">
                    Edit
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="card py-12 flex flex-col items-center justify-center">
            <div className="bg-neutral-100 p-4 rounded-full mb-4">
              <Bell size={32} className="text-neutral-400" />
            </div>
            <h3 className="text-lg font-medium text-neutral-700 mb-1">No reminders found</h3>
            <p className="text-neutral-500">No reminders match your current filter criteria.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default RemindersPage;