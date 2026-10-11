import { useState, useEffect, useCallback } from 'react';
import { PlacedCasinoBet } from '../types';

const HISTORY_KEY = 'spinpulse_history';

export function useRecentBets() {
  const [history, setHistory] = useState<PlacedCasinoBet[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch {
      // storage unavailable
    }
  }, [history]);

  const addBet = useCallback((bet: PlacedCasinoBet) => {
    setHistory((prev) => [bet, ...prev.slice(0, 49)]);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    history,
    addBet,
    clearHistory,
  };
}
