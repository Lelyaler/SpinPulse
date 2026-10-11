import { useState, useEffect, useCallback } from 'react';
import { playWinCoinsSound } from '../utils/casinoAudio';

const BALANCE_KEY = 'spinpulse_balance';
const DAILY_CLAIM_KEY = 'spinpulse_daily_claimed';
const DEFAULT_BALANCE = 2500;

export function useWallet() {
  const [balance, setBalance] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(BALANCE_KEY);
      return saved ? Number(saved) : DEFAULT_BALANCE;
    } catch {
      return DEFAULT_BALANCE;
    }
  });

  const [hasClaimedDaily, setHasClaimedDaily] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(DAILY_CLAIM_KEY);
      return saved === new Date().toISOString().slice(0, 10);
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(BALANCE_KEY, balance.toString());
    } catch {
      // storage quota / unavailable
    }
  }, [balance]);

  const addBalance = useCallback((amount: number) => {
    setBalance((prev) => Math.max(0, prev + amount));
  }, []);

  const deductBalance = useCallback((amount: number): boolean => {
    let success = false;
    setBalance((prev) => {
      if (prev >= amount) {
        success = true;
        return prev - amount;
      }
      return prev;
    });
    return success;
  }, []);

  const topUp = useCallback((amount: number = 500) => {
    setBalance((prev) => prev + amount);
    playWinCoinsSound();
  }, []);

  const claimDailyBonus = useCallback((amount: number = 250) => {
    if (hasClaimedDaily) return false;
    setBalance((prev) => prev + amount);
    setHasClaimedDaily(true);
    playWinCoinsSound();
    try {
      localStorage.setItem(DAILY_CLAIM_KEY, new Date().toISOString().slice(0, 10));
    } catch {
      // Ignore
    }
    return true;
  }, [hasClaimedDaily]);

  return {
    balance,
    addBalance,
    deductBalance,
    topUp,
    hasClaimedDaily,
    claimDailyBonus,
  };
}
