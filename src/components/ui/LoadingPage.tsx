import { motion } from 'framer-motion';

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="inline-block w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full mb-4"
        />
        <h2 className="text-xl font-semibold text-neutral-700">Loading...</h2>
        <p className="text-neutral-500 mt-2">Please wait a moment</p>
      </motion.div>
    </div>
  );
};

export default LoadingPage;