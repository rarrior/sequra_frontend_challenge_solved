import '@testing-library/jest-dom';
import i18n from '../src/i18n/config';

// Mock fetch globally
global.fetch = jest.fn();

// Helper to change language in tests
export const setTestLanguage = async (language: string) => {
  await i18n.changeLanguage(language);
};

// Add custom matchers or global test setup here
beforeAll(() => {
  // Global setup
});

afterAll(() => {
  // Global cleanup
});

beforeEach(() => {
  // Reset mocks before each test
  jest.clearAllMocks();
  // Reset to Spanish (default language) before each test
  i18n.changeLanguage('es');
});