
import React from 'react';

interface OptionButtonProps {
  text: string;
  onClick: () => void;
}

export const OptionButton: React.FC<OptionButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className="bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg text-left hover:bg-gray-50 transition-colors w-full"
      onClick={onClick}
    >
      {text}
    </button>
  );
};
