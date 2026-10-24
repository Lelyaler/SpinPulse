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

export function initJackpotTicker(jackpots, callback) {
  // Simulates small realistic increments in progressive jackpot pools
  const interval = setInterval(() => {
    jackpots.grand += Math.random() * 0.45;
    jackpots.major += Math.random() * 0.15;
    jackpots.mini += Math.random() * 0.05;
    if (callback) callback(jackpots);
  }, 3500);

  return () => clearInterval(interval);
}
