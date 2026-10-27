import { gamesCatalog } from '../data.js';

/**
 * Renders filtered catalog games into the grid.
 */
export function renderGames(state, saveState, openGameModal, updateFavoritesCounter) {
  const container = document.getElementById('games-grid');
  if (!container) return;

  const filtered = gamesCatalog.filter((game) => {
    if (!game.demoUrl) return false;

    if (state.activeCategory === 'favorites') {
      if (!state.favorites.has(game.id)) return false;
    } else if (state.activeCategory === 'playable') {
      if (!game.demoUrl) return false;
    } else if (state.activeCategory === 'bonusbuy') {
      if (!game.isBonusBuy) return false;
    } else if (state.activeCategory === 'jackpot') {
      if (!game.isHot && game.volatility !== 'Very High') return false;
    } else if (state.activeCategory !== 'all' && game.category !== state.activeCategory) {
      return false;
    }

    if (state.selectedProvider !== 'All Providers' && game.provider !== state.selectedProvider) {
      return false;
    }

    if (state.searchQuery && state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase();
      const matchTitle = game.title.toLowerCase().includes(q);
      const matchProv = (game.provider || '').toLowerCase().includes(q);
      const matchCat = (game.category || '').toLowerCase().includes(q);
      if (!matchTitle && !matchProv && !matchCat) return false;
    }

    return true;
  });

  const countEl = document.getElementById('games-count-label');
  if (countEl) {
    countEl.textContent = `${filtered.length} ${state.lang === 'RU' ? 'игр найдено' : 'games available'}`;
  }

  const toShow = filtered.slice(0, state.visibleCount);

  if (toShow.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 16px; color: #64748b;">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="margin: 0 auto 10px; display: block; color: #94a3b8;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <h3 style="font-size: 1.1rem; font-weight: 800; color: #0f172a; margin-bottom: 4px;">
          ${state.lang === 'RU' ? 'Игры не найдены' : 'No games found'}
        </h3>
        <p style="font-size: 0.82rem;">
          ${state.lang === 'RU' ? 'Попробуйте сбросить фильтры или изменить поисковый запрос' : 'Try resetting your search query or provider filter'}
        </p>
      </div>
    `;
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) loadMoreBtn.style.display = 'none';
    return;
  }

  const isRu = state.lang === 'RU';

  container.innerHTML = toShow.map((game) => {
    const isFav = state.favorites.has(game.id);

    let badgeHtml = '';
    if (game.demoUrl) {
      badgeHtml += `<span class="game-card__badge badge-pill badge-playable"><span class="badge-pulse-dot"></span>PLAY</span>`;
    }
    if (game.isHot) {
      badgeHtml += `<span class="game-card__badge badge-pill badge-hot">HOT</span>`;
    } else if (game.isNew) {
      badgeHtml += `<span class="game-card__badge badge-pill badge-new">NEW</span>`;
    } else if (game.category === 'crash') {
      badgeHtml += `<span class="game-card__badge badge-pill badge-crash">CRASH</span>`;
    } else if (game.category === 'live') {
      badgeHtml += `<span class="game-card__badge badge-pill badge-live">LIVE</span>`;
    }

    if (game.isBonusBuy) {
      badgeHtml += `<span class="game-card__badge badge-pill badge-buy">BONUS BUY</span>`;
    }

    return `
      <div class="game-card games-grid__item" data-game-id="${game.id}">
        <div class="game-card__media game-card-media">
          <img 
            class="game-card__img"
            src="${game.coverImage}" 
            alt="${game.title}" 
            loading="lazy" 
            fetchpriority="low"
            decoding="async" 
            width="400" 
            height="300" 
          />
          <div class="game-card__badge-group card-badge-group">
            ${badgeHtml}
          </div>
          <button 
            type="button" 
            class="game-card__fav-btn fav-btn ${isFav ? 'game-card__fav-btn--active active' : ''}" 
            data-fav-id="${game.id}" 
            aria-label="Toggle Favorite"
          >
            <svg viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>
          <div class="game-card__hover-overlay card-hover-overlay">
            <div class="game-card__hover-play-btn hover-play-btn">
              <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
            </div>
            <div class="game-card__hover-demo-pill hover-demo-pill">${isRu ? 'ИГРАТЬ DEMO' : 'PLAY DEMO'}</div>
          </div>
        </div>
        <div class="game-card__info game-card-info">
          <div class="game-card__title-row game-card-title-row">
            <h4 class="game-card__title game-title" title="${game.title}">${game.title}</h4>
            <span class="game-card__rtp-badge game-rtp-badge">${game.rtp ? game.rtp.toFixed(1) + '%' : '96.5%'}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.game-card__fav-btn, .fav-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-fav-id');
      if (!id) return;
      if (state.favorites.has(id)) {
        state.favorites.delete(id);
      } else {
        state.favorites.add(id);
      }
      if (saveState) saveState();
      if (typeof updateFavoritesCounter === 'function') {
        updateFavoritesCounter(state.favorites);
      }
      renderGames(state, saveState, openGameModal, updateFavoritesCounter);
    });
  });

  container.querySelectorAll('.game-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.game-card__fav-btn, .fav-btn')) return;
      const gameId = card.getAttribute('data-game-id') || card.getAttribute('data-id');
      const game = gamesCatalog.find((g) => g.id === gameId);
      if (game && typeof openGameModal === 'function') {
        openGameModal(game);
      }
    });
  });

  const loadMoreBtn = document.getElementById('load-more-btn');
  if (loadMoreBtn) {
    if (filtered.length > state.visibleCount) {
      loadMoreBtn.style.display = 'block';
      const rem = filtered.length - state.visibleCount;
      loadMoreBtn.textContent = state.lang === 'RU' 
        ? `Показать ещё (+${Math.min(18, rem)})` 
        : `Show more (+${Math.min(18, rem)})`;
    } else {
      loadMoreBtn.style.display = 'none';
    }
  }
}

