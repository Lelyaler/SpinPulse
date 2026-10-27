import { playWinCoinsSound } from '../audio.js';

/**
 * Initializes tournament widget and timer.
 */
export function initTournament(state, saveState) {
  const joinTournamentBtn = document.getElementById('btn-join-tournament');
  const participantsCountEl = document.getElementById('tournament-participants-count');
  const timerEl = document.getElementById('tournament-timer');

  if (joinTournamentBtn) {
    if (state.tournamentJoined) {
      joinTournamentBtn.textContent = state.lang === 'RU' ? '✓ ВЫ УЧАСТВУЕТЕ' : '✓ REGISTERED';
      joinTournamentBtn.style.background = '#10b981';
      joinTournamentBtn.style.color = '#ffffff';
    }

    joinTournamentBtn.addEventListener('click', () => {
      if (!state.tournamentJoined) {
        playWinCoinsSound();
        state.tournamentJoined = true;
        state.tournamentParticipants = (state.tournamentParticipants || 1420) + 1;
        if (saveState) saveState();

        joinTournamentBtn.textContent = state.lang === 'RU' ? '✓ ВЫ УЧАСТВУЕТЕ' : '✓ REGISTERED';
        joinTournamentBtn.style.background = '#10b981';
        joinTournamentBtn.style.color = '#ffffff';

        if (participantsCountEl) {
          participantsCountEl.textContent = `${state.tournamentParticipants.toLocaleString()} ${state.lang === 'RU' ? 'игроков' : 'players'}`;
        }
      }
    });
  }

  // Tournament countdown timer
  if (timerEl) {
    let remainingSeconds = 48 * 3600 + 14 * 60 + 25; // 48h 14m 25s
    const updateDisplay = () => {
      const h = Math.floor(remainingSeconds / 3600);
      const m = Math.floor((remainingSeconds % 3600) / 60);
      const s = remainingSeconds % 60;
      const pad = (n) => String(n).padStart(2, '0');
      timerEl.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
    };

    updateDisplay();
    setInterval(() => {
      if (remainingSeconds > 0) {
        remainingSeconds--;
        updateDisplay();
      }
    }, 1000);
  }
}
