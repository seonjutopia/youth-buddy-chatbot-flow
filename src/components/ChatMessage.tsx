
import React from 'react';
import { Message } from './ChatInterface';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const formattedTime = `${message.timestamp.getHours().toString().padStart(2, '0')}:${message.timestamp.getMinutes().toString().padStart(2, '0')}`;
  
  return (
    <div className={cn("flex items-end max-w-[80%]", message.type === 'user' && "flex-row-reverse")}>
      {message.type === 'bot' && (
        <div className="w-8 h-8 rounded-full bg-kakao-yellow flex items-center justify-center mr-2 mb-1">
          <span className="text-kakao-brown text-xs font-bold">정책</span>
        </div>
      )}
      
      <div className="flex flex-col">
        {message.type === 'bot' && <span className="text-xs text-gray-700 mb-1">청년정책봇</span>}
        
        <div className={cn(
          "px-4 py-2 rounded-2xl break-words",
          message.type === 'bot' 
            ? "bg-kakao-botBubble text-black rounded-tl-none" 
            : "bg-kakao-yellow text-kakao-brown rounded-tr-none"
        )}>
          {message.content}
        </div>
      </div>
      
      <span className={cn(
        "text-[10px] text-gray-500 mb-1", 
        message.type === 'bot' ? "ml-1" : "mr-1"
      )}>
        {formattedTime}
      </span>
    </div>
  );
};
