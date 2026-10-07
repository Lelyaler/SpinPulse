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
import { TournamentCard } from './components/TournamentCard';
import { VipLoyaltyBar } from './components/VipLoyaltyBar';
import { CasinoPerks } from './components/CasinoPerks';
import { isSoundEnabled, playWinCoinsSound } from './utils/casinoAudio';

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
      return 12;
    }
    return 24;
  };

  const [visibleCount, setVisibleCount] = useState<number>(getInitialVisibleCount);

  useEffect(() => {
    setVisibleCount(getInitialVisibleCount());
  }, [activeCategory, selectedProvider, searchQuery]);

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
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased flex flex-col font-sans">
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

      <div className="lg:pl-64 flex flex-col flex-1">
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

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 sm:space-y-8 w-full">
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
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
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-200/80 text-slate-700">
                  {filteredGames.length}
                </span>
              </div>

              <div className="text-xs font-semibold text-slate-500 hidden sm:block">
                {isRu ? 'Сертифицированный RNG • Демо-кредиты' : 'Provably Fair • Instant Demo Currency'}
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
                        const step = typeof window !== 'undefined' && window.innerWidth < 640 ? 12 : 24;
                        setVisibleCount((prev) => prev + step);
                      }}
                      aria-label={isRu ? 'Показать еще игры' : 'Show more games'}
                      className="px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-50 active:scale-95 border border-slate-200 font-bold text-xs sm:text-sm text-slate-900 shadow-xs hover:shadow-sm transition-all cursor-pointer flex items-center gap-2 min-h-[44px]"
                    >
                      <span>
                        {isRu 
                          ? `ПОКАЗАТЬ ЕЩЁ (+${Math.min(typeof window !== 'undefined' && window.innerWidth < 640 ? 12 : 24, filteredGames.length - visibleCount)})` 
                          : `SHOW MORE (+${Math.min(typeof window !== 'undefined' && window.innerWidth < 640 ? 12 : 24, filteredGames.length - visibleCount)})`}
                      </span>
                      <span className="text-slate-500 text-xs font-semibold">
                        ({visibleCount} / {filteredGames.length})
                      </span>
                    </button>
                  </div>
                )}
              </>
            )}
          </section>

          <div ref={tournamentSectionRef} className="pt-2">
            <TournamentCard isRu={isRu} />
          </div>

          <div ref={vipSectionRef} className="pt-2">
            <VipLoyaltyBar isRu={isRu} />
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-100 shadow-xs">
            <div className="text-center mb-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                {isRu ? 'Официальные сертифицированные провайдеры софта' : 'Official Licensed Game Studios & Providers'}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-75 hover:opacity-100 transition-opacity">
              <span className="text-sm sm:text-base font-black tracking-tight text-slate-700 hover:text-slate-900 transition-colors cursor-default">
                PRAGMATIC PLAY
              </span>
              <span className="text-sm sm:text-base font-black tracking-tight text-slate-700 hover:text-slate-900 transition-colors cursor-default">
                EVOLUTION
              </span>
              <span className="text-sm sm:text-base font-black tracking-tight text-slate-700 hover:text-slate-900 transition-colors cursor-default">
                HACKSAW GAMING
              </span>
              <span className="text-sm sm:text-base font-black tracking-tight text-slate-700 hover:text-slate-900 transition-colors cursor-default">
                SPRIBE
              </span>
              <span className="text-sm sm:text-base font-black tracking-tight text-slate-700 hover:text-slate-900 transition-colors cursor-default">
                NETENT
              </span>
              <span className="text-sm sm:text-base font-black tracking-tight text-slate-700 hover:text-slate-900 transition-colors cursor-default">
                PLAY&apos;N GO
              </span>
              <span className="text-sm sm:text-base font-black tracking-tight text-slate-700 hover:text-slate-900 transition-colors cursor-default">
                NOLIMIT CITY
              </span>
            </div>
          </div>

          <CasinoPerks isRu={isRu} />
        </main>

        <footer className="mt-auto border-t border-slate-200/80 bg-white py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-4 border-b border-slate-100 text-xs font-semibold text-slate-500">
              <span className="px-3 py-1 rounded-xl bg-slate-50 border border-slate-100">VISA</span>
              <span className="px-3 py-1 rounded-xl bg-slate-50 border border-slate-100">MASTERCARD</span>
              <span className="px-3 py-1 rounded-xl bg-slate-50 border border-slate-100">BITCOIN</span>
              <span className="px-3 py-1 rounded-xl bg-slate-50 border border-slate-100">ETHEREUM</span>
              <span className="px-3 py-1 rounded-xl bg-slate-50 border border-slate-100">USDT TRC20</span>
              <span className="px-3 py-1 rounded-xl bg-slate-50 border border-slate-100">SKRILL</span>
              <span className="px-3 py-1 rounded-xl bg-slate-50 border border-slate-100">APPLE PAY</span>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-amber-400 text-sm font-black shadow-xs">
                  👑
                </div>
                <div>
                  <span className="text-base font-black text-slate-900">SpinPulse VIP Lounge</span>
                  <p className="text-xs text-slate-500 font-medium">
                    {isRu 
                      ? 'Премиальный демонстрационный симулятор онлайн-казино. React 19 & Tailwind CSS.'
                      : 'High-end demo iGaming portal & casino simulator. React 19 & Tailwind CSS.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-600">
                <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  18+
                </span>
                <span>{isRu ? 'Демо-валюта' : 'Demo Currency Only'}</span>
                <span>•</span>
                <span>{isRu ? 'Сертифицированный RNG' : 'Certified Fair RNG'}</span>
                <span>•</span>
                <span>Demo License #8048/JAZ</span>
              </div>
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
