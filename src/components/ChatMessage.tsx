
import React from 'react';
import { Message } from '@/types/conversation';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={cn("flex items-start space-x-3")}>
      {/* Avatar */}
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
        message.type === 'bot' 
          ? "bg-green-600" 
          : "bg-blue-600"
      )}>
        <span className="text-white text-xs font-bold">
          {message.type === 'bot' ? 'AI' : '나'}
        </span>
      </div>
      
      {/* Message Content */}
      <div className="flex-grow min-w-0">
        <div className={cn(
          "prose prose-sm max-w-none",
          message.type === 'bot' ? "text-gray-800" : "text-gray-800"
        )}>
          <div className="whitespace-pre-line leading-relaxed">
            {message.content}
          </div>
        </div>
      </div>
    </div>
  );
};
