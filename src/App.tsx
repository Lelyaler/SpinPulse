import React, { useState, useEffect, useMemo, useRef, Suspense, lazy } from 'react';
import { Gamepad2 } from 'lucide-react';
import { GameCategory, PlacedCasinoBet } from './types';
import { gamesCatalog } from './data/gamesCatalog';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { JackpotAndWins } from './components/JackpotAndWins';
import { CategoryNav } from './components/CategoryNav';
import { GameCard } from './components/GameCard';
import { isSoundEnabled, playWinCoinsSound } from './utils/casinoAudio';

const TournamentCard = lazy(() => import('./components/TournamentCard').then((m) => ({ default: m.TournamentCard })));
const VipLoyaltyBar = lazy(() => import('./components/VipLoyaltyBar').then((m) => ({ default: m.VipLoyaltyBar })));
const CasinoPerks = lazy(() => import('./components/CasinoPerks').then((m) => ({ default: m.CasinoPerks })));
const LuckyWheelModal = lazy(() => import('./components/LuckyWheelModal').then((m) => ({ default: m.LuckyWheelModal })));
const BonusesModal = lazy(() => import('./components/BonusesModal').then((m) => ({ default: m.BonusesModal })));
const SupportModal = lazy(() => import('./components/SupportModal').then((m) => ({ default: m.SupportModal })));
const RecentPlaysDrawer = lazy(() => import('./components/RecentPlaysDrawer').then((m) => ({ default: m.RecentPlaysDrawer })));

