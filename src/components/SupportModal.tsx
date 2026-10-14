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

const quickQuestionsRu = [
  'Как пополнить демо-баланс?',
  'Как запустить слот?',
  'Как работает Колесо Фортуны?',
];

const quickQuestionsEn = [
  'How to refill demo balance?',
  'How to play a slot?',
  'How does the Lucky Wheel work?',
];

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose, isRu }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'agent',
      text: isRu
        ? 'Здравствуйте! Служба поддержки SpinPulse на связи. Выберите быстрый вопрос или задайте свой.'
        : 'Hello! SpinPulse Support is online. Select a quick topic or ask a question.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const getSmartReply = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('баланс') || q.includes('депозит') || q.includes('balance') || q.includes('refill')) {
      return isRu
        ? 'Для пополнения демо-баланса нажмите золотую кнопку «+» или «Депозит» в шапке сайта — вам моментально начислится +$500.'
        : 'To refill your demo balance, click the "+" or "Deposit" button in the header for an instant +$500 credit.';
    }
    if (q.includes('слот') || q.includes('игра') || q.includes('play') || q.includes('slot')) {
      return isRu
        ? 'Кликните по любой карточке игры в каталоге или нажмите кнопку «Играть» — откроется интерактивный автомат с выбором ставок.'
        : 'Click on any game card in the lobby or press "Play" to open the interactive slot simulator with betting options.';
    }
    if (q.includes('колесо') || q.includes('wheel') || q.includes('удачи') || q.includes('фортун')) {
      return isRu
        ? 'Колесо Фортуны доступно в боковом меню и на главном баннере. Крутите колесо для получения бонусных очков и джекпотов.'
        : 'The Lucky Wheel is accessible from the sidebar and hero banner. Spin it to win bonus coins and jackpots.';
    }
    return isRu
      ? 'Спасибо за ваш вопрос! Все слоты работают в режиме симулятора. Если нужна дополнительная информация, ознакомьтесь с разделом FAQ внизу страницы.'
      : 'Thank you for reaching out! All games run in full demo mode. For more information, check the FAQ section at the bottom of the page.';
  };

  const handleSendQuery = (text: string) => {
    if (!text.trim()) return;
    playButtonClick();

    const userMsg: ChatMessage = {
      id: Date.now(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      const reply = getSmartReply(text);
      const agentMsg: ChatMessage = {
        id: Date.now() + 1,
        sender: 'agent',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, agentMsg]);
    }, 450);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendQuery(inputText);
  };

  const quickPrompts = isRu ? quickQuestionsRu : quickQuestionsEn;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl flex flex-col h-[520px] overflow-hidden">
        {/* Support Header */}
        <div className="p-4 bg-linear-to-r from-amber-50 to-white flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-xs">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-sm">
                {isRu ? 'Онлайн-поддержка' : 'Live Support'}
              </h3>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{isRu ? 'Онлайн' : 'Online'}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl cursor-pointer"
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
                    : 'bg-white text-slate-800 rounded-bl-xs shadow-xs border border-slate-100'
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

        {/* Quick questions chips */}
        <div className="px-3 py-2 bg-slate-100/70 border-t border-slate-200/60 flex items-center gap-1.5 overflow-x-auto">
          {quickPrompts.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => handleSendQuery(q)}
              className="text-[11px] font-bold px-3 py-1 bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-700 rounded-lg shrink-0 border border-slate-200/80 transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSubmit} className="p-3 bg-white flex items-center gap-2 border-t border-slate-100">
          <input
            type="text"
            placeholder={isRu ? 'Напишите ваш вопрос...' : 'Type your question...'}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-2.5 text-xs font-semibold rounded-2xl bg-slate-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
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
