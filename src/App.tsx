import React, { useState, useEffect, useMemo, useRef, Suspense, lazy } from 'react';
import { Gamepad2 } from 'lucide-react';
import { GameCategory, GameItem } from './types';
import { gamesCatalog } from './data/gamesCatalog';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { JackpotAndWins } from './components/JackpotAndWins';
import { CategoryNav } from './components/CategoryNav';
import { GameCard } from './components/GameCard';
import { isSoundEnabled } from './utils/casinoAudio';
import { useWallet } from './hooks/useWallet';
import { useFavorites } from './hooks/useFavorites';
import { useRecentBets } from './hooks/useRecentBets';

const FaqSection = lazy(() => import('./components/FaqSection').then((m) => ({ default: m.FaqSection })));
const TournamentCard = lazy(() => import('./components/TournamentCard').then((m) => ({ default: m.TournamentCard })));
const VipLoyaltyBar = lazy(() => import('./components/VipLoyaltyBar').then((m) => ({ default: m.VipLoyaltyBar })));
const CasinoPerks = lazy(() => import('./components/CasinoPerks').then((m) => ({ default: m.CasinoPerks })));
const LuckyWheelModal = lazy(() => import('./components/LuckyWheelModal').then((m) => ({ default: m.LuckyWheelModal })));
const BonusesModal = lazy(() => import('./components/BonusesModal').then((m) => ({ default: m.BonusesModal })));
const SupportModal = lazy(() => import('./components/SupportModal').then((m) => ({ default: m.SupportModal })));
const RecentPlaysDrawer = lazy(() => import('./components/RecentPlaysDrawer').then((m) => ({ default: m.RecentPlaysDrawer })));
const SlotGameModal = lazy(() => import('./components/SlotGameModal').then((m) => ({ default: m.SlotGameModal })));

