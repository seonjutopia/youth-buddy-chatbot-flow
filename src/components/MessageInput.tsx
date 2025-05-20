
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  disabled = false,
  placeholder = "메시지를 입력하세요" 
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-3">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          className="flex-grow border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-1 focus:ring-kakao-yellow"
          disabled={disabled}
        />
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className={`ml-2 w-10 h-10 rounded-full flex items-center justify-center ${
            !message.trim() || disabled ? 'bg-gray-200 text-gray-400' : 'bg-kakao-yellow text-kakao-brown'
          }`}
        >
          <ChevronRight size={20} />
        </button>
      </form>
    </div>
  );
};
