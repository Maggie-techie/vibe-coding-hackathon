import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  change: string;
  positive: boolean;
}

const StatCard = ({ title, value, icon, change, positive }: StatCardProps) => {
  return (
    <motion.div 
      className="card"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-neutral-600 text-sm font-medium">{title}</h3>
          <motion.p 
            className="text-2xl font-bold mt-2 text-neutral-800"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {value}
          </motion.p>
        </div>
        <div className="bg-neutral-100 p-2 rounded-full">
          {icon}
        </div>
      </div>
      
      <div className={`flex items-center mt-4 text-sm ${positive ? 'text-success' : 'text-error'}`}>
        {positive ? (
          <ArrowUpRight size={16} className="mr-1" />
        ) : (
          <ArrowDownRight size={16} className="mr-1" />
        )}
        <span>{change}</span>
      </div>
    </motion.div>
  );
};

export default StatCard;