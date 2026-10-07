# MatchPulse — Live Sports & Esports Betting Dashboard

A high-performance real-time sports and esports betting dashboard with dynamic odds simulation, interactive multi-selection betting slip, wallet balance management, and Web Audio API micro-effects.

Live Demo: [https://Lelyaler.github.io/MatchPulse/](https://Lelyaler.github.io/MatchPulse/)

---

## ⚡ Key Highlights & Features

* **Ice White & Emerald Fintech Design System:**
  * Clean, ultra-crisp light theme inspired by top modern fintech applications.
  * Micro-animations for live odds movement (green flash on odds increase, coral flash on odds drop).
  * Fully responsive 2-column desktop layout with sticky betting slip and mobile slide-over drawer.

* **Dynamic Real-Time Odds Engine:**
  * Autonomous live odds ticker simulating live match fluctuations.
  * Interactive controls to pause/resume the live stream or trigger instant scoring events.
  * Dynamic match timers and score adjustments.

* **Comprehensive Betting Slip (Single & Parlay/Express):**
  * One-click outcome selection and seamless match outcome replacement.
  * Single bets with individualized stakes and Parlay/Express bets with automated odds compounding.
  * Combo Boost bonus (+5% extra payout on accumulators with 3+ selections).
  * Quick stake chips ($10, $25, $50, $100, Max) and wallet balance validation.

* **Interactive Bet Settlement Simulator:**
  * History drawer tracking active (In-Play) and settled (Won/Lost) tickets.
  * "Simulate Match Outcome" button to resolve tickets and automatically credit winnings to the balance.

* **Synthesized Web Audio Effects:**
  * Pure browser Web Audio API audio synthesis for UI interactions, bet placements, and win celebrations without heavy external media assets.
  * Toggleable audio mute controls.

---

## 🛠 Tech Stack

* **Core:** React 19, TypeScript 5, Vite 6
* **Styling:** Tailwind CSS v4, Plus Jakarta Sans, JetBrains Mono
* **Icons:** Lucide React
* **Audio:** Native Web Audio API
* **State & Storage:** React Hooks + LocalStorage Persistence

---

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
```
