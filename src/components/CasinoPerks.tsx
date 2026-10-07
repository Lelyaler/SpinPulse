import { ShieldCheck, Zap, Crown, Radio } from 'lucide-react';

export const CasinoPerks: React.FC = () => {
  const perks = [
    {
      icon: ShieldCheck,
      title: 'Provably Fair Gaming',
      desc: 'Cryptographic SHA-256 random seeds verified on-chain for 100% fair outcomes.',
      badge: 'Certified RNG',
    },
    {
      icon: Zap,
      title: 'Zero Latency Engine',
      desc: 'Sub-millisecond spin response with high framerate CSS3 & WebGL rendering.',
      badge: '60 FPS',
    },
    {
      icon: Radio,
      title: 'Studio HD Streams',
      desc: 'Multi-angle VIP tables powered by Evolution Gaming & Pragmatic Play Live.',
      badge: '4K Ultra-HD',
    },
    {
      icon: Crown,
      title: 'Royal VIP Tiers',
      desc: 'Level up your rank to unlock higher spin multipliers, daily drops, and exclusive events.',
      badge: 'Gold Tier Active',
    },
  ];

  return (
    <div className="mt-14 mb-8">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-black uppercase tracking-widest text-amber-600 bg-amber-100/70 px-3 py-1 rounded-full border border-amber-300/40">
          Industry Gold Standard
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
          Why Players Choose <span className="bg-linear-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">SpinPulse VIP</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          Built for true iGaming enthusiasts who appreciate high-end visual design and fair gameplay.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {perks.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-white border border-amber-200/70 shadow-xs hover:shadow-md hover:border-amber-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-700">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                    {p.badge}
                  </span>
                </div>
                <h3 className="font-black text-slate-900 text-sm mb-1.5">{p.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{p.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
