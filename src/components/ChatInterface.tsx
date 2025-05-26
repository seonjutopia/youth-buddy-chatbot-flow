
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
    <div className="flex flex-col h-screen bg-white max-w-md mx-auto">
      <ChatHeader />
      
      {/* Messages Container - GPT Style */}
      <div className="flex-grow overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {messages.map((message, index) => (
            <div 
              key={message.id} 
              className={cn(
                "px-4 py-6 border-b border-gray-100",
                message.type === 'bot' ? "bg-gray-50" : "bg-white"
              )}
            >
              <div className="max-w-2xl mx-auto">
                <ChatMessage message={message} />
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="px-4 py-6 bg-gray-50 border-b border-gray-100">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">AI</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Loader2 className="animate-spin h-4 w-4 text-gray-500" />
                    <span className="text-gray-500">답변을 생성하고 있습니다...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {options && options.length > 0 && (
            <div className="px-4 py-4 bg-white">
              <div className="max-w-2xl mx-auto space-y-2">
                {options.map((option, index) => (
                  <OptionButton 
                    key={index} 
                    text={option}
                    onClick={() => handleOptionSelect(option)}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input Area - GPT Style */}
      <div className="border-t border-gray-200 bg-white px-4 py-4">
        <div className="max-w-2xl mx-auto">
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
