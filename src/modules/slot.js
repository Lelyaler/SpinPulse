import { gamesCatalog } from '../data.js';
import { 
  playButtonClick, 
  playWinCoinsSound, 
  playReelSpinSound, 
  playBigJackpotFanfare 
} from '../audio.js';
import { launchConfetti, showToast } from './ui.js';
import { updateBalanceDisplay } from './wallet.js';

export function playDemoGameRound(gameId, cardEl, state, saveState) {
  const game = gamesCatalog.find((g) => g.id === gameId);
  if (!game) return;

  const bet = 10;
  if (state.balance < bet) {
    showToast(state.lang === 'RU' ? 'Недостаточно демо-баланса!' : 'Insufficient demo balance!', 'loss');
    playButtonClick();
    return;
  }

  playReelSpinSound();
  state.balance = Math.max(0, state.balance - bet);

  const rand = Math.random();
  let mult = 0;
  if (rand < 0.42) {
    mult = 0;
  } else if (rand < 0.72) {
    mult = 0.5 + Math.random() * 1.5;
  } else if (rand < 0.94) {
    mult = 2.0 + Math.random() * 6.0;
  } else {
    mult = 10.0 + Math.random() * 35.0;
  }

  const win = Math.round(bet * mult * 100) / 100;
  const net = Math.round((win - bet) * 100) / 100;
  state.balance = Math.round((state.balance + win) * 100) / 100;

  state.history.unshift({
    id: Date.now(),
    gameId: game.id,
    gameTitle: game.title,
    gameImg: game.coverImage || game.image || '',
    bet,
    win,
    net,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  });
  if (state.history.length > 50) state.history.pop();

  if (saveState) saveState();
  updateBalanceDisplay(state.balance);
  renderHistory(state);

  if (cardEl) {
    cardEl.style.transform = 'scale(0.97)';
    setTimeout(() => {
      cardEl.style.transform = '';
    }, 180);
  }

  if (win > bet * 8) {
    launchConfetti();
    playBigJackpotFanfare();
    showToast(`${game.title}: MEGA WIN +$${win.toFixed(2)} (${mult.toFixed(1)}x)!`, 'win');
  } else if (win > 0) {
    playWinCoinsSound();
    showToast(`${game.title}: WIN +$${win.toFixed(2)}`, 'win');
  } else {
    showToast(`${game.title}: -$${bet.toFixed(2)}`, 'loss');
  }
}

export function renderHistory(state) {
  const totalBetsEl = document.getElementById('history-total-bets');
  const sessionResultEl = document.getElementById('history-session-result');
  const listEl = document.getElementById('history-rounds-list');
  const emptyNoteEl = document.getElementById('history-empty-note');
  const totalCountEl = document.getElementById('history-total-count');
  const maxWinEl = document.getElementById('history-max-win');
  const clearBtn = document.getElementById('clear-history-btn');
  const spinNowBtn = document.getElementById('history-spin-now-btn');

  if (!listEl) return;

  const totalBets = state.history.reduce((sum, r) => sum + r.bet, 0);
  const totalWins = state.history.reduce((sum, r) => sum + r.win, 0);
  const maxWin = state.history.reduce((max, r) => Math.max(max, r.win || 0), 0);
  const netResult = totalWins - totalBets;

  if (totalBetsEl) {
    totalBetsEl.textContent = `$${totalBets.toFixed(2)}`;
  }
  if (sessionResultEl) {
    const isPositive = netResult >= 0;
    sessionResultEl.textContent = `${isPositive ? '+' : '-'}$${Math.abs(netResult).toFixed(2)}`;
    sessionResultEl.className = `history-stat-val ${isPositive ? 'val-profit' : 'val-loss'}`;
  }
  if (totalCountEl) {
    totalCountEl.textContent = String(state.history.length);
  }
  if (maxWinEl) {
    maxWinEl.textContent = `$${maxWin.toFixed(2)}`;
  }

  if (clearBtn && !clearBtn.dataset.bound) {
    clearBtn.dataset.bound = 'true';
    clearBtn.addEventListener('click', () => {
      if (state.history.length === 0) return;
      state.history = [];
      try {
        localStorage.setItem('spinpulse_history', JSON.stringify([]));
      } catch {
      }
      renderHistory(state);
    });
  }

  if (spinNowBtn && !spinNowBtn.dataset.bound) {
    spinNowBtn.dataset.bound = 'true';
    spinNowBtn.addEventListener('click', () => {
      const drawer = document.getElementById('history-drawer');
      if (drawer) drawer.classList.remove('active');
      const catalogEl = document.getElementById('catalog-section') || document.querySelector('.category-nav-section');
      if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (state.history.length === 0) {
    if (emptyNoteEl) emptyNoteEl.style.display = 'flex';
    listEl.innerHTML = '';
    return;
  }

  if (emptyNoteEl) emptyNoteEl.style.display = 'none';

  listEl.innerHTML = state.history.slice(0, 30).map((r) => {
    const diff = r.win - r.bet;
    const diffStr = diff >= 0 ? `+$${diff.toFixed(2)}` : `-$${Math.abs(diff).toFixed(2)}`;
    const diffClass = diff >= 0 ? 'val-profit' : 'val-loss';

    const matched = gamesCatalog.find((g) => g.id === r.gameId || g.title === r.gameTitle);
    const validImg = (r.gameImg && r.gameImg !== 'undefined' && r.gameImg !== 'null')
      ? r.gameImg
      : (matched ? matched.coverImage : './casino/gates-of-olympus-1000.webp');

    return `
      <div class="history-item drawer-card__history-item">
        <div class="history-item__left history-item-left">
          <img 
            class="history-item__img history-item-img" 
            src="${validImg}" 
            alt="${r.gameTitle || 'Slot'}" 
            loading="lazy"
            onerror="this.onerror=null; this.src='./casino/gates-of-olympus-1000.webp';" 
          />
          <div class="history-item__details">
            <div class="history-item__name history-item-name">${r.gameTitle}</div>
            <div class="history-item__time history-item-time">${r.timestamp} · Bet: $${r.bet.toFixed(2)}</div>
          </div>
        </div>
        <div class="history-item__right history-item-right ${diffClass}">
          ${diffStr}
        </div>
      </div>
    `;
  }).join('');
}
