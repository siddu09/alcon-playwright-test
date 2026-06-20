import { Page } from 'playwright';
import { Logger } from '../logger/winston.logger';

/**
 * Static wait and polling helpers used across steps and page objects.
 */
export class WaitHelper {
  private static readonly logger = Logger.getInstance();

  /** Simple fixed delay */
  static async wait(ms: number): Promise<void> {
    this.logger.debug(`Waiting ${ms}ms`);
    await new Promise<void>(resolve => setTimeout(resolve, ms));
  }

  /** Wait until the network is idle */
  static async waitForNetworkIdle(page: Page, timeout = 30_000): Promise<void> {
    await page.waitForLoadState('networkidle', { timeout });
  }

  /** Wait for the 'load' event to fire */
  static async waitForPageLoad(page: Page, timeout = 30_000): Promise<void> {
    await page.waitForLoadState('load', { timeout });
  }

  /** Wait for the DOM content to be parsed */
  static async waitForDOMContentLoaded(page: Page, timeout = 30_000): Promise<void> {
    await page.waitForLoadState('domcontentloaded', { timeout });
  }

  /** Wait for the URL to match a string or pattern */
  static async waitForUrl(
    page: Page,
    urlPattern: string | RegExp,
    timeout = 30_000
  ): Promise<void> {
    await page.waitForURL(urlPattern, { timeout });
  }

  /**
   * Polls a condition function until it resolves true or the timeout expires.
   * Throws if the condition is never met.
   *
   * @param condition  async or sync function that returns a boolean
   * @param timeout    maximum wait in milliseconds (default 30 s)
   * @param interval   polling interval in milliseconds (default 500 ms)
   */
  static async waitForCondition(
    condition: () => Promise<boolean> | boolean,
    timeout  = 30_000,
    interval = 500
  ): Promise<void> {
    const deadline = Date.now() + timeout;

    while (Date.now() < deadline) {
      if (await condition()) return;
      await WaitHelper.wait(interval);
    }

    throw new Error(`Condition not satisfied within ${timeout}ms`);
  }

  /**
   * Retries an async action up to maxRetries times with an increasing delay.
   * Useful for unstable network calls or flaky UI transitions.
   *
   * @param action     async function to attempt
   * @param maxRetries maximum number of attempts (default 3)
   * @param delay      base delay between attempts in milliseconds (default 1 s)
   */
  static async retry<T>(
    action:     () => Promise<T>,
    maxRetries = 3,
    delay      = 1_000
  ): Promise<T> {
    let lastErr: Error | undefined;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await action();
      } catch (err) {
        lastErr = err as Error;
        this.logger.warn(`Attempt ${attempt}/${maxRetries} failed: ${lastErr.message}`);
        if (attempt < maxRetries) await WaitHelper.wait(delay * attempt);
      }
    }

    throw lastErr;
  }
}