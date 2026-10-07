import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playButtonClick, playBigJackpotFanfare, playWinCoinsSound } from '../utils/casinoAudio';

interface LuckyWheelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBalance: (amt: number) => void;
  isRu: boolean;
}

const prizes = [
  { label: '+$100', val: 100, color: '#f59e0b' },
  { label: '+$500', val: 500, color: '#e11d48' },
  { label: '+$250', val: 250, color: '#3b82f6' },
  { label: '+$1,000', val: 1000, color: '#10b981' },
  { label: '+$50', val: 50, color: '#8b5cf6' },
  { label: '+$750', val: 750, color: '#ec4899' },
  { label: '+$200', val: 200, color: '#06b6d4' },
  { label: 'JACKPOT', val: 2500, color: '#f97316' },
];

export const LuckyWheelModal: React.FC<LuckyWheelModalProps> = ({
  isOpen,
  onClose,
  onAddBalance,
  isRu,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSpinWheel = () => {
    if (isSpinning) return;
    playButtonClick();
    setIsSpinning(true);
    setWonPrize(null);

    // Random prize index
    const targetIdx = Math.floor(Math.random() * prizes.length);
    const segmentAngle = 360 / prizes.length;
    const extraSpins = 360 * 5; // 5 full turns
    const targetAngle = extraSpins + (prizes.length - targetIdx) * segmentAngle - segmentAngle / 2;

    setRotation((prev) => prev + targetAngle);

    setTimeout(() => {
      setIsSpinning(false);
      const prize = prizes[targetIdx];
      setWonPrize(prize.label);
      onAddBalance(prize.val);
      playWinCoinsSound();

      if (prize.val >= 1000) {
        playBigJackpotFanfare();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#f59e0b', '#e11d48', '#10b981', '#3b82f6'],
        });
      }
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl border border-amber-200 shadow-2xl p-6 text-center relative overflow-hidden flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 rounded-xl"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h3 className="text-xl font-black text-slate-900">
            {isRu ? 'Колесо Удачи' : 'Wheel of Fortune'}
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-medium mb-6">
          {isRu ? 'Крутите колесо и выигрывайте до $2,500 demo монет!' : 'Spin the wheel and claim up to $2,500 demo coins!'}
        </p>

        {/* Wheel Graphic Container */}
        <div className="relative w-64 h-64 my-2 flex items-center justify-center">
          {/* Wheel Pointer Arrow at Top */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-amber-500 drop-shadow-md" />

          {/* Rotating Wheel Disc */}
          <div
            className="w-full h-full rounded-full border-8 border-amber-400 shadow-2xl relative overflow-hidden transition-all ease-out"
            style={{
              transform: `rotate(${rotation}deg)`,
              transitionDuration: isSpinning ? '4000ms' : '0ms',
              background: 'conic-gradient(#f59e0b 0deg 45deg, #e11d48 45deg 90deg, #3b82f6 90deg 135deg, #10b981 135deg 180deg, #8b5cf6 180deg 225deg, #ec4899 225deg 270deg, #06b6d4 270deg 315deg, #f97316 315deg 360deg)',
            }}
          >
            {/* Center hub */}
            <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-slate-900 border-4 border-amber-300 shadow-inner flex items-center justify-center text-white text-xs font-black z-10">
              🎡
            </div>
          </div>
        </div>

        {/* Won Prize Banner */}
        <div className="h-10 my-2 flex items-center justify-center">
          {wonPrize && (
            <div className="animate-bounce px-4 py-1.5 rounded-full bg-linear-to-r from-amber-500 to-rose-500 text-white font-black text-sm shadow-md">
              🎉 {isRu ? `Вы выиграли: ${wonPrize}!` : `You won: ${wonPrize}!`}
            </div>
          )}
        </div>

        {/* Spin CTA */}
        <button
          onClick={handleSpinWheel}
          disabled={isSpinning}
          className={`w-full py-3.5 rounded-2xl font-black text-sm tracking-wide text-white transition-all shadow-lg active:scale-95 cursor-pointer ${
            isSpinning
              ? 'bg-amber-300 cursor-not-allowed'
              : 'bg-linear-to-r from-amber-500 via-amber-600 to-rose-500 hover:brightness-105 shadow-amber-500/25'
          }`}
        >
          {isSpinning 
            ? (isRu ? 'ВРАЩЕНИЕ...' : 'SPINNING...') 
            : (isRu ? 'КРУТИТЬ КОЛЕСО БЕСПЛАТНО' : 'SPIN WHEEL FOR FREE')}
        </button>
      </div>
    </div>
  );
};
