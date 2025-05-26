import { format } from 'date-fns';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface ReminderItemProps {
  reminder: {
    id: number;
    patient: string;
    phone: string;
    type: string;
    status: string;
    sentAt: string | null;
  };
}

const ReminderItem = ({ reminder }: ReminderItemProps) => {
  const getStatusIcon = () => {
    switch (reminder.status) {
      case 'sent':
        return <CheckCircle size={16} className="text-success" />;
      case 'failed':
        return <XCircle size={16} className="text-error" />;
      case 'pending':
        return <Clock size={16} className="text-warning" />;
      default:
        return null;
    }
  };
  
  const getStatusText = () => {
    switch (reminder.status) {
      case 'sent':
        return 'Sent successfully';
      case 'failed':
        return 'Delivery failed';
      case 'pending':
        return 'Pending delivery';
      default:
        return reminder.status;
    }
  };
  
  const getStatusClass = () => {
    switch (reminder.status) {
      case 'sent':
        return 'text-success bg-success bg-opacity-10';
      case 'failed':
        return 'text-error bg-error bg-opacity-10';
      case 'pending':
        return 'text-warning bg-warning bg-opacity-10';
      default:
        return 'text-neutral-600 bg-neutral-100';
    }
  };

  return (
    <div className="flex items-center p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors duration-200">
      <div className="flex-1 min-w-0">
        <p className="font-medium text-neutral-800 truncate">{reminder.patient}</p>
        <p className="text-sm text-neutral-600">{reminder.type}</p>
      </div>
      
      <div className="flex flex-col items-end ml-4">
        <span className={`text-xs px-2 py-1 rounded-full flex items-center ${getStatusClass()}`}>
          {getStatusIcon()}
          <span className="ml-1">{getStatusText()}</span>
        </span>
        
        {reminder.sentAt && (
          <span className="text-xs text-neutral-500 mt-1">
            {format(new Date(reminder.sentAt), 'MMM d, h:mm a')}
          </span>
        )}
      </div>
    </div>
  );
};

export default ReminderItem;