import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ShieldCheck, Zap, Coins, Smartphone, Trophy, Award } from 'lucide-react';
import { playButtonClick } from '../utils/casinoAudio';

interface FaqItem {
  id: string;
  icon: React.ReactNode;
  questionRu: string;
  questionEn: string;
  answerRu: string;
  answerEn: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'demo-balance',
    icon: <Coins className="w-5 h-5 text-amber-500 shrink-0" />,
    questionRu: 'Как работает виртуальный демо-баланс и как его пополнить?',
    questionEn: 'How does the virtual demo balance work and how can I top it up?',
    answerRu: 'При первом входе вам автоматически начисляется стартовый демо-баланс в размере $2,500. Вы можете свободно делать ставки в любых слотах и играх лобби. Если баланс закончился, нажмите кнопку «Депозит» в шапке сайта для мгновенного бесплатного пополнения на +$1,000, забирайте ежедневный бонус +$250 или крутите Колесо Удачи.',
    answerEn: 'Upon your initial visit, you receive a complimentary demo balance of $2,500. You can place wagers across any video slot, crash title, or live table. If your balance runs low, click the "Deposit" button in the header for an instant +$1,000 refill, claim the daily +$250 gift, or spin the Lucky Wheel.',
  },
  {
    id: 'rng-fairness',
    icon: <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />,
    questionRu: 'Гарантируется ли честность игровых раундов (RNG / RTP)?',
    questionEn: 'Is game outcome fairness guaranteed (RNG & RTP)?',
    answerRu: 'Да. Все представленные игры используют сертифицированные математические модели генерации случайных чисел (Provably Fair SHA-256 RNG) с официальным средним возвратом игроку (RTP) от 96.5% до 98.4%. Результаты каждого спина генерируются криптографически независимо от предыдущих раундов.',
    answerEn: 'Yes. All titles utilize certified Provably Fair SHA-256 RNG algorithms matching verified industry math models with an average RTP between 96.5% and 98.4%. Each round is calculated cryptographically without bias or external manipulation.',
  },
  {
    id: 'no-registration',
    icon: <Zap className="w-5 h-5 text-amber-500 shrink-0" />,
    questionRu: 'Нужна ли регистрация или верификация (KYC) для игры?',
    questionEn: 'Is registration or KYC verification required to play?',
    answerRu: 'Регистрация и подтверждение документов не требуются. SpinPulse — это современное интерактивное игровое лобби, где весь функционал доступен моментально прямо в браузере. Ваши настройки, история ставок, избранные слоты и демо-баланс надёжно сохраняются локально в вашем браузере.',
    answerEn: 'Zero signup or identity verification required. SpinPulse is an instant-play interactive gaming portal. All gameplay, betting history, favorites list, and wallet balances are securely stored locally within your browser.',
  },
  {
    id: 'providers-studios',
    icon: <Award className="w-5 h-5 text-purple-500 shrink-0" />,
    questionRu: 'Какие провайдеры софта и слоты представлены в лобби?',
    questionEn: 'Which gaming studios and software providers are featured?',
    answerRu: 'В каталоге собраны хиты ведущих мировых провайдеров: Pragmatic Play, Evolution, Hacksaw Gaming, Push Gaming, NoLimit City, Spribe, 3 Oaks, SmartSoft, Belatra, Endorphina и других. Доступны классические слоты, видеослоты с механикой Megaways и Bonus Buy, моментальные краш-игры (Aviator, JetX, Cappadocia) и live-столы.',
    answerEn: 'The catalog features top titles from premier studios: Pragmatic Play, Evolution, Hacksaw Gaming, Push Gaming, NoLimit City, Spribe, 3 Oaks, Belatra, Endorphina, and more. Explore classic slots, high-volatility Megaways, Bonus Buy releases, crash games, and live dealer lobbies.',
  },
  {
    id: 'tournaments-vip',
    icon: <Trophy className="w-5 h-5 text-amber-500 shrink-0" />,
    questionRu: 'Как участвовать в турнирах и повышать VIP-уровень?',
    questionEn: 'How do I enter tournaments and rank up the VIP club?',
    answerRu: 'Участие в турнирах автоматическое — просто делайте спины в турнирных слотах. За каждый выигрышный множитель вам начисляются турнирные очки в таблице лидеров. Активная игра также накапливает XP для повышения статуса в VIP-клубе, открывая повышенные множители кэшбэка и секретные подарки.',
    answerEn: 'Tournament participation is automatic: just play qualifying slots. Every winning multiplier earns points on the live leaderboard. Regular play also awards VIP XP to advance tier levels, granting higher cashback perks and secret bonuses.',
  },
  {
    id: 'mobile-pwa',
    icon: <Smartphone className="w-5 h-5 text-sky-500 shrink-0" />,
    questionRu: 'Можно ли играть со смартфона или установить приложение?',
    questionEn: 'Can I play on smartphones or install a native app?',
    answerRu: 'Платформа полностью оптимизирована для мобильных устройств iOS и Android. Поддерживаются сенсорные жесты, вертикальный режим и адаптивная графика. Вы можете добавить сайт на главный экран телефона как PWA-приложение («Поделиться» → «На экран Домой» в Safari или «Установить приложение» в Chrome) для быстрого запуска без браузерных рамок.',
    answerEn: 'SpinPulse is built with a mobile-first responsive architecture for iOS and Android. Touch gestures, vertical layouts, and crisp WebP assets are supported out of the box. You can install it directly to your home screen as a PWA app via Safari or Chrome.',
  },
];

interface FaqSectionProps {
  isRu: boolean;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ isRu }) => {
  const [openId, setOpenId] = useState<string | null>('demo-balance');

  const toggleItem = (id: string) => {
    playButtonClick();
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq-section" className="space-y-4 pt-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center font-black shadow-xs">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {isRu ? 'Часто задаваемые вопросы (FAQ)' : 'Frequently Asked Questions (FAQ)'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">
              {isRu 
                ? 'Ответы о демо-режиме, безопасности, провайдерах и механике слотов' 
                : 'Key information about demo mode, fairness, studios, and features'}
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-50 text-amber-900 border border-amber-200/80">
          6 {isRu ? 'ответов' : 'answers'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${
                isOpen 
                  ? 'border-amber-400 shadow-md shadow-orange-500/10 ring-1 ring-amber-300/40' 
                  : 'border-amber-200/80 hover:border-amber-300 shadow-2xs'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                aria-expanded={isOpen}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left cursor-pointer min-h-[56px] select-none group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-2 rounded-xl transition-colors ${
                    isOpen ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 group-hover:bg-amber-50 text-slate-600'
                  }`}>
                    {item.icon}
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-[15px] text-slate-900 leading-snug group-hover:text-orange-600 transition-colors">
                    {isRu ? item.questionRu : item.questionEn}
                  </h3>
                </div>

                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-500 group-hover:bg-amber-100'
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium border-t border-amber-100 bg-amber-50/30">
                  <p>{isRu ? item.answerRu : item.answerEn}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
