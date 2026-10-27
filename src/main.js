import { initialWinners, currentTournament } from './data.js';
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
import { recordGameLaunch, renderHistory } from './modules/history.js';
import { initHeroCarousel, updateHeroTexts } from './modules/carousel.js';
import { renderGames, renderSkeletons, initCatalog } from './modules/catalog.js';
import { initTournament } from './modules/tournament.js';
import { initFaqAccordion } from './modules/faq.js';
import { createStore } from './modules/store.js';
import { 
  fetchGamesCatalog, 
  fetchRecentWinners, 
  submitSupportTicket 
} from './services/api.js';

const $ = (id) => document.getElementById(id);

function getInitialLanguage() {
  try {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('lang')?.toUpperCase();
    if (q === 'EN' || q === 'RU') return q;
  } catch {}

  try {
    const saved = localStorage.getItem('spinpulse_lang')?.toUpperCase();
    if (saved === 'EN' || saved === 'RU') return saved;
  } catch {}

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

const store = createStore({
  lang: getInitialLanguage(),
  balance: parseFloat(safeGetStorage('spinpulse_balance', '2500')) || 2500,
  favorites: new Set(safeGetStorageJSON('spinpulse_favorites', [])),
  hasClaimedDaily: safeGetStorage('spinpulse_daily_claimed', '') === new Date().toDateString(),
  history: safeGetStorageJSON('spinpulse_history', []),
  games: [],
  gamesLoading: true,
  activeCategory: 'all',
  selectedProvider: 'All Providers',
  searchQuery: '',
  visibleCount: 18,
  jackpots: {
    grand: 4821590.84,
    major: 248190.15,
    mini: 14850.50
  },
  winners: [...initialWinners],
  tournamentJoined: false,
  tournamentParticipants: currentTournament.participantsCount
});

const state = store.state;

// Reactive state subscribers
store.subscribe((prop, value) => {
  if (prop === 'balance') {
    updateBalanceDisplay(value);
    try {
      localStorage.setItem('spinpulse_balance', value.toString());
    } catch {}
  } else if (prop === 'favorites') {
    updateFavoritesCounter(value);
    try {
      localStorage.setItem('spinpulse_favorites', JSON.stringify([...value]));
    } catch {}
  } else if (prop === 'lang') {
    try {
      localStorage.setItem('spinpulse_lang', value);
    } catch {}
  } else if (prop === 'history') {
    try {
      localStorage.setItem('spinpulse_history', JSON.stringify(value.slice(0, 40)));
    } catch {}
  }
});

function saveState() {
  try {
    localStorage.setItem('spinpulse_lang', state.lang);
    localStorage.setItem('spinpulse_balance', state.balance.toString());
    localStorage.setItem('spinpulse_favorites', JSON.stringify([...state.favorites]));
    localStorage.setItem('spinpulse_history', JSON.stringify(state.history.slice(0, 40)));
  } catch {}
}

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
  recordGameLaunch(game, state, saveState, openGameModal);
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

function initApp() {
  mountModals();
  applyTranslations(state.lang, state);
  syncWallet();

  initHeroCarousel(state.lang, openModal);
  initCatalog(state, saveState, openGameModal, updateFavoritesCounter, closeSidebar);

  // Render initial skeletons while API is loading
  renderSkeletons(12);

  initTournament(state, saveState);
  initFaqAccordion();
  renderHistory(state, openGameModal);

  // Asynchronous games catalog fetch from JSON API
  fetchGamesCatalog().then((games) => {
    state.games = games;
    state.gamesLoading = false;
    renderGames(state, saveState, openGameModal, updateFavoritesCounter);
    updateFavoritesCounter(state.favorites);
    renderHistory(state, openGameModal);
  });

  // Asynchronous live winners fetch
  fetchRecentWinners().then((winners) => {
    if (winners && winners.length) {
      state.winners = winners;
      const liveWinsEl = $('live-wins-list');
      if (liveWinsEl) renderLiveWins(liveWinsEl, state.winners);
    }
  });

  // Sound toggle button
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

  // Wallet top up
  $('topup-btn')?.addEventListener('click', () => {
    topUpBalance(state, 500, saveState, syncWallet);
  });

  // Daily bonus claim
  const dailyBtn = $('header-daily-btn');
  if (state.hasClaimedDaily && dailyBtn) {
    dailyBtn.classList.add('claimed');
    const textSpan = dailyBtn.querySelector('span:last-child');
    if (textSpan) textSpan.textContent = state.lang === 'RU' ? 'Бонус взят' : 'Claimed';
  }

  if (dailyBtn) {
    dailyBtn.addEventListener('click', () => {
      if (claimDailyBonus(state, saveState, syncWallet)) {
        dailyBtn.classList.add('claimed');
        const textSpan = dailyBtn.querySelector('span:last-child');
        if (textSpan) textSpan.textContent = state.lang === 'RU' ? 'Бонус взят' : 'Claimed';
      }
    });
  }

  // Mobile sidebar controls
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
  if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
  if (backdrop) backdrop.addEventListener('click', closeSidebar);

  // Notification dropdown
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

  // Dynamic jackpot counters
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

  // Modals and Drawers triggers
  $('trigger-bonuses-btn')?.addEventListener('click', () => openModal('bonuses-modal'));
  $('trigger-bonuses-btn-sidebar')?.addEventListener('click', () => { closeSidebar(); openModal('bonuses-modal'); });
  $('close-bonuses-btn')?.addEventListener('click', () => closeModal('bonuses-modal'));

  $('trigger-support-btn')?.addEventListener('click', () => { closeSidebar(); openModal('support-modal'); });
  $('close-support-btn')?.addEventListener('click', () => closeModal('support-modal'));

  $('trigger-history-btn')?.addEventListener('click', () => {
    renderHistory(state, openGameModal);
    openModal('history-drawer');
  });
  $('trigger-history-btn-sidebar')?.addEventListener('click', () => {
    closeSidebar();
    renderHistory(state, openGameModal);
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

  // Promo section bonus claim
  const promoClaimBtn = $('promo-claim-btn');
  const promoBonusesBtn = $('promo-bonuses-trigger-btn');
  const todayStr = new Date().toDateString();

  if (safeGetStorage('spinpulse_promo_crate_claimed', '') === todayStr && promoClaimBtn) {
    promoClaimBtn.classList.add('claimed');
    promoClaimBtn.textContent = state.lang === 'RU' ? 'Бонус получен ✓' : 'Bonus Claimed ✓';
  }

  promoBonusesBtn?.addEventListener('click', () => openModal('bonuses-modal'));

  promoClaimBtn?.addEventListener('click', () => {
    playButtonClick();
    const today = new Date().toDateString();
    if (safeGetStorage('spinpulse_promo_crate_claimed', '') === today) {
      showToast(state.lang === 'RU' 
        ? 'Вы уже забрали сегодняшний бонус! Открываем список промокодов.' 
        : 'You have already claimed today\'s bonus! Opening promo codes.');
      openModal('bonuses-modal');
      return;
    }

    try {
      localStorage.setItem('spinpulse_promo_crate_claimed', today);
    } catch {}

    state.balance += 500;
    saveState();
    syncWallet();
    playWinCoinsSound();

    showToast(state.lang === 'RU' 
      ? 'Поздравляем! Начислено +$500 demo монет!' 
      : 'Congratulations! +$500 demo coins credited!');

    promoClaimBtn.classList.add('claimed');
    promoClaimBtn.textContent = state.lang === 'RU' ? 'Бонус получен ✓' : 'Bonus Claimed ✓';
  });

  // Game modal toolbar controls
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

  // Delegated close clicks & backdrop dismissal
  document.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('#close-bonuses-btn, #close-support-btn, #close-history-btn, #gm-close-btn, #sidebar-close-btn, .modal-card__close-btn, .support-modal-card__close-btn, .drawer-card__close-btn, .game-modal-card__btn--close, .sidebar-close-btn');
    if (closeBtn) {
      e.preventDefault();
      e.stopPropagation();
      playButtonClick();
      closeSidebar();
      closeGameModal();
      closeModal('bonuses-modal');
      closeModal('support-modal');
      closeModal('history-drawer');
      return;
    }

    const backdropEl = e.target.closest('.modal-backdrop, .drawer-backdrop');
    if (backdropEl && e.target === backdropEl) {
      e.preventDefault();
      closeSidebar();
      if (backdropEl.id === 'game-modal') {
        closeGameModal();
      } else {
        backdropEl.classList.remove('active');
      }
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSidebar();
      closeGameModal();
      closeModal('bonuses-modal');
      closeModal('support-modal');
      closeModal('history-drawer');
    }
  });

  // Language switcher
  function setLanguage(newLang) {
    if (newLang !== 'RU' && newLang !== 'EN') return;
    state.lang = newLang;
    saveState();
    playButtonClick();
    applyTranslations(state.lang, state);
    updateHeroTexts(state.lang);
    renderGames(state, saveState, openGameModal, updateFavoritesCounter);

    try {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', newLang.toLowerCase());
      window.history.replaceState({}, '', url.toString());
    } catch {}

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
      if (targetLang) setLanguage(targetLang);
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
        if (targetLang) setLanguage(targetLang);
      }
    });
  }

  // Support ticket form with asynchronous submit to backend service
  const supportForm = $('support-ticket-form');
  const submitBtn = $('support-submit-btn');

  if (supportForm) {
    supportForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = $('support-ticket-email')?.value.trim();
      const category = $('support-ticket-category')?.value;
      const message = $('support-ticket-message')?.value.trim();

      if (!email || !message) return;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.originalHtml = submitBtn.innerHTML;
        submitBtn.innerHTML = `
          <span class="spinner-small" style="margin-right: 8px;"></span>
          <span>${state.lang === 'RU' ? 'Отправка...' : 'Submitting...'}</span>
        `;
      }

      try {
        const res = await submitSupportTicket({ email, category, message });
        playWinCoinsSound();

        const successCard = $('support-ticket-success');
        const formCard = $('support-ticket-form-wrap');
        if (successCard && formCard) {
          const ticketNumEl = $('support-ticket-number');
          if (ticketNumEl) ticketNumEl.textContent = res.ticketId;
          formCard.style.display = 'none';
          successCard.style.display = 'block';
        }
        showToast(
          state.lang === 'RU' 
            ? `Тикет #${res.ticketId} отправлен в поддержку!` 
            : `Ticket #${res.ticketId} submitted to support!`, 
          'win'
        );
      } catch (err) {
        showToast(
          state.lang === 'RU' ? 'Ошибка отправки обращения' : 'Error submitting ticket', 
          'loss'
        );
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          if (submitBtn.dataset.originalHtml) {
            submitBtn.innerHTML = submitBtn.dataset.originalHtml;
          }
        }
      }
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

  // Bonuses promo codes copy & activate
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
      const amt = parseInt(btn.getAttribute('data-amount') || '300', 10);
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
