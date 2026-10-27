import { gamesCatalog } from '../data.js';

/**
 * Records a game launch in session history.
 */
export function recordGameLaunch(game, state, saveState, openGameModal) {
  if (!game) return;
  if (!state.history) state.history = [];

  // Don't duplicate if same game was already top of history
  if (state.history[0]?.gameId === game.id) return;

  state.history.unshift({
    id: Date.now(),
    gameId: game.id,
    gameTitle: game.title,
    gameImg: game.coverImage || game.image || '',
    category: game.category,
    provider: game.provider || 'Pragmatic Play',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });

  if (state.history.length > 40) {
    state.history.pop();
  }

  if (saveState) saveState();
  renderHistory(state, openGameModal);
}

/**
 * Renders session game launch history in drawer.
 */
export function renderHistory(state, openGameModal) {
  const totalBetsEl = document.getElementById('history-total-bets');
  const sessionResultEl = document.getElementById('history-session-result');
  const listEl = document.getElementById('history-rounds-list');
  const emptyNoteEl = document.getElementById('history-empty-note');
  const totalCountEl = document.getElementById('history-total-count');
  const clearBtn = document.getElementById('clear-history-btn');
  const spinNowBtn = document.getElementById('history-spin-now-btn');

  if (!listEl) return;

  const totalLaunches = state.history ? state.history.length : 0;
  if (totalBetsEl) {
    totalBetsEl.textContent = String(totalLaunches);
  }
  if (sessionResultEl) {
    sessionResultEl.textContent = 'Pragmatic';
    sessionResultEl.className = 'drawer-card__stat-val val-profit';
  }
  if (totalCountEl) {
    totalCountEl.textContent = String(totalLaunches);
  }

  if (clearBtn && !clearBtn.dataset.bound) {
    clearBtn.dataset.bound = 'true';
    clearBtn.addEventListener('click', () => {
      if (!state.history || state.history.length === 0) return;
      state.history = [];
      try {
        localStorage.setItem('spinpulse_history', JSON.stringify([]));
      } catch (err) {
        console.warn('Unable to persist cleared history:', err);
      }
      renderHistory(state, openGameModal);
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

  if (!state.history || state.history.length === 0) {
    if (emptyNoteEl) emptyNoteEl.style.display = 'flex';
    listEl.innerHTML = '';
    return;
  }

  if (emptyNoteEl) emptyNoteEl.style.display = 'none';

  listEl.innerHTML = state.history.slice(0, 30).map((r) => {
    const matched = gamesCatalog.find((g) => g.id === r.gameId || g.title === r.gameTitle);
    const validImg = (r.gameImg && r.gameImg !== 'undefined' && r.gameImg !== 'null')
      ? r.gameImg
      : (matched ? matched.coverImage : './casino/gates-of-olympus-1000.webp');
    const provider = r.provider || matched?.provider || 'Pragmatic Play';

    return `
      <div class="history-item drawer-card__history-item" data-game-id="${r.gameId}">
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
            <div class="history-item__time history-item-time">${r.timestamp} · ${provider}</div>
          </div>
        </div>
        <button type="button" class="btn btn--outline history-play-btn" style="padding: 4px 10px; font-size: 11px; border-radius: 6px;">
          ${state.lang === 'RU' ? 'Играть' : 'Play'}
        </button>
      </div>
    `;
  }).join('');

  listEl.querySelectorAll('.drawer-card__history-item').forEach((item) => {
    item.addEventListener('click', () => {
      const gameId = item.getAttribute('data-game-id');
      const game = gamesCatalog.find((g) => g.id === gameId);
      if (game && typeof openGameModal === 'function') {
        const drawer = document.getElementById('history-drawer');
        if (drawer) drawer.classList.remove('active');
        openGameModal(game);
      }
    });
  });
}
