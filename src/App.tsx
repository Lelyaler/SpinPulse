import { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { SportTabs } from './components/SportTabs';
import { MatchCard } from './components/MatchCard';
import { BettingSlip } from './components/BettingSlip';
import { MyBetsDrawer } from './components/MyBetsDrawer';
import { useOddsEngine } from './hooks/useOddsEngine';
import { SportId, BetSelection, PlacedBet } from './types';
import { isSoundEnabled } from './utils/soundEffects';
import { 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  Info
} from 'lucide-react';

export function App() {
  // Wallet Balance (LocalStorage with fallback $1,000.00)
  const [balance, setBalance] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('matchpulse_balance');
      return saved ? parseFloat(saved) : 1000;
    } catch {
      return 1000;
    }
  });

  // Betting Slip Selections
  const [selectedBets, setSelectedBets] = useState<BetSelection[]>([]);

  // Placed Bets History
  const [placedBets, setPlacedBets] = useState<PlacedBet[]>(() => {
    try {
      const saved = localStorage.getItem('matchpulse_bets');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filters & State
  const [activeSport, setActiveSport] = useState<SportId>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'live' | 'upcoming'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMyBetsOpen, setIsMyBetsOpen] = useState(false);
  const [isMobileSlipOpen, setIsMobileSlipOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(isSoundEnabled());
  const [notification, setNotification] = useState<string | null>(null);

  // Dynamic Odds Engine
  const { matches, isSimulating, toggleSimulation, triggerInstantEvent } = useOddsEngine();

  // Persist balance
  useEffect(() => {
    try {
      localStorage.setItem('matchpulse_balance', balance.toString());
    } catch {}
  }, [balance]);

  // Persist placed bets
  useEffect(() => {
    try {
      localStorage.setItem('matchpulse_bets', JSON.stringify(placedBets));
    } catch {}
  }, [placedBets]);

  // Show temporary toast notification
  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleTopUp = () => {
    setBalance((prev) => prev + 500);
    showToast('+$500.00 demo credits added to your wallet!');
  };

  // Toggle selection in Betting Slip
  const handleToggleSelection = (bet: BetSelection) => {
    setSelectedBets((prev) => {
      const exists = prev.some((b) => b.matchId === bet.matchId && b.selectionId === bet.selectionId);
      if (exists) {
        return prev.filter((b) => !(b.matchId === bet.matchId && b.selectionId === bet.selectionId));
      } else {
        // Replace previous selection from same match or append
        const filteredSameMatch = prev.filter((b) => b.matchId !== bet.matchId);
        return [...filteredSameMatch, bet];
      }
    });
  };

  const handleRemoveSelection = (selectionId: string) => {
    setSelectedBets((prev) => prev.filter((b) => b.selectionId !== selectionId));
  };

  const handleClearAllSelections = () => {
    setSelectedBets([]);
  };

  const handlePlaceBet = (newBet: PlacedBet): boolean => {
    if (newBet.stake > balance) return false;

    setBalance((prev) => prev - newBet.stake);
    setPlacedBets((prev) => [newBet, ...prev]);
    setSelectedBets([]);
    showToast(`Bet placed! Ticket #${newBet.id.slice(-6)} active.`);
    return true;
  };

  const handleSettleBet = (betId: string, status: 'won' | 'lost') => {
    setPlacedBets((prev) =>
      prev.map((bet) => {
        if (bet.id !== betId) return bet;
        if (status === 'won') {
          setBalance((b) => b + bet.potentialPayout);
          showToast(`Won $${bet.potentialPayout.toFixed(2)} from ticket #${bet.id.slice(-6)}!`);
        } else {
          showToast(`Ticket #${bet.id.slice(-6)} resolved as Lost.`);
        }
        return { ...bet, status };
      })
    );
  };

  // Filtered Matches
  const filteredMatches = useMemo(() => {
    return matches.filter((m) => {
      if (activeSport !== 'all' && m.sport !== activeSport) return false;
      if (statusFilter === 'live' && m.status !== 'live') return false;
      if (statusFilter === 'upcoming' && m.status !== 'upcoming') return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = 
          m.homeTeam.name.toLowerCase().includes(q) ||
          m.awayTeam.name.toLowerCase().includes(q) ||
          m.league.toLowerCase().includes(q);
        if (!matchesName) return false;
      }
      return true;
    });
  }, [matches, activeSport, statusFilter, searchQuery]);

  const liveMatchesCount = useMemo(() => {
    return matches.filter((m) => m.status === 'live').length;
  }, [matches]);

  const activeBetsCount = useMemo(() => {
    return placedBets.filter((b) => b.status === 'pending').length;
  }, [placedBets]);

  // Featured Hot Match for Hero Spotlight
  const featuredMatch = matches.find((m) => m.isHot && m.status === 'live') || matches[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main App Navigation Header */}
      <Header
        balance={balance}
        onTopUp={handleTopUp}
        activeBetsCount={activeBetsCount}
        onOpenMyBets={() => setIsMyBetsOpen(true)}
        isSimulating={isSimulating}
        onToggleSimulating={toggleSimulation}
        onTriggerEvent={() => {
          triggerInstantEvent();
          showToast('Triggered dynamic goal / odds fluctuation event!');
        }}
        soundActive={soundActive}
        onToggleSound={setSoundActive}
        slipItemsCount={selectedBets.length}
        onOpenMobileSlip={() => setIsMobileSlipOpen(true)}
      />

      {/* Page Body Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        {/* Spotlight Banner: Featured Live Event */}
        {featuredMatch && (
          <div 
            className="rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-slate-900/10 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-200/50"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.94) 0%, rgba(15, 23, 42, 0.82) 50%, rgba(15, 23, 42, 0.92) 100%), url(${featuredMatch.bannerImage || ''})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="space-y-3.5 relative z-10 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/25 border border-emerald-400/40 backdrop-blur-md text-emerald-300 uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  Featured Match of the Day
                </span>
                <span className="text-xs text-slate-300 font-semibold">
                  {featuredMatch.league}
                </span>
              </div>

              {/* Matchup with Real Team Crests */}
              <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/15">
                  {featuredMatch.homeTeam.logo && (
                    <img src={featuredMatch.homeTeam.logo} alt="" className="w-7 h-7 object-contain" />
                  )}
                  <span className="font-extrabold text-sm sm:text-base">{featuredMatch.homeTeam.name}</span>
                </div>

                <div className="flex flex-col items-center px-1">
                  <span className="text-[10px] font-extrabold text-amber-400 tracking-wider">VS</span>
                  <span className="font-mono-nums text-base sm:text-lg font-black text-white">
                    {featuredMatch.status === 'live' ? `${featuredMatch.homeScore} : ${featuredMatch.awayScore}` : '-'}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/15">
                  {featuredMatch.awayTeam.logo && (
                    <img src={featuredMatch.awayTeam.logo} alt="" className="w-7 h-7 object-contain" />
                  )}
                  <span className="font-extrabold text-sm sm:text-base">{featuredMatch.awayTeam.name}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-300 font-medium">
                <span className="inline-flex items-center gap-1.5 font-bold text-emerald-400 font-mono-nums">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  LIVE {featuredMatch.minute ? `${featuredMatch.minute}'` : featuredMatch.period}
                </span>
                <span>•</span>
                <span>{featuredMatch.stats?.shotsOnTarget ? `Shots: ${featuredMatch.stats.shotsOnTarget[0]} - ${featuredMatch.stats.shotsOnTarget[1]}` : 'High Liquidity Match'}</span>
              </div>
            </div>

            {/* Quick 1X2 market buttons in banner */}
            <div className="w-full md:w-auto relative z-10 flex flex-wrap items-center gap-2">
              {featuredMatch.markets[0]?.selections.map((sel) => {
                const isSel = selectedBets.some(
                  (b) => b.matchId === featuredMatch.id && b.selectionId === sel.id
                );
                return (
                  <button
                    key={sel.id}
                    type="button"
                    onClick={() => handleToggleSelection({
                      matchId: featuredMatch.id,
                      matchTitle: `${featuredMatch.homeTeam.name} vs ${featuredMatch.awayTeam.name}`,
                      sport: featuredMatch.sport,
                      marketName: featuredMatch.markets[0].name,
                      selectionId: sel.id,
                      selectionName: sel.name,
                      odds: sel.value,
                    })}
                    className={`flex-1 md:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      isSel
                        ? 'bg-white text-emerald-800 border-white shadow-md'
                        : 'bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-xs'
                    }`}
                  >
                    <span className="opacity-80 mr-1.5">{sel.name}:</span>
                    <span className="font-mono-nums text-sm">{sel.value.toFixed(2)}</span>
                  </button>
                );
              })}
            </div>

            {/* Decorative background glow */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-radial from-white/10 to-transparent pointer-events-none"></div>
          </div>
        )}

        {/* Categories, Search & Filter Bar */}
        <SportTabs
          activeSport={activeSport}
          onSelectSport={setActiveSport}
          statusFilter={statusFilter}
          onSelectStatusFilter={setStatusFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          liveMatchesCount={liveMatchesCount}
        />

        {/* 2-Column Main Layout: Events Grid + Sticky Betslip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Matches List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
              <span>Showing {filteredMatches.length} events</span>
              <span className="flex items-center gap-1 text-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                Realtime Odds Verified
              </span>
            </div>

            {filteredMatches.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center text-slate-400 space-y-2">
                <Info className="w-10 h-10 mx-auto text-slate-300" />
                <h3 className="text-base font-bold text-slate-700">No events found</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Try adjusting your search query or switching to another sport category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3.5">
                {filteredMatches.map((match) => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    selectedBets={selectedBets}
                    onToggleSelection={handleToggleSelection}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Desktop Sticky Betting Slip */}
          <div className="hidden lg:block lg:col-span-4 sticky top-24">
            <BettingSlip
              selections={selectedBets}
              onRemoveSelection={handleRemoveSelection}
              onClearAll={handleClearAllSelections}
              balance={balance}
              onPlaceBet={handlePlaceBet}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200/80 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">
              MP
            </div>
            <span className="font-bold text-slate-700">MatchPulse</span>
            <span>— High-Performance Sports Odds Engine</span>
          </div>
          <div className="text-slate-400">
            Portfolio Project • React 19 • TypeScript • Web Audio API • Tailwind CSS
          </div>
        </div>
      </footer>

      {/* My Bets Drawer Modal */}
      <MyBetsDrawer
        isOpen={isMyBetsOpen}
        onClose={() => setIsMyBetsOpen(false)}
        bets={placedBets}
        onSettleBet={handleSettleBet}
      />

      {/* Mobile Betting Slip Modal Drawer */}
      {isMobileSlipOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-end">
          <div className="w-full max-h-[85vh] bg-white rounded-t-3xl overflow-hidden p-4 shadow-2xl flex flex-col">
            <BettingSlip
              selections={selectedBets}
              onRemoveSelection={handleRemoveSelection}
              onClearAll={handleClearAllSelections}
              balance={balance}
              onPlaceBet={handlePlaceBet}
              onCloseMobile={() => setIsMobileSlipOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
