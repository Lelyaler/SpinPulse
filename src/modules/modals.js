export function createModalsMarkup() {
  return `
    <!-- Lucky Wheel Modal -->
    <div id="lucky-wheel-modal" class="modal-backdrop modal-backdrop--wheel">
      <div class="modal-card wheel-modal-card">
        <button id="close-wheel-btn" class="modal-card__close-btn modal-close-btn" aria-label="Close">✕</button>
        <div class="wheel-modal-card__header-row wheel-header-row">
          <span class="wheel-modal-card__title-icon wheel-title-icon">🎡</span>
          <h3 class="wheel-modal-card__title wheel-modal-title" data-i18n="wheelTitle">Колесо Удачи</h3>
        </div>
        <p class="wheel-modal-card__desc wheel-modal-desc" data-i18n="wheelDesc">Крутите колесо и выигрывайте до $2,500 demo монет!</p>

        <div class="wheel-modal-card__container wheel-container">
          <div class="wheel-modal-card__pointer wheel-pointer"></div>
          <canvas id="wheel-canvas" class="wheel-modal-card__canvas wheel-canvas"></canvas>
        </div>

        <div id="wheel-won-text" class="wheel-modal-card__result-text wheel-result-text"></div>

        <button id="spin-wheel-btn" class="wheel-modal-card__spin-btn btn-spin-wheel" type="button" data-i18n="spinWheelBtn">
          КРУТИТЬ КОЛЕСО
        </button>
      </div>
    </div>

    <!-- Bonuses Modal -->
    <div id="bonuses-modal" class="modal-backdrop modal-backdrop--bonuses">
      <div class="modal-card bonuses-modal-card">
        <button id="close-bonuses-btn" class="modal-card__close-btn modal-close-btn" aria-label="Close">✕</button>
        <div class="bonuses-modal-card__header bonuses-modal-header">
          <span class="bonuses-modal-card__header-icon bonuses-header-icon">🎁</span>
          <div class="bonuses-modal-card__header-texts">
            <h3 class="bonuses-modal-card__title bonuses-modal-title" data-i18n="bonusesModalTitle">Бонусы и промокоды</h3>
            <span class="bonuses-modal-card__sub bonuses-modal-sub" data-i18n="bonusesModalSub">Активируйте эксклюзивные бонусные коды</span>
          </div>
        </div>

        <div class="bonuses-modal-card__list bonuses-list-scroll">
          <div class="bonus-card-item bonus-card-item--welcome welcome-bonus">
            <div class="bonus-card-item__top bonus-card-top">
              <span class="bonus-card-item__tag bonus-tag tag-welcome">WELCOME PACK</span>
              <span class="bonus-card-item__amount-badge bonus-amount-badge">+$600 Demo Coins</span>
            </div>
            <h4 class="bonus-card-item__title">100% First Deposit + 500 Free Spins</h4>
            <p class="bonus-card-item__desc bonus-card-desc" data-i18n="bonus1Desc">Увеличьте демо-баланс для игры во все слоты Pragmatic & Evolution.</p>
            <div class="bonus-card-item__actions bonus-card-actions">
              <button class="bonus-card-item__copy-btn copy-code-btn" data-code="IZZIPULSE100">IZZIPULSE100 📋</button>
              <button class="bonus-card-item__activate-btn activate-bonus-btn hero-cta-btn" data-amount="600" data-i18n="activateBtn">Активировать</button>
            </div>
          </div>

          <div class="bonus-card-item bonus-card-item--reload reload-bonus">
            <div class="bonus-card-item__top bonus-card-top">
              <span class="bonus-card-item__tag bonus-tag tag-reload">WEEKLY RELOAD</span>
              <span class="bonus-card-item__amount-badge bonus-amount-badge">+$300 Demo Coins</span>
            </div>
            <h4 class="bonus-card-item__title">Friday Reload 50% Match</h4>
            <p class="bonus-card-item__desc bonus-card-desc" data-i18n="bonus2Desc">Пятничный буст баланса для активных игроков.</p>
            <div class="bonus-card-item__actions bonus-card-actions">
              <button class="bonus-card-item__copy-btn copy-code-btn" data-code="FRIDAY50">FRIDAY50 📋</button>
              <button class="bonus-card-item__activate-btn activate-bonus-btn hero-cta-btn" data-amount="300" data-i18n="activateBtn">Активировать</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Help & Support Ticket Center Modal -->
    <div id="support-modal" class="modal-backdrop modal-backdrop--support">
      <div class="modal-card support-modal-card">
        <div class="support-modal-card__header support-header">
          <div class="support-modal-card__title-group support-title-group">
            <span class="support-modal-card__header-icon support-header-icon">🎧</span>
            <div class="support-modal-card__title-texts">
              <h3 class="support-modal-card__title support-title" data-i18n="supportTitle">Центр поддержки SpinPulse</h3>
              <span class="support-modal-card__online-status support-online-status" data-i18n="supportOnlineStatus">● Дежурный специалист онлайн (24/7)</span>
            </div>
          </div>
          <button id="close-support-btn" class="support-modal-card__close-btn modal-close-btn modal-close-static" aria-label="Close">✕</button>
        </div>

        <div class="support-modal-card__body support-modal-body">
          <div class="support-faq-section">
            <div class="support-faq-section__label support-section-label" data-i18n="supportFaqLabel">Частые вопросы:</div>
            <div class="support-faq-section__chips support-faq-chips">
              <div class="support-faq-section__item support-faq-item">
                <button type="button" class="support-faq-section__btn support-faq-btn" data-faq-target="faq-ans-1">
                  <span data-i18n="promptHowToTopup">Как пополнить баланс?</span>
                  <span class="support-faq-section__arrow faq-chip-arrow">▼</span>
                </button>
                <div id="faq-ans-1" class="support-faq-section__ans support-faq-ans" data-i18n="supportReplyTopup" style="display:none;">
                  Для пополнения демо-баланса нажмите кнопку «Депозит» в шапке сайта (+$500) или заберите ежедневный бонус +$250!
                </div>
              </div>
              <div class="support-faq-section__item support-faq-item">
                <button type="button" class="support-faq-section__btn support-faq-btn" data-faq-target="faq-ans-2">
                  <span data-i18n="promptWhereWheel">Колесо Удачи и фриспины</span>
                  <span class="support-faq-section__arrow faq-chip-arrow">▼</span>
                </button>
                <div id="faq-ans-2" class="support-faq-section__ans support-faq-ans" data-i18n="supportReplyWheel" style="display:none;">
                  Колесо Удачи доступно через кнопку в шапке (VIP аватар), а также в боковом меню! Бесплатный спин доступен прямо сейчас.
                </div>
              </div>
              <div class="support-faq-section__item support-faq-item">
                <button type="button" class="support-faq-section__btn support-faq-btn" data-faq-target="faq-ans-3">
                  <span data-i18n="promptTournaments">Турниры и таблица лидеров</span>
                  <span class="support-faq-section__arrow faq-chip-arrow">▼</span>
                </button>
                <div id="faq-ans-3" class="support-faq-section__ans support-faq-ans" data-i18n="supportReplyTournaments" style="display:none;">
                  Очки в турнире начисляются автоматически при выигрышных спинах в любых слотах! Чем выше множитель выигрыша, тем больше баллов вы получаете в таблице лидеров.
                </div>
              </div>
            </div>
          </div>

          <div id="support-ticket-form-wrap" class="support-ticket-form-wrap">
            <div class="support-ticket-form-wrap__label support-section-label" data-i18n="supportTicketFormLabel">Отправить обращение в поддержку:</div>
            <form id="support-ticket-form" class="support-ticket-form">
              <div class="support-ticket-form__field-group support-field-group">
                <label class="support-ticket-form__field-label support-field-label" data-i18n="supportTopicLabel">Тема обращения:</label>
                <select id="support-ticket-category" class="support-ticket-form__select support-select" required>
                  <option value="tech" data-i18n="supportTopicTech">Технический вопрос / Запуск слота</option>
                  <option value="bonus" data-i18n="supportTopicBonus">Бонусы и промокоды</option>
                  <option value="wallet" data-i18n="supportTopicWallet">Демо-баланс и статистика</option>
                  <option value="feedback" data-i18n="supportTopicFeedback">Предложение по улучшению</option>
                </select>
              </div>

              <div class="support-ticket-form__field-group support-field-group">
                <label class="support-ticket-form__field-label support-field-label" data-i18n="supportEmailLabel">Ваш контактный Email:</label>
                <input 
                  type="email" 
                  id="support-ticket-email" 
                  class="support-ticket-form__input support-input-field" 
                  placeholder="player@spinpulse.io" 
                  required
                />
              </div>

              <div class="support-ticket-form__field-group support-field-group">
                <label class="support-ticket-form__field-label support-field-label" data-i18n="supportMessageLabel">Сообщение:</label>
                <textarea 
                  id="support-ticket-message" 
                  class="support-ticket-form__textarea support-textarea-field" 
                  rows="3" 
                  placeholder="Опишите ваш вопрос или возникшую сложность..." 
                  data-i18n-placeholder="supportTextareaPlaceholder"
                  required
                ></textarea>
              </div>

              <button type="submit" id="support-submit-btn" class="support-ticket-form__submit-btn hero-cta-btn support-ticket-submit-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
                <span data-i18n="supportSubmitBtn">Отправить обращение</span>
              </button>
            </form>
          </div>

          <div id="support-ticket-success" class="support-ticket-success" style="display: none;">
            <div class="support-ticket-success__badge support-success-badge">✓</div>
            <h4 class="support-ticket-success__title support-success-title" data-i18n="supportSuccessTitle">Обращение зарегистрировано</h4>
            <div class="support-ticket-success__pill support-ticket-pill">TICKET #<span id="support-ticket-number">SP-948201</span></div>
            <p class="support-ticket-success__desc support-success-desc" data-i18n="supportSuccessDesc">
              Ваш запрос передан дежурному специалисту. Ответ будет направлен на указанный email в течение 10–15 минут.
            </p>
            <button type="button" id="support-new-ticket-btn" class="support-ticket-success__new-btn btn-clear-history support-new-ticket-btn" data-i18n="supportNewTicketBtn">
              Создать ещё обращение
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Plays Drawer -->
    <div id="history-drawer" class="drawer-backdrop drawer-backdrop--history">
      <div class="drawer-card">
        <div class="drawer-card__header drawer-header">
          <div class="drawer-card__title-group drawer-title-group">
            <span class="drawer-card__icon drawer-icon">📜</span>
            <h3 class="drawer-card__title drawer-title" data-i18n="historyTitle">История спинов сессии</h3>
          </div>
          <button id="close-history-btn" class="drawer-card__close-btn modal-close-btn modal-close-static" aria-label="Close">✕</button>
        </div>
        <div class="drawer-card__body drawer-body">
          <div class="drawer-card__summary-box history-summary-box">
            <div class="drawer-card__summary-item">
              <span class="drawer-card__stat-label history-stat-label" data-i18n="historyTotalBets">Сумма ставок</span>
              <div id="history-total-bets" class="drawer-card__stat-val history-stat-val">$0.00</div>
            </div>
            <div class="drawer-card__summary-item">
              <span class="drawer-card__stat-label history-stat-label" data-i18n="historySessionResult">Результат сессии</span>
              <div id="history-session-result" class="drawer-card__stat-val history-stat-val val-profit">+$0.00</div>
            </div>
          </div>
          <div id="history-rounds-list" class="drawer-card__rounds-list history-rounds-list"></div>
          <div id="history-empty-note" class="drawer-card__empty-note history-empty-note" style="display: none;">
            <div class="drawer-card__empty-icon history-empty-icon">🎰</div>
            <h4 class="drawer-card__empty-title history-empty-title">Нет ставок в текущей сессии</h4>
            <p class="drawer-card__empty-desc history-empty-desc">Запускайте любые демо-слоты из каталога — каждый раунд и выигрыш сразу фиксируются здесь.</p>
            <button type="button" id="history-spin-now-btn" class="drawer-card__spin-btn history-spin-btn">Перейти к играм</button>
          </div>
        </div>
        <div class="drawer-card__footer drawer-footer">
          <div class="drawer-card__footer-stats drawer-footer-stats">
            <span class="drawer-card__stat-item footer-stat-item">Раундов: <strong id="history-total-count">0</strong></span>
            <span class="drawer-card__stat-item footer-stat-item">Макс: <strong id="history-max-win" class="val-profit">$0.00</strong></span>
          </div>
          <button id="clear-history-btn" type="button" class="drawer-card__clear-btn btn-clear-history" title="Очистить историю ставок">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            <span>Очистить</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Live Playable Slot Game Modal -->
    <div id="game-modal" class="modal-backdrop game-modal-backdrop" aria-hidden="true" role="dialog" aria-modal="true">
      <div class="game-modal-card">
        <div class="game-modal-card__header game-modal-header">
          <div class="game-modal-card__info gm-info">
            <div class="game-modal-card__badge-row gm-badge-row">
              <span class="game-modal-card__live-badge gm-live-badge">
                <span class="game-modal-card__pulse-dot gm-pulse-dot"></span>
                <span data-i18n="gmPlayLive">LIVE DEMO</span>
              </span>
            </div>
            <h3 id="gm-title" class="game-modal-card__title gm-title">Gates of Olympus 1000</h3>
          </div>
          <div class="game-modal-card__actions gm-actions">
            <button id="gm-fullscreen-btn" class="game-modal-card__btn gm-btn gm-btn-icon" type="button" title="Fullscreen" aria-label="Fullscreen">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
            </button>
            <a id="gm-external-btn" class="game-modal-card__btn gm-btn gm-btn-icon" href="#" target="_blank" rel="noopener noreferrer" title="Open in new window" aria-label="Open in new window">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
            <button id="gm-close-btn" class="game-modal-card__btn game-modal-card__btn--close gm-btn gm-btn-close" type="button" title="Close Game" aria-label="Close">
              ✕
            </button>
          </div>
        </div>

        <div class="game-modal-card__frame-wrapper game-modal-frame-wrapper" id="gm-frame-wrapper">
          <div id="gm-loader" class="game-modal-card__loader gm-loader">
            <div class="game-modal-card__spinner gm-spinner"></div>
            <span class="game-modal-card__loader-text gm-loader-text" data-i18n="gmConnecting">Запуск слота...</span>
            <span class="game-modal-card__loader-sub gm-loader-sub" data-i18n="gmLoadingEngine">Подключение официального демо-сервера...</span>
          </div>
          <iframe 
            id="gm-iframe" 
            class="game-modal-card__iframe gm-iframe" 
            src="about:blank" 
            allow="autoplay; fullscreen; screen-wake-lock; encrypted-media" 
            allowfullscreen 
            referrerpolicy="no-referrer-when-downgrade" 
            title="Slot Game Player"
          ></iframe>
        </div>

        <div class="game-modal-card__footer game-modal-footer">
          <div class="game-modal-card__tip gm-footer-tip">
            <span class="game-modal-card__tip-icon gm-tip-icon">💡</span>
            <span data-i18n="gmDemoDisclaimer">Бесплатный демо-режим слота от официального сервера провайдера. Ставки виртуальные.</span>
          </div>
          <button type="button" class="game-modal-card__reload-btn gm-footer-action-btn" id="gm-reload-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            <span data-i18n="gmReload">Перезагрузить</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

export function mountModals() {
  let root = document.getElementById('modals-root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'modals-root';
    document.body.appendChild(root);
  }
  root.innerHTML = createModalsMarkup();
}
