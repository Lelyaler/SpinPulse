import { gamesCatalog, initialWinners, currentTournament } from './data.js';
import { 
  isSoundEnabled, 
  setSoundEnabled, 
  playButtonClick, 
  playWinCoinsSound
} from './audio.js';
import { applyTranslations, getDictionary } from './i18n.js';
import { showToast, openModal, closeModal } from './modules/ui.js';
import { mountModals } from './modules/modals.js';
import { 
  updateBalanceDisplay, 
  updateFavoritesCounter, 
  topUpBalance, 
  claimDailyBonus 
} from './modules/wallet.js';
import { renderLiveWins } from './modules/ticker.js';
import { drawWheel, spinWheel } from './modules/wheel.js';
import { playDemoGameRound, renderHistory } from './modules/slot.js';

function getInitialLanguage() {
  try {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('lang')?.toUpperCase();
    if (q === 'EN' || q === 'RU') return q;
  } catch {
  }

  try {
    const saved = localStorage.getItem('spinpulse_lang')?.toUpperCase();
    if (saved === 'EN' || saved === 'RU') return saved;
  } catch {
  }

  return 'RU';
}

function safeGetStorage(key, fallback = '') {
  try {
    const val = localStorage.getItem(key);
    return val !== null ? val : fallback;
  } catch {
    return fallback;
  }
}

function safeGetStorageJSON(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    if (!val) return fallback;
    const parsed = JSON.parse(val);
    return parsed !== null && parsed !== undefined ? parsed : fallback;
  } catch {
    return fallback;
  }
}

const state = {
  lang: getInitialLanguage(),
  balance: parseFloat(safeGetStorage('spinpulse_balance', '2500')) || 2500,
  favorites: new Set(safeGetStorageJSON('spinpulse_favorites', [])),
  hasClaimedDaily: safeGetStorage('spinpulse_daily_claimed', '') === new Date().toDateString(),
  history: safeGetStorageJSON('spinpulse_history', []).map((h) => {
    if (!h.gameImg || h.gameImg === 'undefined' || h.gameImg === 'null') {
      const found = gamesCatalog.find((g) => g.id === h.gameId || g.title === h.gameTitle);
      return { ...h, gameImg: found ? found.coverImage : './casino/gates-of-olympus-1000.webp' };
    }
    return h;
  }),
  activeCategory: 'all',
  selectedProvider: 'All Providers',
  searchQuery: '',
  visibleCount: 18,
  currentSlide: 0,
  jackpots: {
    grand: 4821590.84,
    major: 248190.15,
    mini: 14850.50
  },
  winners: [...initialWinners],
  tournamentJoined: false,
  tournamentParticipants: currentTournament.participantsCount
};

function saveState() {
  try {
    localStorage.setItem('spinpulse_lang', state.lang);
    localStorage.setItem('spinpulse_balance', state.balance.toString());
    localStorage.setItem('spinpulse_favorites', JSON.stringify([...state.favorites]));
    localStorage.setItem('spinpulse_history', JSON.stringify(state.history.slice(0, 50)));
  } catch {
  }
}

const $ = (id) => document.getElementById(id);

function syncWallet() {
  updateBalanceDisplay(state.balance);
  const liveWinsEl = $('live-wins-list');
  if (liveWinsEl) renderLiveWins(liveWinsEl, state.winners);
}

function openGameModal(game) {
  const modal = $('game-modal');
  const iframe = $('gm-iframe');
  const loader = $('gm-loader');
  const title = $('gm-title');
  const extBtn = $('gm-external-btn');

  if (!modal || !iframe || !game.demoUrl) return;

  if (title) title.textContent = game.title;
  if (extBtn) extBtn.href = game.demoUrl;

  if (loader) {
    loader.classList.remove('hidden');
  }

  iframe.onload = () => {
    if (loader) loader.classList.add('hidden');
  };

  iframe.src = game.demoUrl;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  playButtonClick();
}

function closeGameModal() {
  const modal = $('game-modal');
  const iframe = $('gm-iframe');
  const loader = $('gm-loader');
  if (!modal) return;

  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  }

  if (iframe) {
    iframe.src = 'about:blank';
  }
  if (loader) {
    loader.classList.remove('hidden');
  }
}

