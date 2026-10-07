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
      id: 'slide-zeus',
      tag: isRu ? 'ГОРЯЧИЙ ХИТ НЕДЕЛИ' : 'HOT GAME OF THE WEEK',
      title: isRu ? 'GATES OF OLYMPUS 1000' : 'GATES OF OLYMPUS 1000',
      desc: isRu
        ? 'Молнии Зевса с множителями до 1,000x и эпический макс-вин 15,000x! Испытайте демо прямо сейчас.'
        : 'Zeus lightning multipliers up to 1,000x and epic 15,000x max win potential! Try demo now.',
      buttonText: isRu ? 'ИГРАТЬ В СЛОТ' : 'PLAY ZEUS NOW',
      buttonAction: onQuickPlay,
      bgImage: `${baseUrl}banners/banner-zeus-bright.webp`,
      accentBadge: '⚡ 15,000x',
    },
    {
      id: 'slide-tournament',
      tag: isRu ? 'ТУРНИР НЕДЕЛИ' : 'WEEKLY GRAND PRIX',
      title: isRu ? 'ТУРНИР НА $50,000 • GRAND PRIX' : 'WEEKLY GRAND PRIX • $50,000',
      desc: isRu
        ? 'Главный приз $18,000 первому месту! Участвуйте во всех слотах и крутите рулетку за очки.'
        : 'Top prize $18,000 cash for 1st place! Compete on all top slots and spin the wheel for points.',
      buttonText: isRu ? 'В ТУРНИР' : 'JOIN TOURNAMENT',
      buttonAction: onOpenTournaments,
      bgImage: `${baseUrl}banners/banner-tournament-bright.webp`,
      accentBadge: '🏆 $50,000',
    },
    {
      id: 'slide-crash',
      tag: isRu ? 'КРАШ И FAST GAMES' : 'CRASH & INSTANT GAMES',
      title: isRu ? 'ADRENALINE CRASH • МАКС 10,000x' : 'ADRENALINE CRASH • MAX 10,000x',
      desc: isRu
        ? 'Успейте забрать выигрыш до взрыва ракеты! Мгновенные раунды с сертифицированным RNG.'
        : 'Cash out before the rocket crashes! Pure adrenaline rush, instant rounds and provably fair RNG.',
      buttonText: isRu ? 'ИГРАТЬ В КРАШ' : 'PLAY CRASH NOW',
      buttonAction: onQuickPlay,
      bgImage: `${baseUrl}banners/banner-crash-bright.webp`,
      accentBadge: '🚀 10,000x',
    },
    {
      id: 'slide-welcome',
      tag: isRu ? 'ПРИВЕТСТВЕННЫЙ ПАКЕТ' : 'WELCOME PACKAGE',
      title: isRu ? '100% ДО $600 + 500 FS' : '100% UP TO $600 + 500 FS',
      desc: isRu 
        ? 'Удвойте баланс на первый депозит и заберите 500 фриспинов в топовых видеослотах!'
        : 'Double your initial deposit and grab 500 free spins in legendary video slots!',
      buttonText: isRu ? 'ЗАБРАТЬ БОНУС' : 'CLAIM BONUS',
      buttonAction: onClaimBonus,
      bgImage: `${baseUrl}banners/hero-welcome.webp`,
      accentBadge: '🔥 500 FS',
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
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-300/40 bg-slate-950 text-white min-h-[440px] sm:min-h-[500px] lg:min-h-[550px] flex items-center">
      {/* Crisp, Vivid Full-Resolution Banner Artwork anchored to top so head is never cropped */}
      <img
        key={slide.id}
        src={slide.bgImage}
        alt={slide.title}
        fetchPriority={currentSlide === 0 ? 'high' : 'auto'}
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-[center_top] sm:object-[right_top] md:object-[center_top] brightness-105 contrast-105 transition-all duration-700 select-none animate-in fade-in"
      />

      {/* Subtle directional vignette only on the left side to keep text crisp, leaving 70% of artwork brilliant */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/30 to-transparent pointer-events-none" />

      {/* Main Slide Content Card */}
      <div className="relative z-10 m-4 sm:m-8 lg:m-10 max-w-xl p-5 sm:p-7 rounded-3xl bg-slate-950/50 backdrop-blur-md border border-white/20 shadow-2xl">
        {/* Tag Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r from-amber-500/40 to-rose-500/40 border border-amber-300/50 backdrop-blur-md mb-2.5 text-xs font-black tracking-wider text-amber-200 uppercase">
          <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300 animate-pulse" />
          <span>{slide.tag}</span>
          <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
            {slide.accentBadge}
          </span>
        </div>

        {/* Big Slide Title */}
        <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mb-2 leading-tight drop-shadow-md">
          {slide.title}
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm text-amber-100 font-medium leading-relaxed mb-5 max-w-md">
          {slide.desc}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              playButtonClick();
              slide.buttonAction();
            }}
            aria-label={slide.buttonText}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-linear-to-r from-amber-400 via-amber-300 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-amber-400/40 active:scale-95 transition-all cursor-pointer group"
          >
            <Play className="w-4 h-4 fill-slate-950 group-hover:scale-110 transition-transform" />
            <span>{slide.buttonText}</span>
          </button>

          <button
            onClick={() => {
              playButtonClick();
              onClaimBonus();
            }}
            aria-label={isRu ? 'Демо пополнение баланса на 500 долларов' : 'Top up balance by $500'}
            className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-95 text-white font-bold text-xs sm:text-sm border border-amber-300/40 backdrop-blur-md transition-all cursor-pointer"
          >
            <Coins className="w-4 h-4 text-amber-300" />
            <span>{isRu ? 'Демо баланс (+$500)' : 'Top Up (+$500)'}</span>
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
          aria-label={isRu ? 'Предыдущий баннер' : 'Previous slide'}
          className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-amber-400 hover:text-slate-950 text-white border border-white/25 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => {
            playButtonClick();
            setCurrentSlide((prev) => (prev + 1) % slides.length);
          }}
          aria-label={isRu ? 'Следующий баннер' : 'Next slide'}
          className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-amber-400 hover:text-slate-950 text-white border border-white/25 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
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
            aria-label={isRu ? `Перейти к слайду ${idx + 1}` : `Go to slide ${idx + 1}`}
            className={`h-2.5 rounded-full transition-all cursor-pointer ${
              currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2.5 bg-white/40 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
