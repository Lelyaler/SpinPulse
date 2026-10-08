import React, { useState } from 'react';
import { X, Send, MessageSquare } from 'lucide-react';
import { playButtonClick } from '../utils/casinoAudio';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  isRu: boolean;
}

interface ChatMessage {
  id: number;
  sender: 'agent' | 'user';
  text: string;
  time: string;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose, isRu }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'agent',
      text: isRu 
        ? 'Здравствуйте! Служба VIP поддержки SpinPulse на связи. Чем могу помочь вам сегодня?' 
        : 'Hello! SpinPulse VIP Support Concierge is here. How can I assist you today?',
      time: '14:30',
    },
  ]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    playButtonClick();
    const userMsg: ChatMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Instant support message reply handler
    setTimeout(() => {
      const replyText = isRu
        ? 'Благодарим за обращение! Ваш демо-баланс и все игровые функции активны. Если нужны дополнительные демо-монеты, используйте кнопку "Депозит" или Колесо Удачи!'
        : 'Thank you for reaching out! All demo slots and features are fully operational. If you need more free coins, use the Deposit or Lucky Wheel feature!';
      
      const agentMsg: ChatMessage = {
        id: Date.now() + 1,
        sender: 'agent',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, agentMsg]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-amber-200 shadow-2xl flex flex-col h-[520px] overflow-hidden">
        {/* Support Header */}
        <div className="p-4 border-b border-amber-100 bg-linear-to-r from-amber-50 to-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-xs">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-sm">
                {isRu ? 'VIP Поддержка 24/7' : '24/7 VIP Concierge'}
              </h3>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{isRu ? 'Оператор онлайн' : 'Concierge Online'}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3.5 rounded-2xl text-xs font-medium leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-amber-500 text-white rounded-br-xs shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-xs'
                }`}
              >
                <p>{m.text}</p>
                <span
                  className={`text-[9px] block text-right mt-1 font-bold ${
                    m.sender === 'user' ? 'text-amber-100' : 'text-slate-400'
                  }`}
                >
                  {m.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
          <input
            type="text"
            placeholder={isRu ? 'Напишите ваше сообщение...' : 'Type your question...'}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-2.5 text-xs font-semibold rounded-2xl border border-slate-200 focus:outline-none focus:border-amber-400 bg-slate-50 focus:bg-white"
          />
          <button
            type="submit"
            className="p-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white shadow-xs transition-transform cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