/**
 * Initializes catalog filter pills, search input, provider select, and load more actions.
 */
export function initCatalog(state, saveState, openGameModal, updateFavoritesCounter, closeSidebar) {
  const triggerRender = () => renderGames(state, saveState, openGameModal, updateFavoritesCounter);

  // Category pills
  document.querySelectorAll('.category-nav__pill-btn, .cat-pill-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.category-nav__pill-btn, .cat-pill-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeCategory = btn.getAttribute('data-cat');
      state.visibleCount = 18;
      triggerRender();
    });
  });

  // Sidebar category navigation
  document.querySelectorAll('.site-sidebar__nav-btn, .sidebar-cat-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-cat');
      state.activeCategory = cat;
      state.visibleCount = 18;
      document.querySelectorAll('.category-nav__pill-btn, .cat-pill-btn').forEach((b) => {
        b.classList.toggle('active', b.getAttribute('data-cat') === cat);
      });
      triggerRender();
      if (typeof closeSidebar === 'function') closeSidebar();
      document.getElementById('games-section')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Jackpot shortcut filter
  const jackpotBtn = document.getElementById('jackpot-filter-btn');
  if (jackpotBtn) {
    jackpotBtn.addEventListener('click', () => {
      state.activeCategory = 'jackpot';
      state.visibleCount = 18;
      document.querySelectorAll('.category-nav__pill-btn, .cat-pill-btn').forEach((b) => {
        b.classList.toggle('active', b.getAttribute('data-cat') === 'jackpot');
      });
      triggerRender();
      document.getElementById('games-section')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Horizontal category scroll arrows
  const catScroll = document.getElementById('cat-scroll-container');
  const scrollLeftBtn = document.getElementById('cat-scroll-left');
  const scrollRightBtn = document.getElementById('cat-scroll-right');

  if (scrollLeftBtn && catScroll) {
    scrollLeftBtn.addEventListener('click', () => {
      catScroll.scrollBy({ left: -240, behavior: 'smooth' });
    });
  }
  if (scrollRightBtn && catScroll) {
    scrollRightBtn.addEventListener('click', () => {
      catScroll.scrollBy({ left: 240, behavior: 'smooth' });
    });
  }

  // Provider filter
  const provSelect = document.getElementById('provider-select');
  if (provSelect) {
    provSelect.addEventListener('change', (e) => {
      state.selectedProvider = e.target.value;
      state.visibleCount = 18;
      triggerRender();
    });
  }

  // Search input & clear button
  const headerSearch = document.getElementById('header-search');
  const headerSearchClear = document.getElementById('header-search-clear');

  function handleSearch(q) {
    state.searchQuery = q;
    state.visibleCount = 18;
    if (headerSearch && headerSearch.value !== q) headerSearch.value = q;
    if (headerSearchClear) {
      headerSearchClear.classList.toggle('visible', Boolean(q && q.trim().length > 0));
    }
    triggerRender();
  }

  if (headerSearch) {
    headerSearch.addEventListener('input', (e) => handleSearch(e.target.value));
  }

  if (headerSearchClear && headerSearch) {
    headerSearchClear.addEventListener('click', () => {
      headerSearch.value = '';
      headerSearchClear.classList.remove('visible');
      handleSearch('');
    });
  }

  // Show more button
  const loadMoreBtn = document.getElementById('load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      state.visibleCount += 18;
      triggerRender();
    });
  }
}
