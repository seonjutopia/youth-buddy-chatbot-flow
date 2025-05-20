import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { OptionButton } from './OptionButton';
import { MessageInput } from './MessageInput';
import { cn } from '@/lib/utils';
import { ChatHeader } from './ChatHeader';
import { useConversationFlow } from '@/hooks/useConversationFlow';
import { Loader2 } from 'lucide-react';
import { Message } from '@/types/conversation';

export { type Message };

export const ChatInterface: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    messages,
    options,
    inputDisabled,
    handleSendMessage,
    handleOptionSelect,
    currentStep,
    isLoading
  } = useConversationFlow();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <ChatHeader />
      
      <div className="flex-grow overflow-y-auto px-4 py-2">
        <div className="space-y-4 max-w-3xl mx-auto py-4">
          {messages.map((message) => (
            <div key={message.id} className={cn("animate-fade-in", message.type === 'bot' ? "flex justify-start" : "flex justify-end")}>
              <ChatMessage message={message} />
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex items-center space-x-2 bg-white shadow-md text-gray-800 px-4 py-3 rounded-2xl">
                <Loader2 className="animate-spin h-4 w-4 text-blue-500" />
                <span>생각 중...</span>
              </div>
            </div>
          )}
          
          {options && options.length > 0 && (
            <div className="flex flex-col space-y-2 animate-fade-in max-w-lg">
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
      
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto w-full p-4">
          <MessageInput 
            onSendMessage={handleSendMessage}
            disabled={inputDisabled || isLoading}
            placeholder={inputDisabled ? "옵션을 선택해 주세요" : "메시지를 입력하세요"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
