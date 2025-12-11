import React from 'react';
import { Message, Sender } from '../../types';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === Sender.BOT;

  return (
    <div className={`flex w-full mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[85%] ${isBot ? 'flex-row' : 'flex-row-reverse'} gap-2 items-end`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isBot ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          {isBot ? <Bot size={16} /> : <User size={16} />}
        </div>

        {/* Bubble */}
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
            isBot
              ? 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
              : 'bg-blue-600 text-white rounded-br-none'
          } ${message.isError ? 'bg-red-50 border-red-200 text-red-600' : ''}`}
        >
          {/* Simple Markdown-like rendering could go here, for now just text */}
          <p className="whitespace-pre-wrap">{message.text}</p>
          <span className={`text-[10px] block mt-1 opacity-70 ${isBot ? 'text-left' : 'text-right'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};