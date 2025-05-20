
import React from 'react';

interface OptionButtonProps {
  text: string;
  onClick: () => void;
}

export const OptionButton: React.FC<OptionButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className="bg-white border border-gray-200 text-gray-800 py-3 px-4 rounded-lg text-left hover:bg-gray-50 transition-colors w-full shadow-sm"
      onClick={onClick}
    >
      {text}
    </button>
  );
};
