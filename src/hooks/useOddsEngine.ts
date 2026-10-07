import { useState, useEffect, useCallback, useRef } from 'react';
import { Match, OddTrend } from '../types';
import { initialMatches } from '../data/mockMatches';
import { playOddsTickSound } from '../utils/soundEffects';

export function useOddsEngine() {
  const [matches, setMatches] = useState<Match[]>(initialMatches);
  const [isSimulating, setIsSimulating] = useState(true);
  const [updateCount, setUpdateCount] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  // Fluctuates random odds on live matches
  const tickOdds = useCallback(() => {
    setMatches((prevMatches) => {
      const liveMatches = prevMatches.filter((m) => m.status === 'live');
      if (liveMatches.length === 0) return prevMatches;

      // Pick 1 or 2 random live matches to mutate
      const randomMatch = liveMatches[Math.floor(Math.random() * liveMatches.length)];
      let didMutate = false;
      let lastTrend: OddTrend = 'steady';

      const nextMatches = prevMatches.map((match) => {
        if (match.id !== randomMatch.id) return match;

        const nextMarkets = match.markets.map((market) => {
          // Mutate 1 selection randomly
          if (Math.random() > 0.45) {
            const selIndex = Math.floor(Math.random() * market.selections.length);
            const delta = (Math.random() * 0.16 - 0.08); // -0.08 to +0.08
            
            const nextSelections = market.selections.map((sel, idx) => {
              if (idx !== selIndex) return { ...sel, trend: 'steady' as OddTrend };

              const rawNewValue = sel.value + delta;
              const nextVal = Math.max(1.05, Math.min(18.0, Number(rawNewValue.toFixed(2))));
              const trend: OddTrend = nextVal > sel.value ? 'up' : nextVal < sel.value ? 'down' : 'steady';

              if (trend !== 'steady') {
                didMutate = true;
                lastTrend = trend;
              }

              return {
                ...sel,
                value: nextVal,
                trend,
              };
            });

            return { ...market, selections: nextSelections };
          }

          return {
            ...market,
            selections: market.selections.map((s) => ({ ...s, trend: 'steady' as OddTrend })),
          };
        });

        // Occasionally increment football/basketball minutes
        let nextMinute = match.minute;
        if (match.minute && Math.random() > 0.6) {
          nextMinute = match.sport === 'football' ? Math.min(90, match.minute + 1) : match.minute;
        }

        return {
          ...match,
          minute: nextMinute,
          markets: nextMarkets,
        };
      });

      if (didMutate) {
        setUpdateCount((c) => c + 1);
        playOddsTickSound((lastTrend as string) === 'up');
      }

      return nextMatches;
    });
  }, []);

  // Interval loop
  useEffect(() => {
    if (!isSimulating) return;

    const intervalTime = 3200;
    const interval = window.setInterval(tickOdds, intervalTime);

    return () => clearInterval(interval);
  }, [isSimulating, tickOdds]);

  // Trigger instant event (e.g. goal scored or kill)
  const triggerInstantEvent = useCallback((matchId?: string) => {
    setMatches((prev) => {
      const target = matchId ? prev.find((m) => m.id === matchId) : prev.find((m) => m.status === 'live');
      if (!target) return prev;

      return prev.map((m) => {
        if (m.id !== target.id) return m;

        const isHome = Math.random() > 0.5;
        const newHomeScore = isHome ? m.homeScore + 1 : m.homeScore;
        const newAwayScore = !isHome ? m.awayScore + 1 : m.awayScore;

        return {
          ...m,
          homeScore: newHomeScore,
          awayScore: newAwayScore,
          markets: m.markets.map((market) => ({
            ...market,
            selections: market.selections.map((sel) => {
              const shift = isHome ? (sel.name.includes('1') ? -0.35 : 0.45) : (sel.name.includes('2') ? -0.35 : 0.45);
              const nextVal = Math.max(1.05, Number((sel.value + shift).toFixed(2)));
              return {
                ...sel,
                value: nextVal,
                trend: shift < 0 ? 'down' : 'up',
              };
            }),
          })),
        };
      });
    });
    playOddsTickSound(true);
  }, []);

  const toggleSimulation = useCallback(() => {
    setIsSimulating((prev) => !prev);
  }, []);

  // Clean trends back to steady after 1.8s
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setMatches((prev) =>
        prev.map((m) => ({
          ...m,
          markets: m.markets.map((mk) => ({
            ...mk,
            selections: mk.selections.map((s) => (s.trend !== 'steady' ? { ...s, trend: 'steady' } : s)),
          })),
        }))
      );
    }, 1800);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [updateCount]);

  return {
    matches,
    isSimulating,
    toggleSimulation,
    triggerInstantEvent,
  };
}
