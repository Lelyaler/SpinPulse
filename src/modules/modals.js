export function createModalsMarkup() {
  return `
    <!-- Bonuses Modal -->
    <div id="bonuses-modal" class="modal-backdrop modal-backdrop--bonuses">
      <div class="modal-card bonuses-modal-card">
        <button id="close-bonuses-btn" class="modal-card__close-btn" aria-label="Close">✕</button>
        <div class="bonuses-modal-card__header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="bonuses-modal-card__header-icon"><path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
          <div class="bonuses-modal-card__header-texts">
            <h3 class="bonuses-modal-card__title" data-i18n="bonusesModalTitle">Бонусы и промокоды</h3>
            <span class="bonuses-modal-card__sub" data-i18n="bonusesModalSub">Активируйте эксклюзивные бонусные коды</span>
          </div>
        </div>

        <div class="bonuses-modal-card__list">
          <div class="bonus-card-item bonus-card-item--welcome welcome-bonus">
            <div class="bonus-card-item__top">
              <span class="bonus-card-item__tag">WELCOME PACK</span>
              <span class="bonus-card-item__amount-badge">+$600 Demo Coins</span>
            </div>
            <h4 class="bonus-card-item__title">100% First Deposit + 500 Free Spins</h4>
            <p class="bonus-card-item__desc" data-i18n="bonus1Desc">Увеличьте демо-баланс для игры во все слоты Pragmatic & Evolution.</p>
            <div class="bonus-card-item__actions">
              <button class="bonus-card-item__copy-btn" data-code="WELCOME100">WELCOME100</button>
              <button class="bonus-card-item__activate-btn" data-amount="600" data-i18n="activateBtn">Активировать</button>
            </div>
          </div>

          <div class="bonus-card-item bonus-card-item--reload reload-bonus">
            <div class="bonus-card-item__top">
              <span class="bonus-card-item__tag">WEEKLY RELOAD</span>
              <span class="bonus-card-item__amount-badge">+$300 Demo Coins</span>
            </div>
            <h4 class="bonus-card-item__title">Friday Reload 50% Match</h4>
            <p class="bonus-card-item__desc" data-i18n="bonus2Desc">Пятничный буст баланса для активных игроков.</p>
            <div class="bonus-card-item__actions">
              <button class="bonus-card-item__copy-btn" data-code="FRIDAY50">FRIDAY50</button>
              <button class="bonus-card-item__activate-btn" data-amount="300" data-i18n="activateBtn">Активировать</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Help & Support Ticket Center Modal -->
    <div id="support-modal" class="modal-backdrop modal-backdrop--support">
      <div class="modal-card support-modal-card">
        <div class="support-modal-card__header">
          <div class="support-modal-card__title-group">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="support-modal-card__header-icon"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
            <div class="support-modal-card__title-texts">
              <h3 class="support-modal-card__title" data-i18n="supportTitle">Центр поддержки SpinPulse</h3>
              <span class="support-modal-card__online-status" data-i18n="supportOnlineStatus">● Центр помощи активен</span>
            </div>
          </div>
          <button id="close-support-btn" class="support-modal-card__close-btn" aria-label="Close">✕</button>
        </div>

        <div class="support-modal-card__body">
          <div class="support-faq-section">
            <div class="support-faq-section__label" data-i18n="supportFaqLabel">Частые вопросы:</div>
            <div class="support-faq-section__chips">
              <div class="support-faq-section__item">
                <button type="button" class="support-faq-section__btn" data-faq-target="faq-ans-1">
                  <span data-i18n="promptHowToTopup">Как пополнить баланс?</span>
                  <span class="support-faq-section__arrow">▼</span>
                </button>
                <div id="faq-ans-1" class="support-faq-section__ans" data-i18n="supportReplyTopup" style="display:none;">
                  Для пополнения демо-баланса нажмите кнопку «Депозит» в шапке сайта (+$500) или заберите ежедневный бонус +$250!
                </div>
              </div>
              <div class="support-faq-section__item">
                <button type="button" class="support-faq-section__btn" data-faq-target="faq-ans-2">
                  <span data-i18n="promptWhereVip">VIP клуб и бонусы</span>
                  <span class="support-faq-section__arrow">▼</span>
                </button>
                <div id="faq-ans-2" class="support-faq-section__ans" data-i18n="supportReplyVip" style="display:none;">
                  Бонусы и промокоды доступны через кнопку в шапке (VIP аватар), а также в боковом меню! Активируйте эксклюзивные коды на демо-монеты прямо сейчас.
                </div>
              </div>
              <div class="support-faq-section__item">
                <button type="button" class="support-faq-section__btn" data-faq-target="faq-ans-3">
                  <span data-i18n="promptTournaments">Турниры и таблица лидеров</span>
                  <span class="support-faq-section__arrow">▼</span>
                </button>
                <div id="faq-ans-3" class="support-faq-section__ans" data-i18n="supportReplyTournaments" style="display:none;">
                  Очки в турнире начисляются автоматически при выигрышных спинах в любых слотах! Чем выше множитель выигрыша, тем больше баллов вы получаете в таблице лидеров.
                </div>
              </div>
            </div>
          </div>

          <div id="support-ticket-form-wrap" class="support-ticket-form-wrap">
            <div class="support-ticket-form-wrap__label" data-i18n="supportTicketFormLabel">Отправить обращение в поддержку:</div>
            <form id="support-ticket-form" class="support-ticket-form">
              <div class="support-ticket-form__field-group">
                <label class="support-ticket-form__field-label" data-i18n="supportTopicLabel">Тема обращения:</label>
                <select id="support-ticket-category" class="support-ticket-form__select" required>
                  <option value="tech" data-i18n="supportTopicTech">Технический вопрос / Запуск слота</option>
                  <option value="bonus" data-i18n="supportTopicBonus">Бонусы и промокоды</option>
                  <option value="wallet" data-i18n="supportTopicWallet">Демо-баланс и статистика</option>
                  <option value="feedback" data-i18n="supportTopicFeedback">Предложение по улучшению</option>
                </select>
              </div>

              <div class="support-ticket-form__field-group">
                <label class="support-ticket-form__field-label" data-i18n="supportEmailLabel">Ваш контактный Email:</label>
                <input 
                  type="email" 
                  id="support-ticket-email" 
                  class="support-ticket-form__input" 
                  placeholder="player@spinpulse.io" 
                  required
                />
              </div>

              <div class="support-ticket-form__field-group">
                <label class="support-ticket-form__field-label" data-i18n="supportMessageLabel">Сообщение:</label>
                <textarea 
                  id="support-ticket-message" 
                  class="support-ticket-form__textarea" 
                  rows="3" 
                  placeholder="Опишите ваш вопрос или возникшую сложность..." 
                  data-i18n-placeholder="supportTextareaPlaceholder"
                  required
                ></textarea>
              </div>

              <button type="submit" id="support-submit-btn" class="support-ticket-form__submit-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
                <span data-i18n="supportSubmitBtn">Отправить обращение</span>
              </button>
            </form>
          </div>

          <div id="support-ticket-success" class="support-ticket-success" style="display: none;">
            <div class="support-ticket-success__badge">✓</div>
            <h4 class="support-ticket-success__title" data-i18n="supportSuccessTitle">Обращение зарегистрировано</h4>
            <div class="support-ticket-success__pill">TICKET #<span id="support-ticket-number">SP-948201</span></div>
            <p class="support-ticket-success__desc" data-i18n="supportSuccessDesc">
              Ваш запрос передан дежурному специалисту. Ответ будет направлен на указанный email в течение 10–15 минут.
            </p>
            <button type="button" id="support-new-ticket-btn" class="support-ticket-success__new-btn" data-i18n="supportNewTicketBtn">
              Создать ещё обращение
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Plays Drawer -->
    <div id="history-drawer" class="drawer-backdrop drawer-backdrop--history">
      <div class="drawer-card">
        <div class="drawer-card__header">
          <div class="drawer-card__title-group">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="drawer-card__icon"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <h3 class="drawer-card__title" data-i18n="historyTitle">История спинов сессии</h3>
          </div>
          <button id="close-history-btn" class="drawer-card__close-btn" aria-label="Close">✕</button>
        </div>
        <div class="drawer-card__body">
          <div class="drawer-card__summary-box">
            <div class="drawer-card__summary-item">
              <span class="drawer-card__stat-label" data-i18n="historyTotalBets">Сумма ставок</span>
              <div id="history-total-bets" class="drawer-card__stat-val">$0.00</div>
            </div>
            <div class="drawer-card__summary-item">
              <span class="drawer-card__stat-label" data-i18n="historySessionResult">Результат сессии</span>
              <div id="history-session-result" class="drawer-card__stat-val">+$0.00</div>
            </div>
          </div>
          <div id="history-rounds-list" class="drawer-card__rounds-list"></div>
          <div id="history-empty-note" class="drawer-card__empty-note" style="display: none;">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="drawer-card__empty-icon" style="margin:0 auto 12px;"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
            <h4 class="drawer-card__empty-title">Нет ставок в текущей сессии</h4>
            <p class="drawer-card__empty-desc">Запускайте любые демо-слоты из каталога — каждый раунд и выигрыш сразу фиксируются здесь.</p>
            <button type="button" id="history-spin-now-btn" class="drawer-card__spin-btn">Перейти к играм</button>
          </div>
        </div>
        <div class="drawer-card__footer">
          <div class="drawer-card__footer-stats">
            <span class="drawer-card__stat-item">Раундов: <strong id="history-total-count">0</strong></span>
            <span class="drawer-card__stat-item">Макс: <strong id="history-max-win" class="val-profit">$0.00</strong></span>
          </div>
          <button id="clear-history-btn" type="button" class="drawer-card__clear-btn" title="Очистить историю ставок">
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
        <div class="game-modal-card__header">
          <div class="game-modal-card__info">
            <div class="game-modal-card__badge-row">
              <span class="game-modal-card__live-badge">
                <span class="game-modal-card__pulse-dot"></span>
                <span data-i18n="gmPlayLive">LIVE DEMO</span>
              </span>
            </div>
            <h3 id="gm-title" class="game-modal-card__title">Gates of Olympus 1000</h3>
          </div>
          <div class="game-modal-card__actions">
            <button id="gm-fullscreen-btn" class="game-modal-card__btn" type="button" title="Fullscreen" aria-label="Fullscreen">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
            </button>
            <a id="gm-external-btn" class="game-modal-card__btn" href="#" target="_blank" rel="noopener noreferrer" title="Open in new window" aria-label="Open in new window">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
            <button id="gm-close-btn" class="game-modal-card__btn game-modal-card__btn--close" type="button" title="Close Game" aria-label="Close">
              ✕
            </button>
          </div>
        </div>

        <div class="game-modal-card__frame-wrapper" id="gm-frame-wrapper">
          <div id="gm-loader" class="game-modal-card__loader">
            <div class="game-modal-card__spinner"></div>
            <span class="game-modal-card__loader-text" data-i18n="gmConnecting">Запуск слота...</span>
            <span class="game-modal-card__loader-sub" data-i18n="gmLoadingEngine">Подключение официального демо-сервера...</span>
          </div>
          <iframe 
            id="gm-iframe" 
            class="game-modal-card__iframe" 
            src="about:blank" 
            allow="autoplay; fullscreen; screen-wake-lock; encrypted-media" 
            allowfullscreen 
            referrerpolicy="no-referrer-when-downgrade" 
            title="Slot Game Player"
          ></iframe>
        </div>

        <div class="game-modal-card__footer">
          <div class="game-modal-card__tip">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="game-modal-card__tip-icon"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            <span data-i18n="gmDemoDisclaimer">Бесплатный демо-режим слота от официального сервера провайдера. Ставки виртуальные.</span>
          </div>
          <button type="button" class="game-modal-card__reload-btn" id="gm-reload-btn">
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
  import('../styles/modal.css');
  let root = document.getElementById('modals-root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'modals-root';
    document.body.appendChild(root);
  }
  root.innerHTML = createModalsMarkup();
}
