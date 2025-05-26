import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ArrowLeft, Save } from 'lucide-react';
import useSound from 'use-sound';

interface PatientFormData {
  name: string;
  email: string;
  phone: string;
  appointmentDate: string;
  appointmentType: string;
  notes: string;
}

const appointmentTypes = [
  { value: 'general-checkup', label: 'General check-up', followupDays: 14 },
  { value: 'lab-test', label: 'Lab test review', followupDays: 7 },
  { value: 'dental-checkup', label: 'Dental check-up', followupDays: 30 },
  { value: 'vaccination', label: 'Vaccination', followupDays: 21 },
  { value: 'other', label: 'Other', followupDays: 10 },
];

const AddPatientPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<PatientFormData>();
  
  const appointmentType = watch('appointmentType');
  const appointmentDate = watch('appointmentDate');
  
  const [playSuccess] = useSound('https://assets.mixkit.co/active_storage/sfx/1115/1115-preview.mp3', { volume: 0.5 });
  
  const calculateFollowupDate = (): string => {
    if (!appointmentDate || !appointmentType) return '';
    
    const selectedType = appointmentTypes.find(type => type.value === appointmentType);
    if (!selectedType) return '';
    
    const date = new Date(appointmentDate);
    date.setDate(date.getDate() + selectedType.followupDays);
    return date.toISOString().split('T')[0];
  };

  const onSubmit = async (data: PatientFormData) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, you would submit this data to your backend API
      // This is just a simulation for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Play success sound
      playSuccess();
      
      toast.success('Patient added successfully!');
      navigate('/patients');
    } catch (error) {
      console.error('Error adding patient:', error);
      toast.error('Failed to add patient. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <motion.div 
        className="mb-6 flex items-center"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={() => navigate(-1)}
          className="mr-4 p-2 rounded-full hover:bg-neutral-100"
        >
          <ArrowLeft size={20} className="text-neutral-600" />
        </button>
        <h1 className="text-2xl font-bold">Add New Patient</h1>
      </motion.div>
      
      <motion.div 
        className="card max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Patient Information */}
            <div className="space-y-4 md:col-span-2">
              <h2 className="text-lg font-semibold border-b pb-2">Patient Information</h2>
              
              <div>
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className={`form-input ${errors.name ? 'border-error' : ''}`}
                  placeholder="John Doe"
                  {...register('name', { 
                    required: 'Name is required',
                    minLength: { value: 2, message: 'Name must be at least 2 characters' }
                  })}
                />
                {errors.name && <p className="form-error">{errors.name.message}</p>}
              </div>
            </div>
            
            {/* Contact Information */}
            <div>
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                className={`form-input ${errors.email ? 'border-error' : ''}`}
                placeholder="john@example.com"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
              {errors.email && <p className="form-error">{errors.email.message}</p>}
            </div>
            
            <div>
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input
                type="tel"
                id="phone"
                className={`form-input ${errors.phone ? 'border-error' : ''}`}
                placeholder="+1234567890"
                {...register('phone', { 
                  required: 'Phone number is required',
                  pattern: {
                    value: /^\+?[0-9]{10,15}$/,
                    message: 'Please enter a valid phone number'
                  }
                })}
              />
              {errors.phone && <p className="form-error">{errors.phone.message}</p>}
            </div>
            
            {/* Appointment Information */}
            <div className="space-y-4 md:col-span-2">
              <h2 className="text-lg font-semibold border-b pb-2">Appointment Information</h2>
            </div>
            
            <div>
              <label htmlFor="appointmentDate" className="form-label">Appointment Date</label>
              <input
                type="date"
                id="appointmentDate"
                className={`form-input ${errors.appointmentDate ? 'border-error' : ''}`}
                {...register('appointmentDate', { 
                  required: 'Appointment date is required',
                  validate: value => new Date(value) >= new Date(new Date().setHours(0, 0, 0, 0)) || 'Date cannot be in the past'
                })}
              />
              {errors.appointmentDate && <p className="form-error">{errors.appointmentDate.message}</p>}
            </div>
            
            <div>
              <label htmlFor="appointmentType" className="form-label">Appointment Type</label>
              <select
                id="appointmentType"
                className={`form-input ${errors.appointmentType ? 'border-error' : ''}`}
                {...register('appointmentType', { required: 'Appointment type is required' })}
              >
                <option value="">Select appointment type</option>
                {appointmentTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
              {errors.appointmentType && <p className="form-error">{errors.appointmentType.message}</p>}
            </div>
            
            {/* Follow-up Information */}
            {appointmentType && appointmentDate && (
              <motion.div 
                className="md:col-span-2 bg-primary-50 p-4 rounded-lg"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-medium text-primary-800 mb-2">Follow-up Reminder</h3>
                <p className="text-sm text-primary-700">
                  Based on the appointment type, a follow-up reminder will be scheduled for:{' '}
                  <span className="font-bold">{calculateFollowupDate()}</span>
                </p>
              </motion.div>
            )}
            
            <div className="md:col-span-2">
              <label htmlFor="notes" className="form-label">Notes</label>
              <textarea
                id="notes"
                rows={4}
                className="form-input"
                placeholder="Additional notes about the patient..."
                {...register('notes')}
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 border-t pt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-outline"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} className="mr-2" />
                  Save Patient
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddPatientPage;