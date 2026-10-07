# SpinPulse VIP — Luxury iGaming & Casino Lobby Simulator

[![Deploy to GitHub Pages](https://github.com/Lelyaler/SpinPulse/actions/workflows/deploy.yml/badge.svg)](https://github.com/Lelyaler/SpinPulse/actions/workflows/deploy.yml)
[![Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-success?style=flat&logo=github)](https://lelyaler.github.io/SpinPulse/)
[![React](https://img.shields.io/badge/React-19.0-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**SpinPulse VIP** — высокопроизводительный симулятор премиального лобби онлайн-казино и iGaming платформы. Интерфейс выполнен в роскошной тёплой эстетике шампанского и янтаря (Champagne Gold), снабжён интерактивным Колесом Фортуны (Lucky Wheel), живым счётчиком джекпота, бегущей строкой выигрышей в реальном времени, синтезом звуковых эффектов через Web Audio API и поддержкой переключения языков (RU / EN).

### 🌐 Онлайн Демо (Браузерная версия)
Прямая ссылка для запуска в браузере:  
👉 **[https://lelyaler.github.io/SpinPulse/](https://lelyaler.github.io/SpinPulse/)**

---

## ✨ Основные возможности (Features)

* **💎 Эксклюзивный VIP-дизайн (Champagne & Amber Gold):**
  * Тёплая премиальная палитра с янтарными и золотыми акцентами (`#d97706`, `#f59e0b`), рубиновыми бейджами и эффектом матового стекла (glassmorphism).
  * Высококачественные обложки игр (Слоты, Live-рулетка, Блэкджек, Crash-игры, Колесо Фортуны, Баккара).
  * Плавная адаптивность для мобильных устройств, планшетов и десктопов.

* **🎡 Интерактивное Колесо Фортуны (Lucky Wheel):**
  * Физическое замедление вращения с расчётом сектора выигрыша.
  * Синтезированный тактильный звук трещотки и фанфар выигрыша.
  * Фейерверк конфетти (Canvas Confetti) при выпадении джекпота и крупных множителей.
  * Мгновенное начисление выигрыша на демо-баланс.

* **💰 Прогрессивный джекпот в реальном времени:**
  * Живой тикер глобального прогрессивного джекпота с непрерывными микро-приростами, симулирующими активность тысяч игроков в сети.
  * Интеграция витрин топ-провайдеров: Pragmatic Play, Evolution, NetEnt, Hacksaw Gaming, Play'n GO, Nolimit City.

* **⚡ Лента выигрышей в прямом эфире (Live Drops):**
  * Динамический поток недавних выигрышей с аватарами игроков, названиями слотов и выпавшими множителями (от 12x до 2400x).

* **🔍 Умная навигация, поиск и фильтрация:**
  * Категории: «Все игры», «Слоты», «Live Казино», «Краш-игры», «Настольные», «Джекпоты».
  * Фильтрация по сертифицированным игровым провайдерам.
  * Мгновенный полнотекстовый поиск по каталогу.
  * Избранные игры с сохранением в `localStorage`.

* **💵 Демо-баланс и управление банкроллом:**
  * Стартовый баланс $2,500 demo coins.
  * Моментальное пополнение баланса (+500$) в один клик.
  * Ежедневный бонус (+250$) с таймером и звуковым оповещением.
  * Выдвижная панель истории транзакций и сыгранных раундов.

* **🔊 Процедурный синтезатор звука (Web Audio API):**
  * Полностью нативный звук без внешних mp3-файлов — генерируется браузерными осцилляторами (щелчки кнопок, вращение барабанов/колеса, звон монет, победный джингл).
  * Возможность мгновенного отключения звука одной кнопкой в хедере.

* **🌍 Двуязычный интерфейс (RU / EN):**
  * Быстрый переключатель языка с автоматическим сохранением предпочтений в браузере.

---

## 🛠 Стек технологий (Tech Stack)

| Компонент | Технология |
|---|---|
| **Фреймворк** | React 19 (Hooks, Suspense, Lazy loading) |
| **Язык** | TypeScript 5.7+ |
| **Сборщик** | Vite 6 |
| **Стилизация** | Tailwind CSS v4, Plus Jakarta Sans, JetBrains Mono |
| **Иконки** | Lucide React |
| **Аудиодвижок** | Web Audio API (OscillatorNode, GainNode, BiquadFilter) |
| **Анимации & FX** | CSS Keyframes, Canvas Confetti |
| **Хранение данных** | LocalStorage API |
| **Деплой** | GitHub Pages & GitHub Actions CI/CD |

---

## 📂 Структура проекта

```text
SpinPulse/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Автоматический деплой в GitHub Pages
├── public/
│   ├── covers/                 # Обложки игр в высоком разрешении
│   ├── banners/                # Баннеры для карусели акций
│   └── favicon.svg             # Иконка сайта
├── src/
│   ├── components/             # React-компоненты интерфейса
│   │   ├── Header.tsx          # Шапка с балансом, звуком, языком
│   │   ├── Sidebar.tsx         # Боковое навигационное меню
│   │   ├── HeroCarousel.tsx    # Баннерная карусель промо-акций
│   │   ├── JackpotAndWins.tsx  # Прогрессивный джекпот и лента победителей
│   │   ├── CategoryNav.tsx     # Навигация по категориям и провайдерам
│   │   ├── GameCard.tsx        # Карточка игры со статусами и бейджами
│   │   ├── LuckyWheelModal.tsx # Модальное интерактивное Колесо Фортуны
│   │   ├── BonusesModal.tsx    # Меню бонусов и промокодов
│   │   ├── SupportModal.tsx    # Форма VIP-поддержки
│   │   ├── VipLoyaltyBar.tsx   # Статус лояльности и шкала прогресса
│   │   └── ...
│   ├── data/
│   │   └── gamesCatalog.ts     # Каталог игр, провайдеры и характеристики
│   ├── utils/
│   │   └── casinoAudio.ts      # Web Audio API синтезатор звуков
│   ├── types.ts                # TypeScript интерфейсы и типы
│   ├── App.tsx                 # Главный компонент приложения
│   └── main.tsx                # Точка входа React
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Локальный запуск (Local Development)

### Требования
* Node.js 18+
* npm, pnpm или yarn

### Установка и запуск

1. **Клонируйте репозиторий:**
   ```bash
   git clone https://github.com/Lelyaler/SpinPulse.git
   cd SpinPulse
   ```

2. **Установите зависимости:**
   ```bash
   npm install
   ```

3. **Запустите сервер для разработки:**
   ```bash
   npm run dev
   ```
   Откройте [http://localhost:5173](http://localhost:5173) в браузере.

4. **Сборка для продакшена:**
   ```bash
   npm run build
   ```

5. **Предпросмотр сборки:**
   ```bash
   npm run preview
   ```

---

## 🌐 Деплой на GitHub Pages

Проект настроен на автоматическую публикацию через GitHub Actions при пуше в ветку `main`.

Также доступен ручной деплой с помощью встроенного скрипта:
```bash
npm run deploy
```

---

## 📄 Лицензия

Распространяется под лицензией **MIT**. Подробности в файле `LICENSE`.
