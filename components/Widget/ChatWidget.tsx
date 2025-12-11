import React, { useState } from 'react';
import { MessageSquareText } from 'lucide-react';
import { ChatWindow } from './ChatWindow';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}

      {/* Toggle Button */}
      <button
        onClick={toggleOpen}
        className={`group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl transition-all duration-300 border-4 border-white ${
          isOpen 
            ? 'bg-slate-200 text-slate-600 rotate-90 scale-90' 
            : 'bg-blue-600 text-white hover:bg-slate-900 hover:scale-105'
        }`}
        aria-label={isOpen ? "Chat schließen" : "Chat öffnen"}
      >
        <MessageSquareText size={28} className={`transition-transform duration-300 ${isOpen ? '-rotate-90' : ''}`} />
        
        {/* Notification Badge */}
        {!isOpen && (
           <span className="absolute top-1 right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        )}
      </button>

      {/* Tooltip hint when closed */}
      {!isOpen && (
        <div className="absolute bottom-full right-0 mb-3 w-56 p-4 bg-slate-900 text-white rounded-lg shadow-xl transform origin-bottom-right transition-all animate-in fade-in slide-in-from-bottom-2">
          <p className="text-sm font-medium leading-tight">
            Fragen zu Dach- oder Solarreinigung?
          </p>
          <p className="text-xs text-slate-400 mt-1">Chatten Sie mit uns!</p>
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-slate-900 transform rotate-45"></div>
        </div>
      )}
    </div>
  );
};