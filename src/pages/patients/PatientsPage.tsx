import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

// Mock data for patients
const initialPatients = [
  { id: 1, name: 'John Doe', phone: '+1234567890', email: 'john@example.com', lastAppointment: '2024-06-15', appointmentType: 'General check-up', nextFollowup: '2024-06-29' },
  { id: 2, name: 'Alice Smith', phone: '+1987654321', email: 'alice@example.com', lastAppointment: '2024-06-10', appointmentType: 'Dental check-up', nextFollowup: '2024-07-10' },
  { id: 3, name: 'Bob Johnson', phone: '+1122334455', email: 'bob@example.com', lastAppointment: '2024-06-20', appointmentType: 'Lab test review', nextFollowup: '2024-06-27' },
  { id: 4, name: 'Emily Davis', phone: '+1555666777', email: 'emily@example.com', lastAppointment: '2024-06-18', appointmentType: 'Vaccination', nextFollowup: '2024-07-09' },
  { id: 5, name: 'Michael Wilson', phone: '+1999888777', email: 'michael@example.com', lastAppointment: '2024-06-05', appointmentType: 'Other', nextFollowup: '2024-06-15' },
];

const PatientsPage = () => {
  const [patients, setPatients] = useState(initialPatients);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDeletePatient = (id: number) => {
    if (confirm('Are you sure you want to delete this patient?')) {
      setPatients(patients.filter(patient => patient.id !== id));
      toast.success('Patient deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-neutral-500" />
          </div>
          <input
            type="text"
            placeholder="Search patients..."
            className="form-input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Link to="/patients/add" className="btn btn-primary flex items-center whitespace-nowrap">
          <Plus size={20} className="mr-2" />
          Add Patient
        </Link>
      </motion.div>
      
      <motion.div
        className="card overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Patient
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Last Appointment
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Next Follow-up
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <motion.tr 
                    key={patient.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    layout
                    className="hover:bg-neutral-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-700 font-medium text-sm">{patient.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-neutral-900">
                            <Link to={`/patients/${patient.id}`} className="hover:text-primary-600">
                              {patient.name}
                            </Link>
                          </div>
                          <div className="text-sm text-neutral-500">{patient.appointmentType}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-900 flex items-center">
                        <Phone size={14} className="mr-1 text-neutral-500" />
                        {patient.phone}
                      </div>
                      <div className="text-sm text-neutral-500 flex items-center">
                        <Mail size={14} className="mr-1 text-neutral-500" />
                        {patient.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-900">{new Date(patient.lastAppointment).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                        {new Date(patient.nextFollowup).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link to={`/patients/${patient.id}`} className="text-primary-600 hover:text-primary-900 p-1">
                          <Edit size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDeletePatient(patient.id)} 
                          className="text-error hover:text-red-900 p-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-neutral-500">
                    No patients found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default PatientsPage;