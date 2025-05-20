
import React from 'react';
import { ChevronLeft } from 'lucide-react';

export const ChatHeader: React.FC = () => {
  return (
    <div className="bg-kakao-yellow flex items-center p-3 border-b border-gray-200">
      <button className="p-1 rounded-full hover:bg-yellow-400 transition-colors">
        <ChevronLeft size={24} className="text-kakao-brown" />
      </button>
      <div className="flex-grow text-center">
        <h1 className="font-bold text-kakao-brown">청년정책 안내봇</h1>
      </div>
      <div className="w-6"></div> {/* Spacer for balance */}
    </div>
  );
};
