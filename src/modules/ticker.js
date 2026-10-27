/**
 * Renders the latest live win notifications in the lobby widget.
 * @param {HTMLElement} container - DOM container element
 * @param {Array} winners - List of recent winner records
 */
export function renderLiveWins(container, winners = []) {
  if (!container) return;

  container.innerHTML = winners.slice(0, 5).map((w) => `
    <div class="win-item live-wins-card__item">
      <div class="win-item__user-info win-user-info">
        <span class="win-item__avatar win-avatar">${w.avatar}</span>
        <div class="win-item__user-text win-user-text">
          <span class="win-item__username win-username">${w.user}</span>
          <span class="win-item__game-title win-game-title">${w.gameTitle}</span>
        </div>
      </div>
      <div class="win-item__amount-meta win-amount-meta">
        <span class="win-item__mult-pill win-mult-pill">${w.multiplier}x</span>
        <span class="win-item__amount win-amount">+$${w.amount.toFixed(2)}</span>
      </div>
    </div>
  `).join('');
}

/**
 * Periodically increments jackpot pools to simulate dynamic network activity.
 * Uses a variable timeout to feel more organic than a fixed interval.
 * @param {Object} jackpots - Object holding grand, major, and mini balances
 * @param {Function} callback - Callback invoked whenever values update
 * @returns {Function} Cleanup function to stop updates
 */
export function initJackpotTicker(jackpots, callback) {
  let timerId = null;
  let isRunning = true;

  function scheduleNextTick() {
    if (!isRunning) return;

    // Randomize tick delays between 2.2s and 4.2s
    const delay = 2200 + Math.random() * 2000;
    timerId = setTimeout(() => {
      // Simulate micro-contributions from network bets
      jackpots.grand += Number((Math.random() * 0.35 + 0.05).toFixed(2));
      jackpots.major += Number((Math.random() * 0.12 + 0.02).toFixed(2));
      jackpots.mini += Number((Math.random() * 0.04 + 0.01).toFixed(2));

      if (callback) callback(jackpots);
      scheduleNextTick();
    }, delay);
  }

  scheduleNextTick();

  return () => {
    isRunning = false;
    if (timerId) clearTimeout(timerId);
  };
}
