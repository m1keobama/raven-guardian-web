import React, { useRef, useEffect, useState } from 'react';
import { X, Send, Sparkles, Lock } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { useGeminiChat } from '../../hooks/useGeminiChat';

interface ChatWindowProps {
  onClose: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const { messages, isLoading, sendMessage } = useGeminiChat();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="absolute bottom-20 right-0 w-[90vw] md:w-[400px] h-[500px] md:h-[600px] bg-white dark:bg-slate-900 rounded-lg shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800 animate-in slide-in-from-bottom-5 fade-in duration-300 z-50 font-sans">
      
      {/* Header - Styled for Raven Guardian (Dark Slate) */}
      <div className="bg-slate-900 p-4 flex items-center justify-between shrink-0 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-900/50">
             <Sparkles size={20} />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm tracking-wide">Guardian AI</h3>
            <p className="text-slate-400 text-xs flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full block animate-pulse"></span>
              Bereit in Cottbus
            </p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-950 scrollbar-hide">
        <div className="space-y-2">
           {/* Welcome Info Box */}
           <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 rounded p-3 mb-6 text-xs text-blue-900 dark:text-blue-200 text-center shadow-sm">
              <span className="font-bold">Raven Guardian Support:</span> Ich beantworte Ihre Fragen zu Reinigung und Pflege sofort.
           </div>

           {messages.map((msg) => (
             <ChatMessage key={msg.id} message={msg} />
           ))}
           
           {isLoading && (
             <div className="flex justify-start mb-4 animate-pulse">
               <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-3 rounded-2xl rounded-bl-none flex gap-1 shadow-sm">
                 <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                 <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                 <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
               </div>
             </div>
           )}
           <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ihre Frage an uns..."
            className="flex-1 bg-slate-100 dark:bg-slate-800 border-transparent focus:border-blue-600 focus:bg-white dark:focus:bg-slate-900 focus:ring-0 rounded-lg px-4 py-3 text-sm transition-all text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className={`p-3 rounded-lg flex items-center justify-center transition-all ${
              !inputValue.trim() || isLoading
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
        <div className="text-center mt-2 flex items-center justify-center gap-1">
           <Lock size={10} className="text-slate-400" />
           <span className="text-[10px] text-slate-400">Datenübertragung verschlüsselt (TLS)</span>
        </div>
      </div>
    </div>
  );
};