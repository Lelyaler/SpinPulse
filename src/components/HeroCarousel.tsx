import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Flame, 
  Play, 
  Coins
} from 'lucide-react';
import { playButtonClick } from '../utils/casinoAudio';

interface HeroCarouselProps {
  onQuickPlay: () => void;
  onClaimBonus: () => void;
  onOpenTournaments: () => void;
  isRu: boolean;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  onQuickPlay,
  onClaimBonus,
  onOpenTournaments,
  isRu,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const baseUrl = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  const slides = [
    {
      id: 'slide-welcome',
      tag: isRu ? 'ПРИВЕТСТВЕННЫЙ ПАКЕТ' : 'WELCOME PACKAGE',
      title: isRu ? '100% ДО $600 + 500 FS' : '100% UP TO $600 + 500 FS',
      desc: isRu 
        ? 'Удвойте баланс на первый депозит и заберите 500 фриспинов в топовых слотах Pragmatic Play & BGaming!'
        : 'Double your initial deposit and grab 500 free spins in legendary Pragmatic Play & BGaming slots!',
      buttonText: isRu ? 'ЗАБРАТЬ БОНУС' : 'CLAIM BONUS',
      buttonAction: onClaimBonus,
      bgImage: `${baseUrl}banners/hero-welcome.webp`,
      accentBadge: '🔥 500 FS',
    },
    {
      id: 'slide-tournament',
      tag: isRu ? 'АКТИВНЫЙ ТУРНИР' : 'ACTIVE TOURNAMENT',
      title: isRu ? 'WEEKLY GRAND PRIX • $50,000' : 'WEEKLY GRAND PRIX • $50,000',
      desc: isRu
        ? 'Сражайтесь за призовой фонд $50,000! 1 место получает $18,000 наличными. Осталось 35 часов!'
        : 'Compete for the $50,000 prize pool! 1st place wins $18,000 cash. 35 hours remaining!',
      buttonText: isRu ? 'УЧАСТВОВАТЬ' : 'JOIN TOURNAMENT',
      buttonAction: onOpenTournaments,
      bgImage: `${baseUrl}banners/hero-tournament.webp`,
      accentBadge: '🏆 $50,000',
    },
    {
      id: 'slide-olympus',
      tag: isRu ? 'ГОРЯЧИЙ СЛОТ НЕДЕЛИ' : 'HOT GAME OF THE WEEK',
      title: isRu ? 'GATES OF OLYMPUS 1000' : 'GATES OF OLYMPUS 1000',
      desc: isRu
        ? 'Множители Зевса до 1,000x и максимальный выигрыш 15,000x. Испытайте демо-режим прямо сейчас!'
        : 'Zeus lightning multipliers up to 1,000x and 15,000x max win potential. Play demo mode now!',
      buttonText: isRu ? 'ИГРАТЬ В ДЕМО' : 'PLAY DEMO NOW',
      buttonAction: onQuickPlay,
      bgImage: `${baseUrl}banners/hero-olympus.webp`,
      accentBadge: '⚡ 15,000x',
    },
    {
      id: 'slide-crash',
      tag: isRu ? 'КРАШ И FAST GAMES' : 'CRASH & INSTANT GAMES',
      title: isRu ? 'ADRENALINE CRASH • МАКС 10,000x' : 'ADRENALINE CRASH • MAX 10,000x',
      desc: isRu
        ? 'Выводите до падения ракеты! Взрывной азарт, мгновенные раунды и сертифицированный Provably Fair.'
        : 'Cash out before the rocket crashes! Pure adrenaline rush, instant rounds and provably fair RNG.',
      buttonText: isRu ? 'ИГРАТЬ В КРАШ' : 'PLAY CRASH NOW',
      buttonAction: onQuickPlay,
      bgImage: `${baseUrl}banners/hero-crash.webp`,
      accentBadge: '🚀 10,000x',
    },
    {
      id: 'slide-live',
      tag: isRu ? 'LIVE CASINO VIP' : 'LIVE CASINO VIP',
      title: isRu ? 'ПРЯМАЯ ТРАНСЛЯЦИЯ В 4K' : 'LIVE DEALERS STREAM 4K',
      desc: isRu
        ? 'Европейская и американская рулетка, блэкджек и баккара с профессиональными крупье в режиме реального времени.'
        : 'European and American roulette, blackjack and baccarat tables streamed in 4K with real croupiers.',
      buttonText: isRu ? 'К СТОЛАМ' : 'VIEW TABLES',
      buttonAction: onQuickPlay,
      bgImage: `${baseUrl}banners/hero-live.webp`,
      accentBadge: '🎲 REAL 4K',
    },
    {
      id: 'slide-vip',
      tag: isRu ? 'VIP ПРИВИЛЕГИИ' : 'VIP PRIVILEGES',
      title: isRu ? 'КЭШБЭК ДО 20% КАЖДЫЙ ПОНЕДЕЛЬНИК' : 'UP TO 20% WEEKLY CASHBACK',
      desc: isRu
        ? 'Эксклюзивные персональные подарки, увеличенные лимиты и мгновенный кэшбэк без скрытых условий.'
        : 'Exclusive personal perks, increased withdrawal limits and instant weekly cashback with zero hidden wager.',
      buttonText: isRu ? 'УЗНАТЬ БОЛЬШЕ' : 'LEARN MORE',
      buttonAction: onOpenTournaments,
      bgImage: `${baseUrl}banners/hero-vip.webp`,
      accentBadge: '👑 VIP 20%',
    },
  ];

