import React, { useState } from 'react';
import { X, Gift, Check, Copy } from 'lucide-react';
import { promoOffers } from '../data/gamesCatalog';
import { playWinCoinsSound } from '../utils/casinoAudio';

interface BonusesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActivateBonus: (bonusVal: number) => void;
  isRu: boolean;
}

export const BonusesModal: React.FC<BonusesModalProps> = ({
  isOpen,
  onClose,
  onActivateBonus,
  isRu,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activatedIds, setActivatedIds] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleActivate = (id: string, bonusVal: number) => {
    if (activatedIds.includes(id)) return;
    playWinCoinsSound();
    setActivatedIds((prev) => [...prev, id]);
    onActivateBonus(bonusVal);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-xl bg-white rounded-3xl border border-amber-200 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-amber-100 bg-amber-50/50 flex items-center justify-between relative overflow-hidden">
          <img 
            src={`${import.meta.env.BASE_URL}banners/chest.png`} 
            alt="Chest" 
            className="absolute -right-2 -bottom-2 w-20 h-20 opacity-25 pointer-events-none object-contain"
          />
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-300/40 flex items-center justify-center text-rose-600">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base">
                {isRu ? 'Бонусы и Акции' : 'Bonuses & Promotions'}
              </h3>
              <span className="text-xs text-slate-500 font-semibold">
                {isRu ? 'Активируйте эксклюзивные промокоды' : 'Activate exclusive bonus codes'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Offers List */}
        <div className="p-5 overflow-y-auto space-y-4">
          {promoOffers.map((offer, idx) => {
            const isActivated = activatedIds.includes(offer.id);
            const bonusAmount = idx === 0 ? 600 : idx === 1 ? 300 : 250;

            return (
              <div
                key={offer.id}
                className="p-4 rounded-2xl border border-amber-200/80 bg-linear-to-r from-amber-50/40 to-white shadow-xs hover:border-amber-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <span className="inline-block px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-rose-100 text-rose-700 mb-1.5">
                    {offer.tag}
                  </span>
                  <h4 className="font-black text-slate-900 text-sm leading-snug">
                    {offer.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">{offer.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleCopy(offer.bonusCode)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[11px] font-bold transition-colors cursor-pointer"
                    >
                      {copiedCode === offer.bonusCode ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{offer.bonusCode}</span>
                    </button>
                    <span className="text-[11px] font-black text-emerald-600">
                      +{bonusAmount} Demo Coins
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleActivate(offer.id, bonusAmount)}
                  disabled={isActivated}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs shrink-0 transition-all cursor-pointer ${
                    isActivated
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20 active:scale-95'
                  }`}
                >
                  {isActivated 
                    ? (isRu ? 'АКТИВИРОВАН' : 'ACTIVATED') 
                    : (isRu ? 'АКТИВИРОВАТЬ' : 'ACTIVATE')}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