export const App: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'RU' | 'EN'>(() => {
    try {
      const saved = localStorage.getItem('spinpulse_lang');
      return saved === 'EN' ? 'EN' : 'RU';
    } catch {
      return 'RU';
    }
  });

  const isRu = currentLanguage === 'RU';

  useEffect(() => {
    try {
      localStorage.setItem('spinpulse_lang', currentLanguage);
    } catch {
      // storage unavailable
    }
  }, [currentLanguage]);

  // Wallet, favorites and history custom hooks
  const { balance, addBalance, deductBalance, topUp, hasClaimedDaily, claimDailyBonus } = useWallet();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { history, addBet, clearHistory } = useRecentBets();

  // Navigation & filters
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(() => isSoundEnabled());
  const [activeCategory, setActiveCategory] = useState<GameCategory>('all');
  const [selectedProvider, setSelectedProvider] = useState('All Providers');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isLuckyWheelOpen, setIsLuckyWheelOpen] = useState(false);
  const [isBonusesOpen, setIsBonusesOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);

  // Section references
  const tournamentSectionRef = useRef<HTMLDivElement>(null);
  const vipSectionRef = useRef<HTMLDivElement>(null);

  const filteredGames = useMemo(() => {
    return gamesCatalog.filter((game) => {
      if (activeCategory === 'favorites') {
        if (!favorites.includes(game.id)) return false;
      } else if (activeCategory === 'bonusbuy') {
        if (!game.isBonusBuy) return false;
      } else if (activeCategory === 'jackpot') {
        if (!game.isHot && game.volatility !== 'Very High') return false;
      } else if (activeCategory !== 'all' && game.category !== activeCategory) {
        return false;
      }

      if (selectedProvider !== 'All Providers' && game.provider !== selectedProvider) {
        return false;
      }

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

  const [visibleCount, setVisibleCount] = useState(18);

  useEffect(() => {
    setVisibleCount(18);
  }, [activeCategory, selectedProvider, searchQuery]);

  const [showDeferred, setShowDeferred] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowDeferred(true), 250);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-amber-300 selection:text-amber-950">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setIsSidebarOpen(false);
        }}
        onOpenTournaments={() => {
          tournamentSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
          setIsSidebarOpen(false);
        }}
        onOpenVip={() => {
          vipSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
          setIsSidebarOpen(false);
        }}
        onOpenSupport={() => {
          setIsSupportOpen(true);
          setIsSidebarOpen(false);
        }}
        onOpenLuckyWheel={() => {
          setIsLuckyWheelOpen(true);
          setIsSidebarOpen(false);
        }}
        onOpenBonuses={() => {
          setIsBonusesOpen(true);
          setIsSidebarOpen(false);
        }}
        currentLanguage={currentLanguage}
        onToggleLanguage={() => setCurrentLanguage(isRu ? 'EN' : 'RU')}
        favoritesCount={favorites.length}
      />

      <div className="lg:pl-80 flex flex-col flex-1 min-w-0 transition-all duration-300">
        <Header
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        balance={balance}
        onTopUp={() => topUp(500)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        soundActive={soundActive}
        onToggleSound={(enabled) => setSoundActive(enabled)}
        onClaimDailyBonus={() => claimDailyBonus(250)}
        hasClaimedDaily={hasClaimedDaily}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isRu={isRu}
        onOpenVip={() => vipSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
      />

      <main className="flex-1 w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <HeroCarousel
          onClaimBonus={() => setIsBonusesOpen(true)}
          onOpenTournaments={() => tournamentSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
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
          isRu={isRu}
          totalGames={gamesCatalog.length}
          favoritesCount={favorites.length}
        />

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Gamepad2 className="w-6 h-6 text-amber-500" />
              <span>
                {activeCategory === 'favorites'
                  ? isRu ? 'Избранные игры' : 'Favorite Games'
                  : activeCategory === 'slots'
                  ? isRu ? 'Популярные видеослоты' : 'Popular Video Slots'
                  : activeCategory === 'live'
                  ? isRu ? 'Live Казино' : 'Live Casino'
                  : activeCategory === 'crash'
                  ? isRu ? 'Краш-игры' : 'Crash Games'
                  : isRu ? 'Все игры' : 'All Games'}
              </span>
            </h2>
            <span className="text-xs sm:text-sm font-bold text-slate-500">
              {filteredGames.length} {isRu ? 'игр' : 'games'}
            </span>
          </div>

          {filteredGames.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <span className="text-4xl block">🔍</span>
              <p className="text-base font-bold text-slate-700">
                {isRu ? 'Игры не найдены' : 'No games found'}
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSelectedProvider('All Providers');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 text-white font-bold text-xs"
              >
                {isRu ? 'Сбросить фильтры' : 'Reset filters'}
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                {filteredGames.slice(0, visibleCount).map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    isFavorite={isFavorite(game.id)}
                    onToggleFavorite={toggleFavorite}
                    onSelectGame={(g) => setSelectedGame(g)}
                    isRu={isRu}
                  />
                ))}
              </div>

              {visibleCount < filteredGames.length && (
                <div className="flex justify-center pt-4">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 18)}
                    className="px-8 py-3 rounded-2xl bg-linear-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 active:scale-95 text-slate-950 font-black text-sm shadow-md shadow-orange-500/20 transition-all cursor-pointer"
                  >
                    {isRu
                      ? `ПОКАЗАТЬ ЕЩЁ (+${Math.min(18, filteredGames.length - visibleCount)})`
                      : `SHOW MORE (+${Math.min(18, filteredGames.length - visibleCount)})`}
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

            <div className="p-6 sm:p-7 rounded-3xl bg-linear-to-r from-amber-50/80 via-white to-orange-50/80 shadow-xs">
              <div className="text-center mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 text-amber-900 text-[11px] font-black uppercase tracking-wider">
                  ⚡ {isRu ? 'Официальные сертифицированные провайдеры софта' : 'Official Licensed Game Studios & Providers'}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
                {['PRAGMATIC PLAY', 'EVOLUTION', 'HACKSAW GAMING', 'SPRIBE', 'NETENT', 'PLAY\'N GO', 'NOLIMIT CITY'].map((studio) => (
                  <span 
                    key={studio}
                    className="px-3.5 py-1.5 rounded-xl bg-white text-xs sm:text-sm font-black tracking-tight text-slate-800 hover:text-orange-600 transition-all cursor-default shadow-xs select-none"
                  >
                    {studio}
                  </span>
                ))}
              </div>
            </div>

            <CasinoPerks isRu={isRu} />
            <FaqSection isRu={isRu} />
          </Suspense>
        )}
      </main>

      <footer className="mt-auto bg-linear-to-br from-orange-950 via-orange-900 to-amber-950 text-white py-12 px-4 sm:px-6 lg:px-8 shadow-inner relative overflow-hidden">
        <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8 relative z-10">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 py-3 text-xs font-black">
            <span className="text-orange-200 text-xs uppercase tracking-wider font-extrabold mr-2 select-none">
              {isRu ? 'Мгновенные методы:' : 'Instant Payouts:'}
            </span>
            {['VISA', 'MASTERCARD', 'BITCOIN', 'ETHEREUM', 'USDT TRC20', 'SKRILL', 'APPLE PAY'].map((method) => (
              <span key={method} className="px-3.5 py-1.5 rounded-xl bg-white/95 text-slate-900 shadow-xs">
                {method}
              </span>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-slate-950/90 flex items-center justify-center text-amber-400 text-lg font-black shadow-md">
                👑
              </div>
              <div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="text-lg font-black text-white tracking-tight">SpinPulse VIP Lounge</span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-slate-950/70 text-amber-300">
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
              <a
                href="#faq-section"
                className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black shadow-xs transition-colors cursor-pointer"
              >
                {isRu ? 'Вопросы и ответы (FAQ)' : 'FAQ & Guide'}
              </a>
              <span className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-black shadow-xs">18+</span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-950/70 text-amber-200">
                {isRu ? 'Демо-валюта' : 'Demo Currency'}
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-950/70 text-amber-200">
                {isRu ? 'Сертифицированный RNG' : 'Certified Fair RNG'}
              </span>
            </div>
          </div>

          <div className="pt-6 text-center text-[11px] text-orange-200/80 font-medium">
            {isRu
              ? '© 2026 SpinPulse Casino. Играйте ответственно. Все слоты и симуляции предназначены исключительно для ознакомительных и развлекательных целей с виртуальными очками.'
              : '© 2026 SpinPulse Casino. Play responsibly. All titles and simulations are strictly intended for entertainment purposes using virtual demo coins.'}
          </div>
        </div>
      </footer>
      </div>

      {/* Modals & Dialogs */}
      <Suspense fallback={null}>
        {selectedGame && (
          <SlotGameModal
            game={selectedGame}
            isOpen={true}
            onClose={() => setSelectedGame(null)}
            balance={balance}
            onDeductBalance={deductBalance}
            onAddBalance={addBalance}
            onRecordBet={addBet}
            isFavorite={isFavorite(selectedGame.id)}
            onToggleFavorite={toggleFavorite}
            isRu={isRu}
          />
        )}

        {isLuckyWheelOpen && (
          <LuckyWheelModal
            isOpen={true}
            onClose={() => setIsLuckyWheelOpen(false)}
            onAddBalance={addBalance}
            isRu={isRu}
          />
        )}

        {isBonusesOpen && (
          <BonusesModal
            isOpen={true}
            onClose={() => setIsBonusesOpen(false)}
            onActivateBonus={(amt) => addBalance(amt)}
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
            onClearHistory={clearHistory}
            isRu={isRu}
          />
        )}
      </Suspense>
    </div>
  );
};

export default App;
