
import React from 'react';
import { ChevronLeft, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ChatHeader: React.FC = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/');
  };
  
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-3xl mx-auto flex items-center justify-between p-4">
        <button 
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          onClick={handleBack}
        >
          <ChevronLeft size={20} className="text-gray-700" />
        </button>
        
        <div className="flex-grow text-center">
          <h1 className="font-medium text-lg text-gray-800">청년정책 AI 상담사</h1>
        </div>
        
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Settings size={20} className="text-gray-700" />
        </button>
      </div>
    </div>
  );
};
