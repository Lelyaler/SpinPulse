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
  const dotsContainer = document.getElementById('hero-dots');
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
  const container = document.getElementById('hero-slides-wrap');
  if (!container) return;
  const slideEls = container.querySelectorAll('.hero-carousel__slide, .hero-slide');
  slideEls.forEach((slideEl, idx) => {
    const isActive = idx === heroTrackIndex;
    slideEl.classList.toggle('active', isActive);
    slideEl.classList.toggle('hero-carousel__slide--active', isActive);
  });
}

function resetTrackPositionInstant() {
  const container = document.getElementById('hero-slides-wrap');
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
  const container = document.getElementById('hero-slides-wrap');
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
  const container = document.getElementById('hero-slides-wrap');
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
  const container = document.getElementById('hero-slides-wrap');
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

export function initHeroCarousel(lang = 'RU', onOpenModal) {
  const container = document.getElementById('hero-slides-wrap');
  if (!container) return;

  const isRu = lang === 'RU';
  const trackSlides = [slides[slides.length - 1], ...slides, slides[0]];
  container.innerHTML = trackSlides.map((slide, trackIdx) => {
    const origIdx = trackIdx === 0 ? slides.length - 1 : (trackIdx === trackSlides.length - 1 ? 0 : trackIdx - 1);
    const isFirstVisible = trackIdx === 1;
    return `
      <div class="hero-carousel__slide ${isFirstVisible ? 'hero-carousel__slide--active active' : ''}" data-track-idx="${trackIdx}" data-orig-idx="${origIdx}">
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

  container.querySelectorAll('.hero-carousel__cta-btn, .hero-bonus-trigger').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (typeof onOpenModal === 'function') {
        onOpenModal('bonuses-modal');
      }
    });
  });

  const dotsContainer = document.getElementById('hero-dots');
  if (dotsContainer) {
    dotsContainer.innerHTML = slides.map((_, i) => `
      <button type="button" class="hero-carousel__dot ${i === 0 ? 'hero-carousel__dot--active active' : ''}" data-slide="${i}" aria-label="Слайд ${i + 1}"></button>
    `).join('');

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

  const prevSlideBtn = document.getElementById('hero-prev-btn');
  const nextSlideBtn = document.getElementById('hero-next-btn');

  if (prevSlideBtn && !prevSlideBtn.dataset.bound) {
    prevSlideBtn.dataset.bound = 'true';
    prevSlideBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevHeroSlide();
      resetHeroTimer();
    });
  }
  if (nextSlideBtn && !nextSlideBtn.dataset.bound) {
    nextSlideBtn.dataset.bound = 'true';
    nextSlideBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextHeroSlide();
      resetHeroTimer();
    });
  }

  const heroSection = document.querySelector('.hero-carousel, .hero-carousel-section');
  if (heroSection && !heroSection.dataset.bound) {
    heroSection.dataset.bound = 'true';
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

  updateHeroDots(0);
  startHeroTimer();
}

export function updateHeroTexts(lang = 'RU') {
  const isRu = lang === 'RU';
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