export const App: React.FC = () => {
  // Language State ('RU' default as requested by user, toggleable to 'EN')
  const [currentLanguage, setCurrentLanguage] = useState<'RU' | 'EN'>(() => {
    const saved = localStorage.getItem('spinpulse_lang');
    return saved === 'EN' ? 'EN' : 'RU';
  });

  const isRu = currentLanguage === 'RU';

  useEffect(() => {
    localStorage.setItem('spinpulse_lang', currentLanguage);
  }, [currentLanguage]);

  // Sidebar toggle state
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Demo Balance with localStorage persistence
  const [balance, setBalance] = useState<number>(() => {
    const saved = localStorage.getItem('spinpulse_balance');
    return saved ? Number(saved) : 2500;
  });

  const [soundActive, setSoundActive] = useState<boolean>(() => isSoundEnabled());
  const [activeCategory, setActiveCategory] = useState<GameCategory>('all');
  const [selectedProvider, setSelectedProvider] = useState<string>('All Providers');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Favorites list with localStorage persistence
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('spinpulse_favorites');
    return saved ? JSON.parse(saved) : ['slot-olympus', 'slot-bonanza'];
  });

  useEffect(() => {
    localStorage.setItem('spinpulse_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (gameId: string) => {
    setFavorites((prev) => 
      prev.includes(gameId) ? prev.filter((id) => id !== gameId) : [...prev, gameId]
    );
  };

  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isLuckyWheelOpen, setIsLuckyWheelOpen] = useState<boolean>(false);
  const [isBonusesOpen, setIsBonusesOpen] = useState<boolean>(false);
  const [isSupportOpen, setIsSupportOpen] = useState<boolean>(false);

  // Ref for smooth scrolling
  const tournamentSectionRef = useRef<HTMLDivElement>(null);
  const vipSectionRef = useRef<HTMLDivElement>(null);

  const [history, setHistory] = useState<PlacedCasinoBet[]>(() => {
    const saved = localStorage.getItem('spinpulse_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [hasClaimedDaily, setHasClaimedDaily] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('spinpulse_balance', balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('spinpulse_history', JSON.stringify(history));
  }, [history]);

  const handleTopUp = () => {
    setBalance((prev) => prev + 500);
  };

  const handleClaimDailyBonus = () => {
    if (!hasClaimedDaily) {
      setBalance((prev) => prev + 250);
      setHasClaimedDaily(true);
      playWinCoinsSound();
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  // Filter games based on category, provider, search query, and favorites
  const filteredGames = useMemo(() => {
    return gamesCatalog.filter((game) => {
      // Favorites filter
      if (activeCategory === 'favorites') {
        if (!favorites.includes(game.id)) return false;
      } else if (activeCategory === 'bonusbuy') {
        if (!game.isBonusBuy) return false;
      } else if (activeCategory === 'jackpot') {
        if (!game.isHot && game.volatility !== 'Very High') return false;
      } else if (activeCategory !== 'all' && game.category !== activeCategory) {
        return false;
      }

      // Provider filter
      if (selectedProvider !== 'All Providers' && game.provider !== selectedProvider) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = game.title.toLowerCase().includes(query);
        const matchesProvider = game.provider.toLowerCase().includes(query);
        const matchesCategory = game.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesProvider && !matchesCategory) return false;
      }

      return true;
    });
  }, [activeCategory, selectedProvider, searchQuery, favorites]);

  // Progressive game display to prevent excessive DOM size and maximize mobile performance
  const getInitialVisibleCount = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return 8;
    }
    return 12;
  };

  const [visibleCount, setVisibleCount] = useState<number>(getInitialVisibleCount);

  useEffect(() => {
    setVisibleCount(getInitialVisibleCount());
  }, [activeCategory, selectedProvider, searchQuery]);

  // Defer below-the-fold content until initial critical paint finishes
  const [showDeferred, setShowDeferred] = useState(false);

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const handle = (window as any).requestIdleCallback(() => setShowDeferred(true), { timeout: 800 });
      return () => (window as any).cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(() => setShowDeferred(true), 150);
      return () => clearTimeout(timer);
    }
  }, []);

  const displayedGames = useMemo(() => {
    return filteredGames.slice(0, visibleCount);
  }, [filteredGames, visibleCount]);

  const scrollToTournament = () => {
    tournamentSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const scrollToVip = () => {
    vipSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50/60 via-orange-50/25 to-slate-100/70 text-slate-800 antialiased flex flex-col font-sans relative selection:bg-orange-500 selection:text-white">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onOpenTournaments={scrollToTournament}
        onOpenBonuses={() => setIsBonusesOpen(true)}
        onOpenVip={scrollToVip}
        onOpenLuckyWheel={() => setIsLuckyWheelOpen(true)}
        onOpenSupport={() => setIsSupportOpen(true)}
        currentLanguage={currentLanguage}
        onToggleLanguage={() => setCurrentLanguage(isRu ? 'EN' : 'RU')}
        favoritesCount={favorites.length}
      />

      <div className="lg:pl-80 flex flex-col flex-1">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          balance={balance}
          onTopUp={handleTopUp}
          onOpenHistory={() => setIsHistoryOpen(true)}
          soundActive={soundActive}
          onToggleSound={setSoundActive}
          onClaimDailyBonus={handleClaimDailyBonus}
          hasClaimedDaily={hasClaimedDaily}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isRu={isRu}
          onOpenVip={scrollToVip}
        />

        <main className="flex-1 w-full max-w-7xl 2xl:max-w-[1536px] px-4 sm:px-6 lg:px-8 py-6 space-y-6 sm:space-y-8">
          <HeroCarousel
            onClaimBonus={handleTopUp}
            onOpenTournaments={scrollToTournament}
            isRu={isRu}
          />

          <JackpotAndWins isRu={isRu} />

          <CategoryNav
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            selectedProvider={selectedProvider}
            onSelectProvider={setSelectedProvider}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalGames={filteredGames.length}
            favoritesCount={favorites.length}
            isRu={isRu}
          />

          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xl sm:text-2xl select-none">🔥</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {activeCategory === 'all' && (isRu ? 'Все игры лобби' : 'All Lobby Titles')}
                  {activeCategory === 'slots' && (isRu ? 'Популярные видеослоты' : 'Premium Video Slots')}
                  {activeCategory === 'live' && (isRu ? 'Live Столы с дилерами' : 'Evolution Live Dealers')}
                  {activeCategory === 'crash' && (isRu ? 'Краш-игры и Instant' : 'Instant Crash Games')}
                  {activeCategory === 'bonusbuy' && (isRu ? 'Слоты с покупкой бонуса' : 'Bonus Buy Slots')}
                  {activeCategory === 'jackpot' && (isRu ? 'Джекпот-игры' : 'High Volatility Jackpots')}
                  {activeCategory === 'table' && (isRu ? 'Классические настольные' : 'Classic Table Games')}
                  {activeCategory === 'favorites' && (isRu ? 'Ваши избранные игры' : 'Your Favorites')}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300/80 shadow-2xs">
                  {filteredGames.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold shadow-2xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>{isRu ? '1,842 онлайн' : '1,842 Online'}</span>
                  <span className="text-emerald-400">•</span>
                  <span>{isRu ? 'RTP 98.4%' : 'RTP 98.4%'}</span>
                </div>
                <div className="text-xs font-semibold text-slate-500 hidden sm:block">
                  {isRu ? 'Сертифицированный RNG' : 'Provably Fair RNG'}
                </div>
              </div>
            </div>

            {filteredGames.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-3xl border border-slate-200/80 p-8">
                <Gamepad2 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="text-base font-black text-slate-700">
                  {isRu ? 'Игры не найдены' : 'No games found'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto font-medium">
                  {isRu 
                    ? 'По выбранным критериям ничего не найдено. Попробуйте сбросить фильтры или выбрать "Все игры".' 
                    : 'No titles matched your filter or search criteria. Try choosing "All Games" or clearing search.'}
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setSelectedProvider('All Providers');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer min-h-[44px]"
                >
                  {isRu ? 'Сбросить фильтры' : 'Reset Filters'}
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3.5 sm:gap-4">
                  {displayedGames.map((game) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      isFavorite={favorites.includes(game.id)}
                      onToggleFavorite={handleToggleFavorite}
                      isRu={isRu}
                    />
                  ))}
                </div>

                {filteredGames.length > visibleCount && (
                  <div className="flex justify-center pt-5 pb-2">
                    <button
                      onClick={() => {
                        const step = typeof window !== 'undefined' && window.innerWidth < 640 ? 8 : 12;
                        setVisibleCount((prev) => prev + step);
                      }}
                      aria-label={isRu ? 'Показать еще игры' : 'Show more games'}
                      className="px-8 py-3.5 rounded-2xl bg-linear-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 active:scale-95 text-slate-950 font-black text-xs sm:text-sm shadow-md shadow-orange-500/20 transition-all cursor-pointer flex items-center gap-2 min-h-[44px]"
                    >
                      <span>
                        {isRu 
                          ? `ПОКАЗАТЬ ЕЩЁ (+${Math.min(typeof window !== 'undefined' && window.innerWidth < 640 ? 8 : 12, filteredGames.length - visibleCount)})` 
                          : `SHOW MORE (+${Math.min(typeof window !== 'undefined' && window.innerWidth < 640 ? 8 : 12, filteredGames.length - visibleCount)})`}
                      </span>
                      <span className="text-slate-800 text-xs font-bold">
                        ({visibleCount} / {filteredGames.length})
                      </span>
                    </button>
                  </div>
                )}
              </>
            )}
          </section>

          {showDeferred && (
            <Suspense fallback={null}>
              <div ref={tournamentSectionRef} className="pt-2">
                <TournamentCard isRu={isRu} />
              </div>

              <div ref={vipSectionRef} className="pt-2">
                <VipLoyaltyBar isRu={isRu} />
              </div>

              <div className="p-6 sm:p-7 rounded-3xl bg-linear-to-r from-amber-50/80 via-white to-orange-50/80 border border-amber-200/80 shadow-xs">
                <div className="text-center mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 border border-amber-200 text-amber-900 text-[11px] font-black uppercase tracking-wider">
                    ⚡ {isRu ? 'Официальные сертифицированные провайдеры софта' : 'Official Licensed Game Studios & Providers'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
                  {['PRAGMATIC PLAY', 'EVOLUTION', 'HACKSAW GAMING', 'SPRIBE', 'NETENT', 'PLAY\'N GO', 'NOLIMIT CITY'].map((studio) => (
                    <span 
                      key={studio}
                      className="px-3.5 py-1.5 rounded-xl bg-white border border-amber-200/80 text-xs sm:text-sm font-black tracking-tight text-slate-800 hover:text-orange-600 hover:border-amber-400 hover:shadow-xs transition-all cursor-default shadow-2xs select-none"
                    >
                      {studio}
                    </span>
                  ))}
                </div>
              </div>

              <CasinoPerks isRu={isRu} />
            </Suspense>
          )}
        </main>

        <footer className="mt-auto border-t-2 border-orange-800/60 bg-linear-to-br from-orange-950 via-orange-900 to-amber-950 text-white py-12 px-4 sm:px-6 lg:px-8 shadow-inner relative overflow-hidden">
          {/* Subtle warm ambient gaming glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-orange-950/40 rounded-full blur-3xl pointer-events-none" />

          <div className="w-full max-w-7xl 2xl:max-w-[1536px] px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
            {/* Payment methods badges - high contrast white pills */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 py-3 border-b border-orange-800/40 text-xs font-black">
              <span className="text-orange-200 text-xs uppercase tracking-wider font-extrabold mr-2 select-none">
                {isRu ? 'Мгновенные методы:' : 'Instant Payouts:'}
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-white/95 text-slate-900 shadow-xs border border-white hover:scale-105 transition-transform cursor-default">VISA</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-white/95 text-slate-900 shadow-xs border border-white hover:scale-105 transition-transform cursor-default">MASTERCARD</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-white/95 text-slate-900 shadow-xs border border-white hover:scale-105 transition-transform cursor-default">BITCOIN</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-white/95 text-slate-900 shadow-xs border border-white hover:scale-105 transition-transform cursor-default">ETHEREUM</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-white/95 text-slate-900 shadow-xs border border-white hover:scale-105 transition-transform cursor-default">USDT TRC20</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-white/95 text-slate-900 shadow-xs border border-white hover:scale-105 transition-transform cursor-default">SKRILL</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-white/95 text-slate-900 shadow-xs border border-white hover:scale-105 transition-transform cursor-default">APPLE PAY</span>
            </div>

            {/* Brand & info bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-slate-950/90 border border-amber-400/40 flex items-center justify-center text-amber-400 text-lg font-black shadow-md">
                  👑
                </div>
                <div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <span className="text-lg font-black text-white tracking-tight">SpinPulse VIP Lounge</span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-slate-950/70 text-amber-300 border border-amber-300/30">
                      OFFICIAL
                    </span>
                  </div>
                  <p className="text-xs text-orange-100/90 font-medium mt-0.5 max-w-md">
                    {isRu 
                      ? 'Премиальный демонстрационный симулятор онлайн-казино. Сертифицированный генератор чисел, моментальные спины и честная игра.'
                      : 'High-end demo iGaming portal & casino simulator. Provably fair RNG, instant spins, and entertainment demo credits.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-bold text-white">
                <span className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-black shadow-xs">
                  18+
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-950/70 border border-amber-400/30 text-amber-200">
                  {isRu ? 'Демо-валюта' : 'Demo Currency'}
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-950/70 border border-amber-400/30 text-amber-200">
                  {isRu ? 'Сертифицированный RNG' : 'Certified Fair RNG'}
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-950/70 border border-amber-400/30 text-amber-200">
                  Demo License #8048/JAZ
                </span>
              </div>
            </div>

            {/* Responsible gaming notice */}
            <div className="pt-4 border-t border-orange-800/40 text-center text-[11px] text-orange-200/80 font-medium">
              {isRu
                ? '© 2026 SpinPulse Casino. Играйте ответственно. Все слоты и игры предназначены исключительно для ознакомительных и развлекательных целей с виртуальными очками.'
                : '© 2026 SpinPulse Casino. Play responsibly. All titles and simulations are strictly intended for entertainment purposes using virtual demo coins.'}
            </div>
          </div>
        </footer>
      </div>

      {/* Lazy-Loaded Modals & Drawers wrapped in Suspense */}
      <Suspense fallback={null}>
        {isLuckyWheelOpen && (
          <LuckyWheelModal
            isOpen={true}
            onClose={() => setIsLuckyWheelOpen(false)}
            onAddBalance={handleTopUp}
            isRu={isRu}
          />
        )}

        {isBonusesOpen && (
          <BonusesModal
            isOpen={true}
            onClose={() => setIsBonusesOpen(false)}
            onActivateBonus={(amt) => setBalance((prev) => prev + amt)}
            isRu={isRu}
          />
        )}

        {isSupportOpen && (
          <SupportModal
            isOpen={true}
            onClose={() => setIsSupportOpen(false)}
            isRu={isRu}
          />
        )}

        {isHistoryOpen && (
          <RecentPlaysDrawer
            isOpen={true}
            onClose={() => setIsHistoryOpen(false)}
            history={history}
            onClearHistory={handleClearHistory}
            isRu={isRu}
          />
        )}
      </Suspense>
    </div>
  );
};

export default App;
