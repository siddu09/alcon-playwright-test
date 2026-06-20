/**
 * Centralised timeout constants (milliseconds).
 * Reference these everywhere instead of magic numbers.
 */
export const TIMEOUTS = {
  /** Quick existence check — does NOT wait for visibility */
  SHORT: 5_000,

  /** Standard element visibility / interactability wait */
  ELEMENT: 30_000,

  /** Full page navigation and load */
  NAVIGATION: 60_000,

  /** Playwright expect() assertion timeout */
  ASSERTION: 10_000,

  /** Long-running operations (file upload, large forms, etc.) */
  LONG: 120_000,

  /** API/HTTP response wait */
  API: 15_000,

  /** CSS animation / transition settle */
  ANIMATION: 2_000,

  /** waitForLoadState('networkidle') */
  NETWORK_IDLE: 30_000,
} as const;

export type TimeoutKey = keyof typeof TIMEOUTS;