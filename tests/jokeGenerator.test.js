/**
 * LES NOIRES - Joke Generator Tests
 * 
 * Tests unitaires pour le générateur de blagues
 */

const JokeGenerator = require('../src/utils/jokeGenerator');

describe('JokeGenerator Tests', () => {
  
  test('getRandomJoke should return a joke with success flag', async () => {
    const result = await JokeGenerator.getRandomJoke();
    expect(result).toHaveProperty('success');
    expect(result).toHaveProperty('joke');
  });

  test('getProgrammingJoke should return a programming joke', async () => {
    const result = await JokeGenerator.getProgrammingJoke();
    expect(result.raw.category).toBe('Programming');
  });

  test('getScienceJoke should return a science joke', async () => {
    const result = await JokeGenerator.getScienceJoke();
    expect(result.raw.category).toBe('Science');
  });

  test('getMathJoke should return a math joke', async () => {
    const result = await JokeGenerator.getMathJoke();
    expect(result.raw.category).toBe('Math');
  });

  test('getKnockKnockJoke should return a knock-knock joke', async () => {
    const result = await JokeGenerator.getKnockKnockJoke();
    expect(result.raw.category).toBe('Knock-Knock');
    expect(result.raw.type).toBe('twopart');
  });

  test('getAvailableCategories should return an array of categories', () => {
    const categories = JokeGenerator.getAvailableCategories();
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
    expect(categories).toContain('Programming');
  });

  test('getBlacklistFlags should return an array of flags', () => {
    const flags = JokeGenerator.getBlacklistFlags();
    expect(Array.isArray(flags)).toBe(true);
    expect(flags.length).toBeGreaterThan(0);
    expect(flags).toContain('nsfw');
  });

  test('formatJoke should format single joke correctly', () => {
    const singleJoke = { type: 'single', joke: 'Test joke' };
    const formatted = JokeGenerator.formatJoke(singleJoke);
    expect(formatted).toBe('Test joke');
  });

  test('formatJoke should format two-part joke correctly', () => {
    const twoPartJoke = {
      type: 'twopart',
      setup: 'Setup text',
      delivery: 'Delivery text'
    };
    const formatted = JokeGenerator.formatJoke(twoPartJoke);
    expect(formatted).toContain('Setup:');
    expect(formatted).toContain('Delivery:');
  });
});
