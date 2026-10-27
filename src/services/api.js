import { gamesCatalog, currentTournament, initialWinners } from '../data.js';

/**
 * API service for fetching catalog data and sending support tickets.
 */

const BASE_URL = (import.meta.env.BASE_URL || './').endsWith('/')
  ? import.meta.env.BASE_URL || './'
  : `${import.meta.env.BASE_URL || './'}/`;

/**
 * Simulates brief realistic network delay to showcase skeleton loaders.
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetches the games catalog from the JSON API endpoint.
 * Returns an array of game objects.
 */
export async function fetchGamesCatalog() {
  try {
    const res = await fetch(`${BASE_URL}data/games.json`);
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    const games = await res.json();
    // Brief network latency to display skeleton loaders
    await delay(320);
    return games;
  } catch (err) {
    console.warn('[API] Could not fetch remote games.json, falling back to local dataset:', err);
    return gamesCatalog;
  }
}

/**
 * Fetches the active tournament metadata and leaderboard.
 */
export async function fetchTournamentData() {
  try {
    const res = await fetch(`${BASE_URL}data/tournament.json`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[API] Could not fetch tournament.json, falling back to local dataset:', err);
    return currentTournament;
  }
}

/**
 * Fetches recent live winners.
 */
export async function fetchRecentWinners() {
  try {
    const res = await fetch(`${BASE_URL}data/winners.json`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[API] Could not fetch winners.json, falling back to local dataset:', err);
    return initialWinners;
  }
}

/**
 * Submits a customer support ticket to the server.
 * Returns a response with ticket reference ID and timestamp.
 */
export async function submitSupportTicket(ticketData) {
  const ticketId = 'SP-' + Math.floor(100000 + Math.random() * 900000);
  const payload = {
    ticketId,
    email: ticketData.email,
    category: ticketData.category,
    message: ticketData.message,
    timestamp: new Date().toISOString(),
    status: 'received'
  };

  try {
    // Attempt actual POST request to mock endpoint
    await fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).catch(() => {
      // Gracefully handle offline or network blockage
    });
  } catch {}

  // Save ticket to local history for persistent tracking
  try {
    const existing = JSON.parse(localStorage.getItem('spinpulse_user_tickets') || '[]');
    existing.unshift({
      ...payload,
      formattedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    localStorage.setItem('spinpulse_user_tickets', JSON.stringify(existing.slice(0, 10)));
  } catch (e) {
    console.warn('[API] Unable to persist ticket history:', e);
  }

  // Brief latency for realistic submission feel
  await delay(450);

  return {
    success: true,
    ticketId,
    timestamp: payload.timestamp
  };
}
