/**
 * Initializes the FAQ accordion behavior.
 */
export function initFaqAccordion() {
  const cards = document.querySelectorAll('.faq-card, .faq-section__card');
  cards.forEach((card) => {
    const trigger = card.querySelector('.faq-card__trigger, .faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = card.classList.contains('open') || card.classList.contains('faq-card--open');
      cards.forEach((c) => {
        c.classList.remove('open', 'faq-card--open');
      });
      if (!isOpen) {
        card.classList.add('open', 'faq-card--open');
      }
    });
  });
}
