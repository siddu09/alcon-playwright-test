/** Supported target environments */
export type Environment = 'dev' | 'qa' | 'prod';

/** Supported Playwright browser engines */
export type BrowserType = 'chromium' | 'firefox' | 'webkit';

/** Full shape of the resolved environment configuration */
export interface IEnvironmentConfig {
  ENV:              Environment;
  BASE_URL:         string;
  API_URL?:         string;
  TEST_USERNAME?:   string;
  TEST_PASSWORD?:   string;
  HEADLESS:         boolean;
  BROWSER:          BrowserType;
  TIMEOUT:          number;
  PARALLEL_WORKERS: number;
  LOG_LEVEL?:       string;
  SLOW_MO:          number;
  RECORD_VIDEO:     boolean;
  RECORD_TRACE:     boolean;
}