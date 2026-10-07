# SpinPulse VIP — Luxury iGaming & Casino Lobby Simulator

A visually rich, high-performance iGaming casino lobby simulator built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and native **Web Audio API** sound synthesis. Featuring authentic game cover artwork, a live ticking progressive jackpot, real-time live winners feed, and a fully functional 5-reel demo slot machine modal.

Live Demo: [https://Lelyaler.github.io/SpinPulse/](https://Lelyaler.github.io/SpinPulse/)

---

## 🎰 Key Features & Highlights

* **Warm Champagne & Amber Gold Luxury Aesthetic:**
  * Clean, bright palette crafted with warm amber accents (`#d97706` / `#f59e0b`), royal ruby badges, and glassmorphism cards.
  * Completely avoids generic dark themes, delivering an exclusive VIP casino lounge experience.
  * Rich, high-definition cover artwork across all game titles (Slots, Live Roulette, VIP Blackjack, Space Crash, Mega Wheel, Baccarat).

* **Interactive 5-Reel Demo Slot Machine (`SlotGameModal`):**
  * Staggered mechanical reel stops with realistic deceleration delays.
  * Real-time payline evaluation across 3 rows and 5 reels.
  * Dynamic sound synthesis via native Web Audio API (reel spins, mechanical thuds, coin cascade wins, jackpot fanfares).
  * Canvas Confetti particle explosions on big wins (15x+ multipliers).
  * Customizable bet sizes ($10, $25, $50, $100) and automated bankroll tracking.

* **Live Progressive Jackpot Engine:**
  * Real-time ticking global progressive jackpot counter with micro-increments simulating high-stakes network play.
  * Studio partner integration showcasing Pragmatic Play, Evolution, NetEnt, Hacksaw Gaming, Play'n GO, and NoLimit City.

* **Real-Time Live Drops & Winners Ticker:**
  * Live feed with dynamic streaming drops every few seconds showing player avatars, winning game titles, and payout multipliers.

* **Lobby Filtering & Search:**
  * Instant category navigation: All Games, Video Slots, Live Casino, Crash Games, Table Games, Jackpots.
  * Filter by certified game provider or search by game title in real time.

* **Demo Bankroll & Session History:**
  * Initial $2,500 demo coins with localStorage persistence.
  * Instant +$500 reload button and daily +$250 lucky claim bonus.
  * Slide-over session history drawer tracking wagered sums, payouts, net PnL, and timestamps.

---

## 🛠 Tech Stack

* **Frontend:** React 19, TypeScript, Vite 6
* **Styling:** Tailwind CSS v4, Plus Jakarta Sans, JetBrains Mono
* **Icons:** Lucide React
* **Visual FX:** canvas-confetti
* **Audio:** Browser Web Audio API (synthesizer oscillators, noise generators, envelope shaping)
* **Storage:** LocalStorage Persistence
* **Deployment:** GitHub Pages (`gh-pages`)

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* npm or pnpm

### Installation

```bash
git clone https://github.com/Lelyaler/SpinPulse.git
cd SpinPulse
npm install
```

### Local Development

```bash
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Production Build

```bash
npm run build
```

---

## 📄 License

MIT License. Designed and engineered for demo and portfolio purposes.
