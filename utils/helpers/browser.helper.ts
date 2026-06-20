import {
  Browser,
  BrowserContext,
  Page,
  chromium,
  firefox,
  webkit,
} from 'playwright';
import { Logger } from '../logger/winston.logger';
import { envConfig } from '../../config/environment.config';

type BrowserName = 'chromium' | 'firefox' | 'webkit';

/**
 * Static factory helpers for browser, context and page creation.
 * Centralises all launch options so they never need to be duplicated
 * across hooks and fixtures.
 */
export class BrowserHelper {
  private static readonly logger = Logger.getInstance();

  /** Launch a new browser instance */
  static async launchBrowser(browserName?: BrowserName): Promise<Browser> {
    const name = (browserName ?? envConfig.BROWSER) as BrowserName;

    const launchers: Record<BrowserName, typeof chromium> = {
      chromium,
      firefox,
      webkit,
    };

    const launcher = launchers[name] ?? chromium;

    this.logger.info(`Launching browser: ${name} | headless=${String(envConfig.HEADLESS)}`);

    return await launcher.launch({
      headless: envConfig.HEADLESS,
      slowMo:   envConfig.SLOW_MO,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-extensions',
      ],
    });
  }

  /** Create a new browser context with optional video recording */
  static async createContext(
    browser: Browser,
    recordVideo = envConfig.RECORD_VIDEO
  ): Promise<BrowserContext> {
    const context = await browser.newContext({
      viewport:           { width: 1280, height: 720 },
      ignoreHTTPSErrors:  true,
      ...(recordVideo && {
        recordVideo: {
          dir:  'reports/videos',
          size: { width: 1280, height: 720 },
        },
      }),
    });

    this.logger.debug('Browser context created');
    return context;
  }

  /** Create a new page with default timeouts from envConfig */
  static async newPage(context: BrowserContext): Promise<Page> {
    const page = await context.newPage();
    page.setDefaultTimeout(envConfig.TIMEOUT);
    page.setDefaultNavigationTimeout(envConfig.TIMEOUT * 2);
    this.logger.debug('New page created');
    return page;
  }

  /** Start Playwright tracing on a context */
  static async startTracing(context: BrowserContext): Promise<void> {
    await context.tracing.start({
      screenshots: true,
      snapshots:   true,
      sources:     true,
    });
    this.logger.debug('Tracing started');
  }

  /** Stop tracing and save the trace archive */
  static async stopTracing(context: BrowserContext, tracePath: string): Promise<void> {
    await context.tracing.stop({ path: tracePath });
    this.logger.info(`Trace saved → ${tracePath}`);
  }

  /** Gracefully close a browser instance */
  static async closeBrowser(browser: Browser): Promise<void> {
    await browser.close();
    this.logger.info('Browser closed');
  }
}