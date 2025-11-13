import '@testing-library/jest-dom';

// Mock fetch globally
global.fetch = jest.fn();

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
});