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
      bgImage: `${baseUrl}banners/banner-welcome-bright.webp`,
      accentBadge: '🔥 500 FS',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-xl bg-slate-950 text-white min-h-[400px] sm:min-h-[500px] lg:min-h-[550px] flex items-center">
      <img
        key={slide.id}
        src={slide.bgImage}
        alt={slide.title}
        fetchPriority={currentSlide === 0 ? 'high' : 'auto'}
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-[center_top] sm:object-[right_top] md:object-[center_top] transition-all duration-700 select-none"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/30 to-transparent pointer-events-none" />

      <div className="relative z-10 m-4 sm:m-8 lg:m-10 max-w-xl p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-slate-950/55 backdrop-blur-md border border-white/10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md mb-3 text-xs font-bold tracking-wider text-amber-300 uppercase">
          <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
          <span>{slide.tag}</span>
          <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
            {slide.accentBadge}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mb-2 leading-tight">
          {slide.title}
        </h2>

        <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed mb-5 max-w-md">
          {slide.desc}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              playButtonClick();
              slide.buttonAction();
            }}
            aria-label={slide.buttonText}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer min-h-[44px]"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>{slide.buttonText}</span>
          </button>

          <button
            onClick={() => {
              playButtonClick();
              onClaimBonus();
            }}
            aria-label={isRu ? 'Демо пополнение баланса на 500 долларов' : 'Top up balance by $500'}
            className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-medium text-xs sm:text-sm backdrop-blur-md transition-all cursor-pointer min-h-[44px]"
          >
            <Coins className="w-4 h-4 text-amber-300" />
            <span>{isRu ? 'Демо (+$500)' : 'Top Up (+$500)'}</span>
          </button>
        </div>
      </div>

      <div className="absolute right-4 bottom-4 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-20 flex sm:flex-col gap-2">
        <button
          onClick={() => {
            playButtonClick();
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
          }}
          aria-label={isRu ? 'Предыдущий баннер' : 'Previous slide'}
          className="w-11 h-11 rounded-full bg-slate-950/60 hover:bg-white hover:text-slate-950 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => {
            playButtonClick();
            setCurrentSlide((prev) => (prev + 1) % slides.length);
          }}
          aria-label={isRu ? 'Следующий баннер' : 'Next slide'}
          className="w-11 h-11 rounded-full bg-slate-950/60 hover:bg-white hover:text-slate-950 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute bottom-4 left-4 sm:left-10 z-20 flex items-center gap-1">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              playButtonClick();
              setCurrentSlide(idx);
            }}
            aria-label={isRu ? `Перейти к слайду ${idx + 1}` : `Go to slide ${idx + 1}`}
            className="min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer p-1"
          >
            <span
              className={`h-2 rounded-full transition-all block ${
                currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/80'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
