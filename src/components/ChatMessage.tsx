
import React from 'react';
import { Message } from './ChatInterface';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const formatTime = (date: Date) => {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };
  
  const formattedTime = formatTime(message.timestamp);
  
  return (
    <div className={cn(
      "flex items-end max-w-[85%] group", 
      message.type === 'user' ? "flex-row-reverse" : ""
    )}>
      {message.type === 'bot' && (
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-2 mb-1">
          <span className="text-white text-xs font-bold">GPT</span>
        </div>
      )}
      
      <div className="flex flex-col">
        <div className={cn(
          "px-4 py-3 rounded-xl break-words whitespace-pre-line shadow-sm",
          message.type === 'bot' 
            ? "bg-white text-gray-800 border border-gray-200" 
            : "bg-blue-600 text-white"
        )}>
          {message.content}
        </div>
        
        <span className={cn(
          "text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity",
          message.type === 'bot' ? "ml-1 text-left" : "mr-1 text-right"
        )}>
          {formattedTime}
        </span>
      </div>
    </div>
  );
};
