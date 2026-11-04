import { playWinCoinsSound } from '../audio.js';
import { launchConfetti } from './ui.js';

export function updateBalanceDisplay(balance) {
  const formatted = '$' + balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const el = document.getElementById('header-balance');
  if (el) el.textContent = formatted;
}

export function updateFavoritesCounter(favorites) {
  const countStr = (favorites ? favorites.size : 0).toString();
  const el = document.getElementById('sidebar-fav-count');
  if (el) el.textContent = countStr;
  const catEl = document.getElementById('cat-fav-count');
  if (catEl) catEl.textContent = countStr;
}

export function topUpBalance(state, amount = 500, saveState, onUpdate) {
  launchConfetti();
  playWinCoinsSound();
  state.balance = Math.round((state.balance + amount) * 100) / 100;
  if (saveState) saveState();
  if (onUpdate) onUpdate();
}

export function claimDailyBonus(state, saveState, onUpdate) {
  if (state.hasClaimedDaily) return false;
  launchConfetti();
  playWinCoinsSound();
  state.balance = Math.round((state.balance + 250) * 100) / 100;
  state.hasClaimedDaily = true;
  try {
    localStorage.setItem('spinpulse_daily_claimed', new Date().toDateString());
  } catch (err) {
    console.warn('Unable to persist daily claim date:', err);
  }
  if (saveState) saveState();
  if (onUpdate) onUpdate();
  return true;
}
