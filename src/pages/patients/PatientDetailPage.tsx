import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit, Save, Phone, Mail, Calendar, User, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

// Mock patient data
const patientData = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  lastAppointment: '2024-06-15',
  appointmentType: 'General check-up',
  nextFollowup: '2024-06-29',
  notes: 'Patient has a history of hypertension. Recommended regular monitoring of blood pressure.',
  reminders: [
    { id: 1, date: '2024-06-29', message: 'Follow-up appointment reminder', status: 'pending' },
    { id: 2, date: '2024-06-22', message: 'Pre-appointment reminder', status: 'sent' },
    { id: 3, date: '2024-06-15', message: 'Appointment confirmation', status: 'sent' },
  ]
};

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(patientData);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  
  useEffect(() => {
    // In a real app, you would fetch patient data from your API
    // Simulating API call
    const timer = setTimeout(() => {
      setPatient({
        ...patientData,
        id: Number(id),
      });
      
      setFormData({
        name: patientData.name,
        email: patientData.email,
        phone: patientData.phone,
        notes: patientData.notes,
      });
      
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call to update patient
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setPatient({
        ...patient,
        ...formData,
      });
      
      setIsEditing(false);
      toast.success('Patient updated successfully');
    } catch (error) {
      console.error('Error updating patient:', error);
      toast.error('Failed to update patient');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !isEditing) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div>
      <motion.div 
        className="mb-6 flex items-center justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full hover:bg-neutral-100"
          >
            <ArrowLeft size={20} className="text-neutral-600" />
          </button>
          <h1 className="text-2xl font-bold">Patient Details</h1>
        </div>
        
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-outline flex items-center"
          >
            <Edit size={18} className="mr-2" />
            Edit
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="btn btn-primary flex items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              <>
                <Save size={18} className="mr-2" />
                Save
              </>
            )}
          </button>
        )}
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Information */}
        <motion.div 
          className="card lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex justify-between items-start mb-6 pb-4 border-b">
            <div className="flex items-center">
              <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                <User size={32} className="text-primary-700" />
              </div>
              
              {!isEditing ? (
                <div>
                  <h2 className="text-xl font-bold">{patient.name}</h2>
                  <p className="text-neutral-500">Patient #{patient.id}</p>
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input text-lg font-bold mb-1 py-1"
                  />
                  <p className="text-neutral-500">Patient #{patient.id}</p>
                </div>
              )}
            </div>
            
            <div className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
              {patient.appointmentType}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm uppercase text-neutral-500 font-medium mb-3">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="text-neutral-400 mr-3 mt-0.5" size={18} />
                  {!isEditing ? (
                    <div>
                      <p className="text-neutral-800">{patient.phone}</p>
                      <p className="text-sm text-neutral-500">Mobile</p>
                    </div>
                  ) : (
                    <div className="flex-1">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-input mb-1"
                      />
                      <p className="text-sm text-neutral-500">Mobile</p>
                    </div>
                  )}
                </div>
                
                <div className="flex items-start">
                  <Mail className="text-neutral-400 mr-3 mt-0.5" size={18} />
                  {!isEditing ? (
                    <div>
                      <p className="text-neutral-800">{patient.email}</p>
                      <p className="text-sm text-neutral-500">Email</p>
                    </div>
                  ) : (
                    <div className="flex-1">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input mb-1"
                      />
                      <p className="text-sm text-neutral-500">Email</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm uppercase text-neutral-500 font-medium mb-3">Appointment Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="text-neutral-400 mr-3 mt-0.5" size={18} />
                  <div>
                    <p className="text-neutral-800">{new Date(patient.lastAppointment).toLocaleDateString()}</p>
                    <p className="text-sm text-neutral-500">Last Appointment</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="text-neutral-400 mr-3 mt-0.5" size={18} />
                  <div>
                    <p className="text-neutral-800 font-medium">{new Date(patient.nextFollowup).toLocaleDateString()}</p>
                    <p className="text-sm text-neutral-500">Next Follow-up</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-sm uppercase text-neutral-500 font-medium mb-3">Notes</h3>
            
            {!isEditing ? (
              <p className="text-neutral-700">{patient.notes}</p>
            ) : (
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="form-input h-32"
              ></textarea>
            )}
          </div>
        </motion.div>
        
        {/* Reminders History */}
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-4">Reminder History</h3>
          
          <div className="space-y-4">
            {patient.reminders.map((reminder) => (
              <div key={reminder.id} className="flex items-start border-b pb-4">
                <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                  reminder.status === 'sent' 
                    ? 'bg-success' 
                    : reminder.status === 'pending' 
                      ? 'bg-warning' 
                      : 'bg-error'
                }`}></div>
                
                <div className="flex-1">
                  <p className="text-sm font-medium">{reminder.message}</p>
                  <p className="text-xs text-neutral-500">{new Date(reminder.date).toLocaleDateString()}</p>
                </div>
                
                <div className={`text-xs px-2 py-1 rounded-full ${
                  reminder.status === 'sent' 
                    ? 'bg-success bg-opacity-10 text-success' 
                    : reminder.status === 'pending' 
                      ? 'bg-warning bg-opacity-10 text-warning' 
                      : 'bg-error bg-opacity-10 text-error'
                }`}>
                  {reminder.status.charAt(0).toUpperCase() + reminder.status.slice(1)}
                </div>
              </div>
            ))}
          </div>
          
          <button className="btn btn-outline w-full mt-4">
            Send Custom Reminder
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default PatientDetailPage;