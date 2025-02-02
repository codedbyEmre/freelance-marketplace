import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  useSearchParams() {
    return {
      get: jest.fn(),
    };
  },
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  key: jest.fn(),
  length: 0,
} as unknown as Storage;

global.localStorage = localStorageMock;

// Add TextEncoder/TextDecoder to global
global.TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

// Disable the no-explicit-any rule for this specific case
// eslint-disable-next-line @typescript-eslint/no-explicit-any
