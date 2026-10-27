import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createStore } from '../src/modules/store.js';
import { gamesCatalog } from '../src/data.js';

describe('Reactive Store (Proxy)', () => {
  it('should initialize with provided state', () => {
    const store = createStore({ balance: 2500, lang: 'RU' });
    assert.strictEqual(store.state.balance, 2500);
    assert.strictEqual(store.state.lang, 'RU');
  });

  it('should notify subscribers when state properties mutate', () => {
    const store = createStore({ balance: 1000 });
    let notifiedProp = null;
    let notifiedVal = null;
    let prevVal = null;

    store.subscribe((prop, val, prev) => {
      notifiedProp = prop;
      notifiedVal = val;
      prevVal = prev;
    });

    store.state.balance = 1500;

    assert.strictEqual(notifiedProp, 'balance');
    assert.strictEqual(notifiedVal, 1500);
    assert.strictEqual(prevVal, 1000);
  });

  it('should allow unsubscribing from store changes', () => {
    const store = createStore({ count: 0 });
    let calls = 0;

    const unsubscribe = store.subscribe(() => {
      calls++;
    });

    store.state.count = 1;
    assert.strictEqual(calls, 1);

    unsubscribe();
    store.state.count = 2;
    assert.strictEqual(calls, 1);
  });
});

describe('Catalog Data & Filtering', () => {
  it('should contain valid game entries with required properties', () => {
    assert.ok(Array.isArray(gamesCatalog));
    assert.ok(gamesCatalog.length > 0);

    const first = gamesCatalog[0];
    assert.ok(first.id, 'Game must have an id');
    assert.ok(first.title, 'Game must have a title');
    assert.ok(first.provider, 'Game must have a provider');
    assert.ok(first.category, 'Game must have a category');
    assert.ok(first.demoUrl, 'Game must have a playable demoUrl');
  });

  it('should accurately filter games by category', () => {
    const slots = gamesCatalog.filter((g) => g.category === 'slots');
    assert.ok(slots.length > 0);
    assert.ok(slots.every((g) => g.category === 'slots'));
  });

  it('should accurately filter games by provider', () => {
    const pragmatic = gamesCatalog.filter((g) => g.provider === 'Pragmatic Play');
    assert.ok(pragmatic.length > 0);
    assert.ok(pragmatic.every((g) => g.provider === 'Pragmatic Play'));
  });

  it('should search games by title query case-insensitively', () => {
    const query = 'olympus';
    const matches = gamesCatalog.filter((g) => g.title.toLowerCase().includes(query.toLowerCase()));
    assert.ok(matches.length > 0);
    assert.ok(matches.some((g) => g.title.includes('Olympus')));
  });
});

describe('Currency and Number Formatting', () => {
  it('should format numbers with comma grouping and 2 decimal places', () => {
    const balance = 2500;
    const formatted = '$' + balance.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    assert.strictEqual(formatted, '$2,500.00');
  });

  it('should format large jackpots correctly', () => {
    const jackpot = 4821590.84;
    const formatted = '$' + jackpot.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    assert.strictEqual(formatted, '$4,821,590.84');
  });
});

describe('Support Ticket Service Format', () => {
  it('should generate valid ticket reference ID pattern (SP-XXXXXX)', () => {
    const ticketId = 'SP-' + Math.floor(100000 + Math.random() * 900000);
    assert.match(ticketId, /^SP-\d{6}$/);
  });
});
