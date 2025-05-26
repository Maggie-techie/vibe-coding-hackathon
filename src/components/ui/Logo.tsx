import { Heart } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-primary-500 text-white p-1.5 rounded-md">
        <Heart size={20} className="text-white" />
      </div>
      <span className="font-bold text-xl text-neutral-800">MediRemind</span>
    </div>
  );
};

export default Logo;