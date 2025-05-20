
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { OptionButton } from './OptionButton';
import { MessageInput } from './MessageInput';
import { cn } from '@/lib/utils';
import { ChatHeader } from './ChatHeader';
import { useConversationFlow } from '@/hooks/useConversationFlow';

export interface Message {
  id: string;
  content: string | React.ReactNode;
  type: 'bot' | 'user';
  options?: string[];
  timestamp: Date;
}

export const ChatInterface: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    messages,
    options,
    inputDisabled,
    handleSendMessage,
    handleOptionSelect,
    currentStep,
  } = useConversationFlow();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-kakao-lightGray">
      <ChatHeader />
      
      <div className="flex-grow overflow-y-auto px-4 py-2">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={cn("animate-fade-in", message.type === 'bot' ? "flex justify-start" : "flex justify-end")}>
              <ChatMessage message={message} />
            </div>
          ))}
          
          {options && options.length > 0 && (
            <div className="flex flex-col space-y-2 animate-fade-in">
              {options.map((option, index) => (
                <OptionButton 
                  key={index} 
                  text={option}
                  onClick={() => handleOptionSelect(option)}
                />
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <MessageInput 
        onSendMessage={handleSendMessage}
        disabled={inputDisabled}
        placeholder={inputDisabled ? "옵션을 선택해 주세요" : "메시지를 입력하세요"}
      />
    </div>
  );
};

export default ChatInterface;
