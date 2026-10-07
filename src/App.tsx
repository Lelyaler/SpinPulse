import React, { useState, useEffect, useMemo } from 'react';
import { Gamepad2 } from 'lucide-react';
import { GameCategory, GameItem, PlacedCasinoBet } from './types';
import { gamesCatalog } from './data/gamesCatalog';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { LiveWinnersTicker } from './components/LiveWinnersTicker';
import { CategoryNav } from './components/CategoryNav';
import { GameCard } from './components/GameCard';
import { SlotGameModal } from './components/SlotGameModal';
import { RecentPlaysDrawer } from './components/RecentPlaysDrawer';
import { CasinoPerks } from './components/CasinoPerks';
import { isSoundEnabled, playWinCoinsSound } from './utils/casinoAudio';

export const App: React.FC = () => {
  // Demo Balance with localStorage persistence
  const [balance, setBalance] = useState<number>(() => {
    const saved = localStorage.getItem('spinpulse_balance');
    return saved ? Number(saved) : 2500;
  });

  const [soundActive, setSoundActive] = useState<boolean>(() => isSoundEnabled());
  const [activeCategory, setActiveCategory] = useState<GameCategory>('all');
  const [selectedProvider, setSelectedProvider] = useState<string>('All Providers');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalGame, setActiveModalGame] = useState<GameItem | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
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

  const handleUpdateBalance = (newBal: number) => {
    setBalance(Math.max(0, Number(newBal.toFixed(2))));
  };

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

  const handleRecordBet = (bet: PlacedCasinoBet) => {
    setHistory((prev) => [bet, ...prev.slice(0, 49)]);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  // Filter games based on category, provider, and search query
  const filteredGames = useMemo(() => {
    return gamesCatalog.filter((game) => {
      // Category filter
      if (activeCategory === 'jackpot') {
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
  }, [activeCategory, selectedProvider, searchQuery]);

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50/50 via-white to-amber-50/30 text-slate-800 antialiased selection:bg-amber-300 selection:text-amber-950 flex flex-col font-sans">
      {/* Luxury Casino Header */}
      <Header
        balance={balance}
        onTopUp={handleTopUp}
        onOpenHistory={() => setIsHistoryOpen(true)}
        soundActive={soundActive}
        onToggleSound={setSoundActive}
        onClaimDailyBonus={handleClaimDailyBonus}
        hasClaimedDaily={hasClaimedDaily}
      />

      {/* Main Lobby Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 sm:space-y-8 w-full">
        {/* Hero Banner with Progressive Jackpot */}
        <HeroBanner
          onQuickPlay={() => {
            const hotSlot = gamesCatalog.find((g) => g.id === 'slot-olympus') || gamesCatalog[0];
            setActiveModalGame(hotSlot);
          }}
          onClaimBonus={handleTopUp}
        />

        {/* Live Winners Real-Time Ticker */}
        <LiveWinnersTicker />

        {/* Categories, Providers & Search navigation */}
        <CategoryNav
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          selectedProvider={selectedProvider}
          onSelectProvider={setSelectedProvider}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalGames={filteredGames.length}
        />

        {/* Games Catalog Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {activeCategory === 'all' && 'All Lobby Titles'}
                {activeCategory === 'slots' && 'Premium Video Slots'}
                {activeCategory === 'live' && 'Evolution & Pragmatic Live Tables'}
                {activeCategory === 'crash' && 'Next-Gen Multiplier Crash Games'}
                {activeCategory === 'table' && 'Classic Table & Card Games'}
                {activeCategory === 'jackpot' && 'High Volatility Jackpots'}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-300/60">
                {filteredGames.length}
              </span>
            </div>

            <div className="text-xs font-bold text-slate-400 hidden sm:block">
              Provably Fair • Instant Demo Currency
            </div>
          </div>

          {/* Grid of Visual Game Cards */}
          {filteredGames.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-amber-200 p-8">
              <Gamepad2 className="w-12 h-12 text-amber-300 mx-auto mb-3" />
              <h3 className="text-base font-black text-slate-700">No games found</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                No titles matched your filter or search criteria. Try choosing &quot;All Games&quot; or clearing your search.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSelectedProvider('All Providers');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
              {filteredGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onPlay={(selected) => setActiveModalGame(selected)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Studio Partners & Providers Marquee */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-amber-200/70 shadow-xs">
          <div className="text-center mb-4">
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
              Official Licensed Game Studios & Providers
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-70 hover:opacity-95 transition-opacity">
            <span className="text-sm sm:text-base font-black tracking-tight text-slate-700 hover:text-amber-600 transition-colors cursor-default">
              PRAGMATIC PLAY
            </span>
            <span className="text-sm sm:text-base font-black tracking-tight text-slate-700 hover:text-amber-600 transition-colors cursor-default">
              EVOLUTION
            </span>
            <span className="text-sm sm:text-base font-black tracking-tight text-slate-700 hover:text-amber-600 transition-colors cursor-default">
              NETENT
            </span>
            <span className="text-sm sm:text-base font-black tracking-tight text-slate-700 hover:text-amber-600 transition-colors cursor-default">
              HACKSAW GAMING
            </span>
            <span className="text-sm sm:text-base font-black tracking-tight text-slate-700 hover:text-amber-600 transition-colors cursor-default">
              PLAY&apos;N GO
            </span>
            <span className="text-sm sm:text-base font-black tracking-tight text-slate-700 hover:text-amber-600 transition-colors cursor-default">
              NOLIMIT CITY
            </span>
          </div>
        </div>

        {/* Casino Features & Perks */}
        <CasinoPerks />
      </main>

      {/* Slot Machine Gameplay Modal */}
      <SlotGameModal
        game={activeModalGame}
        isOpen={Boolean(activeModalGame)}
        onClose={() => setActiveModalGame(null)}
        balance={balance}
        onUpdateBalance={handleUpdateBalance}
        onRecordBet={handleRecordBet}
      />

      {/* Session Spin History Drawer */}
      <RecentPlaysDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onClearHistory={handleClearHistory}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-amber-200/80 bg-white/90 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white text-xs font-black shadow-xs">
              👑
            </div>
            <div>
              <span className="text-base font-black text-slate-900">SpinPulse VIP Lounge</span>
              <p className="text-xs text-slate-400 font-medium">
                High-end demo iGaming portal & simulator. Built with React 19 & Tailwind CSS.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              18+ Demo Only
            </span>
            <span>No Real Money Gambling</span>
            <span>Certified Fair RNG</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
