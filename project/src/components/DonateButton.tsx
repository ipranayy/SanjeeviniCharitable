import React from 'react';
import { useNavigate } from 'react-router-dom';

interface DonateButtonProps {
  className?: string;
  variant?: 'default' | 'header';
}

const DonateButton: React.FC<DonateButtonProps> = ({ className = "", variant = 'default' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/donate');
  };

  if (variant === 'header') {
    return (
      <button 
        onClick={handleClick}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md"
      >
        Donate Now
      </button>
    );
  }

  return (
    <div className={`${className} flex flex-col items-center`}>
      <button
        onClick={handleClick}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md w-full"
      >
        Donate Now
      </button>
    </div>
  );
};

export default DonateButton;