import { Browser, BrowserContext, Page, chromium } from 'playwright';
import { envConfig } from '../config/environment.config';
import { Logger } from '../utils/logger/winston.logger';

export interface IBaseFixtures {
  browser: Browser;
  context: BrowserContext;
  page:    Page;
}

/**
 * Factory for Playwright browser / context / page instances.
 * Used for standalone setup scripts and utility tasks outside Cucumber hooks.
 *
 * Usage:
 *   const fixtures = await BaseFixture.setup();
 *   // ... use fixtures.page ...
 *   await BaseFixture.teardown(fixtures);
 */
export class BaseFixture {
  private static readonly logger = Logger.getInstance();

  static async setup(): Promise<IBaseFixtures> {
    const browser = await chromium.launch({
      headless: envConfig.HEADLESS,
      slowMo:   envConfig.SLOW_MO,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ],
    });

    const context = await browser.newContext({
      viewport:          { width: 1280, height: 720 },
      ignoreHTTPSErrors: true,
    });

    const page = await context.newPage();
    page.setDefaultTimeout(envConfig.TIMEOUT);
    page.setDefaultNavigationTimeout(envConfig.TIMEOUT * 2);

    this.logger.info('BaseFixture: browser, context and page ready');
    return { browser, context, page };
  }

  static async teardown(fixtures: IBaseFixtures): Promise<void> {
    try {
      await fixtures.page?.close();
      await fixtures.context?.close();
      await fixtures.browser?.close();
      this.logger.info('BaseFixture: browser closed');
    } catch (err) {
      this.logger.error('BaseFixture: teardown error', err);
    }
  }
}