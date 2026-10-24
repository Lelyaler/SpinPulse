import { playReelSpinSound, playWinCoinsSound, playBigJackpotFanfare } from '../audio.js';
import { launchConfetti } from './ui.js';

export const wheelPrizes = [
  { label: '+$100', val: 100, color: '#f59e0b' },
  { label: '+$500', val: 500, color: '#e11d48' },
  { label: '+$250', val: 250, color: '#3b82f6' },
  { label: '+$1,000', val: 1000, color: '#10b981' },
  { label: '+$50', val: 50, color: '#8b5cf6' },
  { label: '+$750', val: 750, color: '#ec4899' },
  { label: '+$200', val: 200, color: '#06b6d4' },
  { label: 'JACKPOT', val: 2500, color: '#f97316' }
];

let wheelRotation = 0;
let isWheelSpinning = false;

export function drawWheel(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  canvas.width = 260 * dpr;
  canvas.height = 260 * dpr;
  ctx.scale(dpr, dpr);

  const cx = 130;
  const cy = 130;
  const radius = 120;
  const numSegments = wheelPrizes.length;
  const anglePerSegment = (2 * Math.PI) / numSegments;

  ctx.clearRect(0, 0, 260, 260);

  wheelPrizes.forEach((prize, i) => {
    const startAngle = i * anglePerSegment;
    const endAngle = startAngle + anglePerSegment;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = prize.color;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    // Segment label
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(startAngle + anglePerSegment / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(prize.label, radius - 15, 4);
    ctx.restore();
  });

  // Center hub & crown
  ctx.beginPath();
  ctx.arc(cx, cy, 22, 0, 2 * Math.PI);
  ctx.fillStyle = '#0f172a';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#fbbf24';
  ctx.stroke();

  ctx.font = 'bold 14px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fbbf24';
  ctx.fillText('👑', cx, cy + 5);
}

export function spinWheel({ canvas, spinBtn, wonText, state, saveState, onBalanceUpdate }) {
  if (isWheelSpinning) return;
  isWheelSpinning = true;
  playReelSpinSound();

  const targetIdx = Math.floor(Math.random() * wheelPrizes.length);
  const segmentAngle = 360 / wheelPrizes.length;
  const extraSpins = 360 * 5;
  const targetAngle = extraSpins + (wheelPrizes.length - targetIdx) * segmentAngle - segmentAngle / 2;

  wheelRotation += targetAngle;
  if (canvas) {
    canvas.style.transform = `rotate(${wheelRotation}deg)`;
  }

  if (spinBtn) spinBtn.disabled = true;

  setTimeout(() => {
    isWheelSpinning = false;
    const prize = wheelPrizes[targetIdx];
    state.balance = Math.round((state.balance + prize.val) * 100) / 100;
    if (saveState) saveState();
    if (onBalanceUpdate) onBalanceUpdate();
    playWinCoinsSound();

    if (prize.val >= 1000) {
      playBigJackpotFanfare();
      launchConfetti();
    }

    if (wonText) {
      wonText.textContent = state.lang === 'RU' 
        ? `🎉 Вы выиграли: ${prize.label} Demo монет!` 
        : `🎉 You won: ${prize.label} Demo coins!`;
      wonText.style.display = 'block';
    }

    if (spinBtn) spinBtn.disabled = false;
  }, 4000);
}