  // Auto rotation every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-xl border border-amber-200/90 bg-linear-to-br from-amber-950 via-slate-900 to-amber-900 text-white min-h-[300px] sm:min-h-[360px] flex items-center">
      {/* Background Graphic Image with transition */}
      <div 
        key={slide.id}
        className="absolute inset-0 bg-cover bg-center opacity-45 mix-blend-overlay scale-105 transition-all duration-700 animate-in fade-in"
        style={{ backgroundImage: `url("${slide.bgImage}")` }}
      />
      
      {/* Warm Golden Glow Gradients */}
      <div className="absolute inset-0 bg-linear-to-r from-amber-950/95 via-slate-950/80 to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Slide Content */}
      <div className="relative z-10 px-6 py-8 sm:px-12 sm:py-10 max-w-2xl">
        {/* Tag Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-linear-to-r from-amber-500/30 to-rose-500/30 border border-amber-300/40 backdrop-blur-md mb-3 text-xs font-black tracking-wider text-amber-200 uppercase">
          <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
          <span>{slide.tag}</span>
          <span className="px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 text-[10px] font-black">
            {slide.accentBadge}
          </span>
        </div>

        {/* Big Slide Title */}
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-3 leading-tight drop-shadow-md">
          {slide.title}
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm text-amber-100/90 font-medium leading-relaxed mb-6 max-w-lg">
          {slide.desc}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              playButtonClick();
              slide.buttonAction();
            }}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-linear-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-amber-500/30 active:scale-95 transition-all cursor-pointer group"
          >
            <Play className="w-4 h-4 fill-slate-950 group-hover:scale-110 transition-transform" />
            <span>{slide.buttonText}</span>
          </button>

          <button
            onClick={() => {
              playButtonClick();
              onClaimBonus();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs sm:text-sm border border-amber-300/30 backdrop-blur-md transition-all cursor-pointer"
          >
            <Coins className="w-4 h-4 text-amber-300" />
            <span>{isRu ? 'Демо пополнение (+$500)' : 'Top Up (+$500)'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute right-4 bottom-4 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-20 flex sm:flex-col gap-2">
        <button
          onClick={() => {
            playButtonClick();
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
          }}
          className="p-2 sm:p-2.5 rounded-full bg-slate-900/70 hover:bg-amber-500 hover:text-slate-950 text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer"
          title="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            playButtonClick();
            setCurrentSlide((prev) => (prev + 1) % slides.length);
          }}
          className="p-2 sm:p-2.5 rounded-full bg-slate-900/70 hover:bg-amber-500 hover:text-slate-950 text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer"
          title="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-6 sm:left-12 z-20 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              playButtonClick();
              setCurrentSlide(idx);
            }}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            title={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