function renderGames() {
  const container = $('games-grid');
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

    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase();
      const matchTitle = game.title.toLowerCase().includes(q);
      const matchProv = game.provider.toLowerCase().includes(q);
      const matchCat = game.category.toLowerCase().includes(q);
      if (!matchTitle && !matchProv && !matchCat) return false;
    }

    return true;
  });

  const countEl = $('games-count-label');
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
    const loadMoreBtn = $('load-more-btn');
    if (loadMoreBtn) loadMoreBtn.style.display = 'none';
    return;
  }

  const isRu = state.lang === 'RU';

  container.innerHTML = toShow.map((game, idx) => {
    const isFav = state.favorites.has(game.id);

    let badgeHtml = '';
    if (game.demoUrl) {
      badgeHtml += `<span class="game-card__badge game-card__badge--playable"><span class="badge-pulse-dot"></span>PLAY</span>`;
    }
    if (game.isHot) {
      badgeHtml += `<span class="game-card__badge game-card__badge--hot">HOT</span>`;
    } else if (game.isNew) {
      badgeHtml += `<span class="game-card__badge game-card__badge--new">NEW</span>`;
    } else if (game.category === 'crash') {
      badgeHtml += `<span class="game-card__badge game-card__badge--crash">CRASH</span>`;
    } else if (game.category === 'live') {
      badgeHtml += `<span class="game-card__badge game-card__badge--live">LIVE</span>`;
    }

    if (game.isBonusBuy) {
      badgeHtml += `<span class="game-card__badge game-card__badge--buy">BONUS BUY</span>`;
    }

    return `
      <div class="game-card games-grid__item" data-game-id="${game.id}">
        <div class="game-card__media">
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
          <div class="game-card__badge-group">
            ${badgeHtml}
          </div>
          <button 
            type="button" 
            class="game-card__fav-btn ${isFav ? 'game-card__fav-btn--active' : ''}" 
            data-fav-id="${game.id}" 
            aria-label="Toggle Favorite"
          >
            <svg viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>
          <div class="game-card__hover-overlay">
            <div class="game-card__hover-play-btn">
              <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
            </div>
            <div class="game-card__hover-demo-pill">${game.demoUrl ? (isRu ? 'ИГРАТЬ DEMO' : 'PLAY DEMO') : (isRu ? 'ДЕМО' : 'DEMO')}</div>
          </div>
        </div>
        <div class="game-card__info">
          <div class="game-card__title-row">
            <h4 class="game-card__title" title="${game.title}">${game.title}</h4>
            <span class="game-card__rtp-badge">${game.rtp ? game.rtp.toFixed(1) + '%' : '96.5%'}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.game-card__fav-btn, .fav-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-fav-id');
      if (state.favorites.has(id)) {
        state.favorites.delete(id);
      } else {
        state.favorites.add(id);
      }
      saveState();
      updateFavoritesCounter(state.favorites);
      renderGames();
    });
  });

  container.querySelectorAll('.game-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.game-card__fav-btn, .fav-btn')) return;
      const gameId = card.getAttribute('data-game-id') || card.getAttribute('data-id');
      const game = gamesCatalog.find((g) => g.id === gameId);
      if (game && game.demoUrl) {
        openGameModal(game);
      } else {
        playDemoGameRound(gameId, card, state, saveState);
      }
    });
  });

  const loadMoreBtn = $('load-more-btn');
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

const slides = [
  {
    tagRu: 'ФЛАГМАНСКИЙ СЛОТ', tagEn: 'FLAGSHIP SLOT',
    titleRu: 'GATES OF OLYMPUS 1000', titleEn: 'GATES OF OLYMPUS 1000',
    descRu: 'Зевс обрушивает множители до 15,000x! Каскадные барабаны, покупка фриспинов и легендарная механика выплат.',
    descEn: 'Zeus unleashes thunderous multipliers up to 15,000x! Cascading reels, bonus buy and legendary tumbling action.',
    bg: './banners/banner-zeus-bright.webp',
    mobileBg: './banners/banner-zeus-mobile.webp',
    accent: '15,000x MAX',
    position: '70% 12%',
    mobilePosition: '68% 10%'
  },
  {
    tagRu: 'ТУРНИР НЕДЕЛИ', tagEn: 'WEEKLY TOURNAMENT',
    titleRu: 'GRAND PRIX • $50,000', titleEn: 'GRAND PRIX • $50,000',
    descRu: 'Вступайте в грандиозную битву провайдеров! Зарабатывайте очки за множители и разделяйте призовой фонд.',
    descEn: 'Enter the epic provider tournament! Earn leaderboard points with big multipliers and share the prize pool.',
    bg: './banners/banner-tournament-bright.webp',
    mobileBg: './banners/banner-tournament-mobile.webp',
    accent: '$50,000 POOL',
    position: '68% 50%',
    mobilePosition: '65% 50%'
  },
  {
    tagRu: 'КРАШ-РЕВОЛЮЦИЯ', tagEn: 'CRASH PHENOMENON',
    titleRu: 'AVIATOR & JETX CRASH', titleEn: 'AVIATOR & JETX CRASH',
    descRu: 'Успейте забрать выигрыш до взрыва ракеты! Мгновенные раунды с сертифицированным RNG.',
    descEn: 'Cash out before the rocket crashes! Pure adrenaline rush, instant rounds and provably fair RNG.',
    bg: './banners/banner-crash-bright.webp',
    mobileBg: './banners/banner-crash-mobile.webp',
    accent: '10,000x WIN',
    position: '68% 46%',
    mobilePosition: '65% 45%'
  },
  {
    tagRu: 'ПРИВЕТСТВЕННЫЙ ПАКЕТ', tagEn: 'WELCOME PACKAGE',
    titleRu: 'ПРИВЕТСТВЕННЫЙ БОНУС 100%', titleEn: '100% UP TO $600 + 500 FS',
    descRu: 'Удвойте баланс на первый депозит и заберите 500 фриспинов в топовых видеослотах!',
    descEn: 'Double your initial deposit and grab 500 free spins in legendary video slots!',
    bg: './banners/banner-welcome-bright.webp',
    mobileBg: './banners/banner-welcome-mobile.webp',
    accent: '+500 SPINS',
    position: '70% 50%',
    mobilePosition: '68% 50%'
  }
];

let heroTrackIndex = 1;
let heroAnimating = false;
let heroAutoTimer = null;
const HERO_ANIM_TIME = 450;

function updateHeroDots(activeSlideIdx) {
  state.currentSlide = activeSlideIdx;
  const dotsContainer = $('hero-dots');
  if (dotsContainer) {
    const dots = dotsContainer.querySelectorAll('.hero-carousel__dot, .hero-dot');
    dots.forEach((dot, i) => {
      const isActive = i === activeSlideIdx;
      dot.classList.toggle('active', isActive);
      dot.classList.toggle('hero-carousel__dot--active', isActive);
    });
  }
}

function updateHeroSlideActiveClasses() {
  const container = $('hero-slides-wrap');
  if (!container) return;
  const slideEls = container.querySelectorAll('.hero-carousel__slide, .hero-slide');
  slideEls.forEach((slideEl, idx) => {
    const isActive = idx === heroTrackIndex;
    slideEl.classList.toggle('active', isActive);
    slideEl.classList.toggle('hero-carousel__slide--active', isActive);
  });
}

function resetTrackPositionInstant() {
  const container = $('hero-slides-wrap');
  if (!container) return;

  if (heroTrackIndex >= slides.length + 1) {
    container.style.transition = 'none';
    heroTrackIndex = 1;
    container.style.transform = `translate3d(-${heroTrackIndex * 100}%, 0, 0)`;
    requestAnimationFrame(() => {
      container.style.transition = '';
      updateHeroSlideActiveClasses();
    });
  } else if (heroTrackIndex <= 0) {
    container.style.transition = 'none';
    heroTrackIndex = slides.length;
    container.style.transform = `translate3d(-${heroTrackIndex * 100}%, 0, 0)`;
    requestAnimationFrame(() => {
      container.style.transition = '';
      updateHeroSlideActiveClasses();
    });
  }
}

function nextHeroSlide() {
  if (heroAnimating) return;
  const container = $('hero-slides-wrap');
  if (!container) return;

  heroAnimating = true;
  heroTrackIndex++;

  container.style.transition = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)';
  container.style.transform = `translate3d(-${heroTrackIndex * 100}%, 0, 0)`;

  const realIdx = heroTrackIndex > slides.length ? 0 : heroTrackIndex - 1;
  updateHeroDots(realIdx);
  updateHeroSlideActiveClasses();

  setTimeout(() => {
    if (heroAnimating) {
      resetTrackPositionInstant();
      heroAnimating = false;
    }
  }, HERO_ANIM_TIME + 60);
}

function prevHeroSlide() {
  if (heroAnimating) return;
  const container = $('hero-slides-wrap');
  if (!container) return;

  heroAnimating = true;
  heroTrackIndex--;

  container.style.transition = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)';
  container.style.transform = `translate3d(-${heroTrackIndex * 100}%, 0, 0)`;

  const realIdx = heroTrackIndex < 1 ? slides.length - 1 : heroTrackIndex - 1;
  updateHeroDots(realIdx);
  updateHeroSlideActiveClasses();

  setTimeout(() => {
    if (heroAnimating) {
      resetTrackPositionInstant();
      heroAnimating = false;
    }
  }, HERO_ANIM_TIME + 60);
}

function goToHeroSlideIndex(slideIdx) {
  if (heroAnimating) return;
  const container = $('hero-slides-wrap');
  if (!container) return;

  const targetTrackIdx = slideIdx + 1;
  if (targetTrackIdx === heroTrackIndex) return;

  heroAnimating = true;
  heroTrackIndex = targetTrackIdx;

  container.style.transition = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)';
  container.style.transform = `translate3d(-${heroTrackIndex * 100}%, 0, 0)`;

  updateHeroDots(slideIdx);
  updateHeroSlideActiveClasses();

  setTimeout(() => {
    heroAnimating = false;
  }, HERO_ANIM_TIME + 60);
}

function startHeroTimer() {
  stopHeroTimer();
  heroAutoTimer = setInterval(() => {
    if (!document.hidden) {
      nextHeroSlide();
    }
  }, 6500);
}

function stopHeroTimer() {
  if (heroAutoTimer) {
    clearInterval(heroAutoTimer);
    heroAutoTimer = null;
  }
}

function resetHeroTimer() {
  stopHeroTimer();
  startHeroTimer();
}

function initHeroCarousel() {
  const container = $('hero-slides-wrap');
  if (!container) return;

  const isRu = state.lang === 'RU';
  if (!container.children.length) {
    const trackSlides = [slides[slides.length - 1], ...slides, slides[0]];
    container.innerHTML = trackSlides.map((slide, trackIdx) => {
      const origIdx = trackIdx === 0 ? slides.length - 1 : (trackIdx === trackSlides.length - 1 ? 0 : trackIdx - 1);
      const isFirstVisible = trackIdx === 1;
      return `
        <div class="hero-carousel__slide ${isFirstVisible ? 'hero-carousel__slide--active' : ''}" data-track-idx="${trackIdx}" data-orig-idx="${origIdx}">
          <picture class="hero-carousel__bg-picture">
            <source media="(max-width: 640px)" srcset="${slide.mobileBg}" />
            <img 
              class="hero-carousel__bg-img"
              src="${slide.bg}" 
              alt="${isRu ? slide.titleRu : slide.titleEn}" 
              loading="${isFirstVisible ? 'eager' : 'lazy'}" 
              fetchpriority="${isFirstVisible ? 'high' : 'low'}" 
              decoding="async" 
              width="1280" 
              height="420"
              style="--bg-pos: ${slide.position}; --bg-pos-m: ${slide.mobilePosition || slide.position};" 
            />
          </picture>
          <div class="hero-carousel__overlay"></div>
          <div class="hero-carousel__content">
            <div class="hero-carousel__badge-row">
              <span class="hero-carousel__tag" data-hero-tag="${origIdx}">${isRu ? slide.tagRu : slide.tagEn}</span>
              <span class="hero-carousel__accent">${slide.accent}</span>
            </div>
            <h2 class="hero-carousel__title" data-hero-title="${origIdx}">${isRu ? slide.titleRu : slide.titleEn}</h2>
            <p class="hero-carousel__desc" data-hero-desc="${origIdx}">${isRu ? slide.descRu : slide.descEn}</p>
            <div class="hero-carousel__actions">
              <button type="button" class="hero-carousel__cta-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
                <span data-hero-btn="${origIdx}">${isRu ? 'ЗАБРАТЬ БОНУС' : 'CLAIM BONUS'}</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  container.querySelectorAll('.hero-carousel__cta-btn, .hero-bonus-trigger').forEach((btn) => {
    btn.addEventListener('click', () => {
      openModal('bonuses-modal');
    });
  });

  const dotsContainer = $('hero-dots');
  if (dotsContainer) {
    if (!dotsContainer.children.length) {
      dotsContainer.innerHTML = slides.map((_, i) => `
        <button type="button" class="hero-carousel__dot ${i === 0 ? 'hero-carousel__dot--active' : ''}" data-slide="${i}" aria-label="Слайд ${i + 1}"></button>
      `).join('');
    }

    dotsContainer.querySelectorAll('.hero-carousel__dot, .hero-dot').forEach((dot) => {
      dot.addEventListener('click', () => {
        const targetSlide = parseInt(dot.getAttribute('data-slide'), 10);
        goToHeroSlideIndex(targetSlide);
        resetHeroTimer();
      });
    });
  }

  container.addEventListener('transitionend', (e) => {
    if (e.target !== container || e.propertyName !== 'transform') return;
    resetTrackPositionInstant();
    heroAnimating = false;
  });

  heroTrackIndex = 1;
  container.style.transition = 'none';
  container.style.transform = `translate3d(-100%, 0, 0)`;
  requestAnimationFrame(() => {
    container.style.transition = '';
  });

  updateHeroDots(0);
  startHeroTimer();
}

function updateHeroTexts() {
  const isRu = state.lang === 'RU';
  slides.forEach((slide, i) => {
    document.querySelectorAll(`[data-hero-tag="${i}"]`).forEach((el) => {
      el.textContent = isRu ? slide.tagRu : slide.tagEn;
    });
    document.querySelectorAll(`[data-hero-title="${i}"]`).forEach((el) => {
      el.textContent = isRu ? slide.titleRu : slide.titleEn;
    });
    document.querySelectorAll(`[data-hero-desc="${i}"]`).forEach((el) => {
      el.textContent = isRu ? slide.descRu : slide.descEn;
    });
    document.querySelectorAll(`[data-hero-btn="${i}"]`).forEach((el) => {
      el.textContent = isRu ? 'ЗАБРАТЬ БОНУС' : 'CLAIM BONUS';
    });
  });
}

function safeRun(fn, name) {
  try {
    fn();
  } catch (err) {
    console.warn('[SpinPulse] Error in ' + name + ':', err);
  }
}

function initApp() {
  window.__SPINPULSE_LOADED__ = true;

  safeRun(() => applyTranslations(state.lang, state), 'applyTranslations');
  safeRun(syncWallet, 'syncWallet');
  safeRun(initHeroCarousel, 'initHeroCarousel');

  const deferInit = () => {
    safeRun(renderGames, 'renderGames');
    setTimeout(() => {
      safeRun(mountModals, 'mountModals');
      safeRun(() => updateFavoritesCounter(state.favorites), 'updateFavoritesCounter');
    }, 80);
    setTimeout(() => {
      safeRun(() => renderLiveWins($('live-wins-list'), state.winners), 'renderLiveWins');
      safeRun(() => drawWheel($('wheel-canvas')), 'drawWheel');
      safeRun(() => renderHistory(state), 'renderHistory');
    }, 200);
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(deferInit, { timeout: 1000 });
  } else {
    setTimeout(deferInit, 80);
  }

  if (state.hasClaimedDaily) {
    const btn = $('header-daily-btn');
    if (btn) {
      btn.classList.add('claimed');
      const textSpan = btn.querySelector('span:last-child');
      if (textSpan) {
        textSpan.textContent = state.lang === 'RU' ? 'Бонус взят' : 'Claimed';
      }
    }
  }

  const soundBtn = $('sound-toggle-btn');
  const soundOnSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';
  const soundOffSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
  if (soundBtn) {
    soundBtn.innerHTML = isSoundEnabled() ? soundOnSvg : soundOffSvg;
    soundBtn.addEventListener('click', () => {
      const next = !isSoundEnabled();
      setSoundEnabled(next);
      soundBtn.innerHTML = next ? soundOnSvg : soundOffSvg;
      if (next) playButtonClick();
    });
  }

  const topUpBtn = $('topup-btn');
  if (topUpBtn) {
    topUpBtn.addEventListener('click', () => {
      topUpBalance(state, 500, saveState, syncWallet);
    });
  }

  const dailyBtn = $('header-daily-btn');
  if (dailyBtn) {
    dailyBtn.addEventListener('click', () => {
      if (claimDailyBonus(state, saveState, syncWallet)) {
        dailyBtn.classList.add('claimed');
        const textSpan = dailyBtn.querySelector('span:last-child');
        if (textSpan) {
          textSpan.textContent = state.lang === 'RU' ? 'Бонус взят' : 'Claimed';
        }
      }
    });
  }

  const menuBtn = $('menu-toggle-btn');
  const sidebar = $('site-sidebar');
  const backdrop = $('sidebar-backdrop');
  const closeSidebarBtn = $('sidebar-close-btn');

  function openSidebar(e) {
    if (e && e.type === 'touchstart') e.preventDefault();
    if (sidebar) sidebar.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.classList.add('menu-open');
  }

  function closeSidebar(e) {
    if (e && e.type === 'touchstart') e.preventDefault();
    if (sidebar) sidebar.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', openSidebar);
    menuBtn.addEventListener('touchstart', openSidebar, { passive: false });
  }
  if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener('click', closeSidebar);
  }
  if (backdrop) {
    backdrop.addEventListener('click', closeSidebar);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('active')) {
      closeSidebar();
    }
  });

  const notifBtn = $('notif-btn');
  const notifDropdown = $('notif-dropdown');
  if (notifBtn && notifDropdown) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notifDropdown.classList.toggle('active');
    });
    document.addEventListener('click', (e) => {
      if (!notifDropdown.contains(e.target) && e.target !== notifBtn) {
        notifDropdown.classList.remove('active');
      }
    });
  }

  document.querySelectorAll('.category-nav__pill-btn, .cat-pill-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.category-nav__pill-btn, .cat-pill-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeCategory = btn.getAttribute('data-cat');
      state.visibleCount = 18;
      renderGames();
    });
  });

  document.querySelectorAll('.site-sidebar__nav-btn, .sidebar-cat-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-cat');
      state.activeCategory = cat;
      state.visibleCount = 18;
      document.querySelectorAll('.category-nav__pill-btn, .cat-pill-btn').forEach((b) => {
        b.classList.toggle('active', b.getAttribute('data-cat') === cat);
      });
      renderGames();
      closeSidebar();
      $('games-section')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const jackpotBtn = $('jackpot-filter-btn');
  if (jackpotBtn) {
    jackpotBtn.addEventListener('click', () => {
      state.activeCategory = 'jackpot';
      state.visibleCount = 18;
      document.querySelectorAll('.category-nav__pill-btn, .cat-pill-btn').forEach((b) => {
        b.classList.toggle('active', b.getAttribute('data-cat') === 'jackpot');
      });
      renderGames();
      $('games-section')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const catScroll = $('cat-scroll-container');
  const scrollLeftBtn = $('cat-scroll-left');
  const scrollRightBtn = $('cat-scroll-right');

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

  const provSelect = $('provider-select');
  if (provSelect) {
    provSelect.addEventListener('change', (e) => {
      state.selectedProvider = e.target.value;
      state.visibleCount = 18;
      renderGames();
    });
  }

  const headerSearch = $('header-search');
  const headerSearchClear = $('header-search-clear');

  function handleSearch(q) {
    state.searchQuery = q;
    state.visibleCount = 18;
    if (headerSearch && headerSearch.value !== q) headerSearch.value = q;
    if (headerSearchClear) {
      headerSearchClear.classList.toggle('visible', Boolean(q && q.trim().length > 0));
    }
    renderGames();
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

  const loadMoreBtn = $('load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      state.visibleCount += 18;
      renderGames();
    });
  }

  const prevSlideBtn = $('hero-prev-btn');
  const nextSlideBtn = $('hero-next-btn');

  if (prevSlideBtn) {
    prevSlideBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevHeroSlide();
      resetHeroTimer();
    });
  }
  if (nextSlideBtn) {
    nextSlideBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextHeroSlide();
      resetHeroTimer();
    });
  }

  const heroSection = document.querySelector('.hero-carousel, .hero-carousel-section');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopHeroTimer);
    heroSection.addEventListener('mouseleave', startHeroTimer);

    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    heroSection.addEventListener('touchstart', (e) => {
      stopHeroTimer();
      if (e.touches && e.touches[0]) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
      }
    }, { passive: true });

    heroSection.addEventListener('touchend', (e) => {
      startHeroTimer();
      if (!e.changedTouches || !e.changedTouches[0]) return;
      const diffX = e.changedTouches[0].clientX - touchStartX;
      const diffY = e.changedTouches[0].clientY - touchStartY;
      const elapsed = Date.now() - touchStartTime;

      if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY) * 1.1 && elapsed < 800) {
        if (diffX < 0) {
          nextHeroSlide();
        } else {
          prevHeroSlide();
        }
        resetHeroTimer();
      }
    }, { passive: true });
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopHeroTimer();
    } else {
      startHeroTimer();
    }
  });

  setInterval(() => {
    state.jackpots.grand += Math.random() * 2.5 + 0.5;
    state.jackpots.major += Math.random() * 0.8 + 0.1;
    state.jackpots.mini += Math.random() * 0.2 + 0.05;

    const grandEl = $('jackpot-grand-val');
    if (grandEl) grandEl.textContent = state.jackpots.grand.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const majorEl = $('jackpot-major-val');
    if (majorEl) majorEl.textContent = state.jackpots.major.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const miniEl = $('jackpot-mini-val');
    if (miniEl) miniEl.textContent = state.jackpots.mini.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }, 1500);

  const joinTournamentBtn = $('btn-join-tournament');
  if (joinTournamentBtn) {
    if (state.tournamentJoined) {
      joinTournamentBtn.textContent = state.lang === 'RU' ? '✓ ВЫ УЧАСТВУЕТЕ' : '✓ REGISTERED';
      joinTournamentBtn.style.background = '#10b981';
      joinTournamentBtn.style.color = '#ffffff';
    }
    joinTournamentBtn.addEventListener('click', () => {
      if (!state.tournamentJoined) {
        playWinCoinsSound();
        state.tournamentJoined = true;
        state.tournamentParticipants++;
        saveState();
        joinTournamentBtn.textContent = state.lang === 'RU' ? '✓ ВЫ УЧАСТВУЕТЕ' : '✓ REGISTERED';
        joinTournamentBtn.style.background = '#10b981';
        joinTournamentBtn.style.color = '#ffffff';
        $('tournament-participants-count').textContent = `${state.tournamentParticipants.toLocaleString()} ${state.lang === 'RU' ? 'игроков' : 'players'}`;
      }
    });
  }

  document.querySelectorAll('.faq-card, .faq-section__card').forEach((card) => {
    const trigger = card.querySelector('.faq-card__trigger, .faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isOpen = card.classList.contains('open') || card.classList.contains('faq-card--open');
        document.querySelectorAll('.faq-card, .faq-section__card').forEach((c) => {
          c.classList.remove('open', 'faq-card--open');
        });
        if (!isOpen) {
          card.classList.add('open', 'faq-card--open');
        }
      });
    }
  });

  $('trigger-wheel-btn')?.addEventListener('click', () => openModal('lucky-wheel-modal'));
  $('trigger-wheel-btn-sidebar')?.addEventListener('click', () => { closeSidebar(); openModal('lucky-wheel-modal'); });
  $('close-wheel-btn')?.addEventListener('click', () => closeModal('lucky-wheel-modal'));
  $('spin-wheel-btn')?.addEventListener('click', () => {
    spinWheel({
      canvas: $('wheel-canvas'),
      spinBtn: $('spin-wheel-btn'),
      wonText: $('wheel-won-text'),
      state,
      saveState,
      onBalanceUpdate: syncWallet
    });
  });

  $('trigger-bonuses-btn')?.addEventListener('click', () => { closeSidebar(); openModal('bonuses-modal'); });
  $('close-bonuses-btn')?.addEventListener('click', () => closeModal('bonuses-modal'));

  $('trigger-support-btn')?.addEventListener('click', () => { closeSidebar(); openModal('support-modal'); });
  $('close-support-btn')?.addEventListener('click', () => closeModal('support-modal'));

  $('trigger-history-btn')?.addEventListener('click', () => {
    renderHistory(state);
    openModal('history-drawer');
  });
  $('trigger-history-btn-sidebar')?.addEventListener('click', () => {
    closeSidebar();
    renderHistory(state);
    openModal('history-drawer');
  });
  $('close-history-btn')?.addEventListener('click', () => closeModal('history-drawer'));

  $('sidebar-tournament-widget')?.addEventListener('click', () => {
    closeSidebar();
    $('tournaments-section')?.scrollIntoView({ behavior: 'smooth' });
  });
  $('sidebar-mini-tournament-widget')?.addEventListener('click', () => {
    closeSidebar();
    $('tournaments-section')?.scrollIntoView({ behavior: 'smooth' });
  });
  $('sidebar-vip-loyalty-widget')?.addEventListener('click', () => {
    closeSidebar();
    $('vip-loyalty-section')?.scrollIntoView({ behavior: 'smooth' });
  });

  const promoClaimBtn = $('promo-claim-btn');
  const promoWheelBtn = $('promo-wheel-trigger-btn');
  const todayStr = new Date().toDateString();

  if (safeGetStorage('spinpulse_promo_crate_claimed', '') === todayStr && promoClaimBtn) {
    promoClaimBtn.classList.add('claimed');
    promoClaimBtn.textContent = state.lang === 'RU' ? 'Бонус получен ✓' : 'Bonus Claimed ✓';
  }

  promoWheelBtn?.addEventListener('click', () => {
    openModal('lucky-wheel-modal');
  });

  promoClaimBtn?.addEventListener('click', () => {
    playButtonClick();
    const today = new Date().toDateString();
    if (safeGetStorage('spinpulse_promo_crate_claimed', '') === today) {
      const msg = state.lang === 'RU' 
        ? 'Вы уже забрали сегодняшний бонус! Открываем список промокодов.' 
        : 'You have already claimed today\'s bonus! Opening promo codes.';
      showToast(msg);
      openModal('bonuses-modal');
      return;
    }

    try {
      localStorage.setItem('spinpulse_promo_crate_claimed', today);
    } catch {
    }

    state.balance += 500;
    saveState();
    syncWallet();
    playWinCoinsSound();

    const toastMsg = state.lang === 'RU' 
      ? 'Поздравляем! Начислено +$500 demo монет!' 
      : 'Congratulations! +$500 demo coins credited!';
    showToast(toastMsg);

    promoClaimBtn.classList.add('claimed');
    promoClaimBtn.textContent = state.lang === 'RU' ? 'Бонус получен ✓' : 'Bonus Claimed ✓';
  });

  $('gm-close-btn')?.addEventListener('click', closeGameModal);

  $('gm-reload-btn')?.addEventListener('click', () => {
    const iframe = $('gm-iframe');
    const loader = $('gm-loader');
    if (iframe && iframe.src && iframe.src !== 'about:blank') {
      if (loader) loader.classList.remove('hidden');
      const cur = iframe.src;
      iframe.src = cur;
    }
  });

  $('gm-fullscreen-btn')?.addEventListener('click', () => {
    const card = document.querySelector('.game-modal-card');
    if (!card) return;
    if (!document.fullscreenElement) {
      if (card.requestFullscreen) {
        card.requestFullscreen().catch(() => {});
      } else if (card.webkitRequestFullscreen) {
        card.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && $('game-modal')?.classList.contains('active')) {
      closeGameModal();
    }
  });

  document.querySelectorAll('.modal-backdrop, .drawer-backdrop').forEach((backdropEl) => {
    backdropEl.addEventListener('click', (e) => {
      if (e.target === backdropEl) {
        if (backdropEl.id === 'game-modal') {
          closeGameModal();
        } else {
          backdropEl.classList.remove('active');
        }
      }
    });
  });

  function setLanguage(newLang) {
    if (newLang !== 'RU' && newLang !== 'EN') return;
    state.lang = newLang;
    saveState();
    playButtonClick();
    safeRun(() => applyTranslations(state.lang, state), 'applyTranslations');
    safeRun(updateHeroTexts, 'updateHeroTexts');
    safeRun(renderGames, 'renderGames');

    try {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', newLang.toLowerCase());
      window.history.replaceState({}, '', url.toString());
    } catch {
    }

    document.querySelectorAll('[data-lang]').forEach((btn) => {
      const btnLang = btn.getAttribute('data-lang')?.toUpperCase();
      btn.classList.toggle('active', btnLang === newLang);
    });

    showToast(newLang === 'RU' ? '🇷🇺 Язык: Русский' : '🇬🇧 Language: English', 'win');
  }

  document.querySelectorAll('#header-lang-switch button').forEach((btn) => {
    function handleLang(e) {
      if (e && e.type === 'touchstart') e.preventDefault();
      const targetLang = btn.getAttribute('data-lang')?.toUpperCase();
      if (targetLang) {
        setLanguage(targetLang);
      }
    }
    btn.addEventListener('click', handleLang);
    btn.addEventListener('touchstart', handleLang, { passive: false });
  });

  const headerSwitch = $('header-lang-switch');
  if (headerSwitch) {
    headerSwitch.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-lang]');
      if (btn) {
        const targetLang = btn.getAttribute('data-lang')?.toUpperCase();
        if (targetLang) {
          setLanguage(targetLang);
        }
      }
    });
  }

  window.addEventListener('popstate', () => {
    const queryLang = getInitialLanguage();
    if (queryLang !== state.lang) {
      state.lang = queryLang;
      applyTranslations(state.lang, state);
      updateHeroTexts();
      renderGames();
      document.querySelectorAll('[data-lang]').forEach((btn) => {
        const btnLang = btn.getAttribute('data-lang')?.toUpperCase();
        btn.classList.toggle('active', btnLang === state.lang);
      });
    }
  });

  document.querySelectorAll('.support-faq-section__btn, .support-faq-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-faq-target');
      const ansEl = $(targetId);
      if (ansEl) {
        const isHidden = ansEl.style.display === 'none';
        ansEl.style.display = isHidden ? 'block' : 'none';
        const arrow = btn.querySelector('.support-faq-section__arrow, .faq-chip-arrow');
        if (arrow) arrow.textContent = isHidden ? '▲' : '▼';
      }
    });
  });

  const supportForm = $('support-ticket-form');
  if (supportForm) {
    supportForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = $('support-ticket-message')?.value.trim();
      if (!message) return;

      playWinCoinsSound();
      const ticketId = 'SP-' + Math.floor(100000 + Math.random() * 900000);
      const successCard = $('support-ticket-success');
      const formCard = $('support-ticket-form-wrap');
      if (successCard && formCard) {
        const ticketNumEl = $('support-ticket-number');
        if (ticketNumEl) ticketNumEl.textContent = ticketId;
        formCard.style.display = 'none';
        successCard.style.display = 'block';
      }
      showToast(state.lang === 'RU' ? `Тикет #${ticketId} зарегистрирован!` : `Ticket #${ticketId} submitted!`, 'win');
    });
  }

  $('support-new-ticket-btn')?.addEventListener('click', () => {
    const successCard = $('support-ticket-success');
    const formCard = $('support-ticket-form-wrap');
    if (successCard && formCard) {
      successCard.style.display = 'none';
      formCard.style.display = 'block';
      $('support-ticket-form')?.reset();
    }
  });

  document.querySelectorAll('.bonus-card-item__copy-btn, .copy-code-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const code = btn.getAttribute('data-code');
      navigator.clipboard.writeText(code).then(() => {
        const orig = btn.textContent;
        const dict = getDictionary(state.lang);
        btn.textContent = dict.copiedBtn;
        setTimeout(() => { btn.textContent = orig; }, 2000);
      });
    });
  });

  document.querySelectorAll('.bonus-card-item__activate-btn, .activate-bonus-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      playWinCoinsSound();
      const amt = parseInt(btn.getAttribute('data-amount') || '300');
      state.balance += amt;
      saveState();
      syncWallet();
      const dict = getDictionary(state.lang);
      btn.textContent = dict.claimedBtn;
      btn.disabled = true;
      btn.style.opacity = '0.6';
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
