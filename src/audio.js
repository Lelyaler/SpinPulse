const SOUND_ENABLED_KEY = 'spinpulse_sound_enabled';

let soundEnabled = true;

try {
  const saved = localStorage.getItem(SOUND_ENABLED_KEY);
  if (saved !== null) {
    soundEnabled = saved === 'true';
  }
} catch {
  // localStorage unavailable
}

const baseUrl = (import.meta.env.BASE_URL || './').replace(/\/$/, '') + '/';

const audioExtension = (typeof Audio !== 'undefined' && new Audio().canPlayType('audio/mpeg')) ? 'mp3' : 'wav';

const audioCache = {};
const POOL_SIZE = 4;

function getAudioFromPool(name) {
  if (typeof window === 'undefined') return null;

  if (!audioCache[name]) {
    audioCache[name] = Array.from({ length: POOL_SIZE }, () => {
      const audio = new Audio(`${baseUrl}sounds/${name}.${audioExtension}`);
      audio.preload = 'auto';
      return audio;
    });
  }

  const pool = audioCache[name];
  const available = pool.find((a) => a.paused || a.ended) || pool[0];

  try {
    available.currentTime = 0;
  } catch {
    // Ignore seek errors
  }

  return available;
}

export function setSoundEnabled(enabled) {
  soundEnabled = enabled;
  try {
    localStorage.setItem(SOUND_ENABLED_KEY, String(enabled));
  } catch {
    // localStorage unavailable
  }
}

export function isSoundEnabled() {
  return soundEnabled;
}

export function playButtonClick() {
  if (!soundEnabled) return;
  const audio = getAudioFromPool('click');
  if (audio) {
    audio.volume = 0.35;
    audio.play().catch(() => {});
  }
}

export function playReelSpinSound() {
  if (!soundEnabled) return;
  const audio = getAudioFromPool('spin');
  if (audio) {
    audio.volume = 0.4;
    audio.play().catch(() => {});
  }
}

export function playWinCoinsSound() {
  if (!soundEnabled) return;
  const audio = getAudioFromPool('win');
  if (audio) {
    audio.volume = 0.45;
    audio.play().catch(() => {});
  }
}

export function playBigJackpotFanfare() {
  if (!soundEnabled) return;
  const audio = getAudioFromPool('jackpot');
  if (audio) {
    audio.volume = 0.6;
    audio.play().catch(() => {});
  }
}
