// Web Audio API Synthesizer for Casino & Slots FX

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
}

export function isSoundEnabled() {
  return soundEnabled;
}

export function playButtonClick() {
  if (!soundEnabled) return;
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(1200, now);
  osc.frequency.exponentialRampToValueAtTime(320, now + 0.025);

  gain.gain.setValueAtTime(0.045, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.025);
}

export function playReelSpinSound() {
  if (!soundEnabled) return;
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // Reel spin ticking
  for (let i = 0; i < 8; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(280 + i * 20, now + i * 0.07);

    gain.gain.setValueAtTime(0.06, now + i * 0.07);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + i * 0.07);
    osc.stop(now + i * 0.07 + 0.03);
  }
}

export function playReelStopSound(pitchMod: number = 1) {
  if (!soundEnabled) return;
  const ctx = getContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(320 * pitchMod, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(120 * pitchMod, ctx.currentTime + 0.08);

  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.08);
}

export function playWinCoinsSound() {
  if (!soundEnabled) return;
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // Cascading golden coin chimes
  const notes = [659.25, 783.99, 987.77, 1318.51, 1567.98];
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + i * 0.08);

    gain.gain.setValueAtTime(0, now + i * 0.08);
    gain.gain.linearRampToValueAtTime(0.12, now + i * 0.08 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + i * 0.08);
    osc.stop(now + i * 0.08 + 0.3);
  });
}

export function playBigJackpotFanfare() {
  if (!soundEnabled) return;
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const chords = [
    [523.25, 659.25, 783.99],       // C Major
    [587.33, 739.99, 880.00],       // D Major
    [659.25, 830.61, 987.77],       // E Major
    [1046.50, 1318.51, 1567.98]     // High C Major Fanfare
  ];

  chords.forEach((chord, step) => {
    chord.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + step * 0.16);

      gain.gain.setValueAtTime(0, now + step * 0.16);
      gain.gain.linearRampToValueAtTime(0.14, now + step * 0.16 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + step * 0.16 + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + step * 0.16);
      osc.stop(now + step * 0.16 + 0.5);
    });
  });
}

export function playCrashBoomSound() {
  if (!soundEnabled) return;
  const ctx = getContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.35);

  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.35);
}
