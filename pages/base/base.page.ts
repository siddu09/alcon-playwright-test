import { Page, Locator, expect } from '@playwright/test';
import { Logger } from '../../utils/logger/winston.logger';
import { TIMEOUTS } from '../../src/constants/timeouts.constants';

/**
 * Abstract base class for all Page Objects.
 * Encapsulates common Playwright interactions so extending classes
 * only need to declare page-specific locators and composite actions.
 *
 * SOLID principles applied:
 *  - Single Responsibility : handles UI interaction concerns only
 *  - Open / Closed         : open for extension, closed for modification
 *  - Liskov Substitution   : all subclasses safely substitute for BasePage
 */
export abstract class BasePage {
  protected readonly page:   Page;
  protected readonly logger: Logger;

  constructor(page: Page) {
    this.page   = page;
    this.logger = Logger.getInstance();
  }

  // ─── Navigation ────────────────────────────────────────────────────────────

  async navigate(url: string): Promise<void> {
    this.logger.info(`Navigating → ${url}`);
    await this.page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout:   TIMEOUTS.NAVIGATION,
    });
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle', {
      timeout: TIMEOUTS.NETWORK_IDLE,
    });
  }

  getCurrentUrl(): string {
    return this.page.url();
  }

  async goBack(): Promise<void> {
    await this.page.goBack();
  }

  async refresh(): Promise<void> {
    await this.page.reload({ waitUntil: 'networkidle' });
  }

  // ─── Element Interactions ───────────────────────────────────────────────────

  async waitForVisible(
    locator: Locator,
    timeout = TIMEOUTS.ELEMENT
  ): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async waitForHidden(
    locator: Locator,
    timeout = TIMEOUTS.ELEMENT
  ): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  async click(locator: Locator): Promise<void> {
    await this.waitForVisible(locator);
    this.logger.debug(`Click → ${locator}`);
    await locator.click();
  }

  async fill(locator: Locator, text: string): Promise<void> {
    await this.waitForVisible(locator);
    this.logger.debug(`Fill "${text.length > 20 ? text.substring(0, 20) + '…' : text}"`);
    await locator.clear();
    await locator.fill(text);
  }

  async getText(locator: Locator): Promise<string> {
    await this.waitForVisible(locator);
    return (await locator.textContent()) ?? '';
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  async isEnabled(locator: Locator): Promise<boolean> {
    return await locator.isEnabled();
  }

  async selectDropdown(locator: Locator, value: string): Promise<void> {
    await this.waitForVisible(locator);
    await locator.selectOption(value);
  }

  async hoverElement(locator: Locator): Promise<void> {
    await this.waitForVisible(locator);
    await locator.hover();
  }

  async getAttribute(locator: Locator, attr: string): Promise<string | null> {
    return await locator.getAttribute(attr);
  }

  // ─── Assertions ─────────────────────────────────────────────────────────────

  async assertVisible(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeVisible({
      timeout: TIMEOUTS.ASSERTION,
    });
  }

  async assertHidden(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeHidden({
      timeout: TIMEOUTS.ASSERTION,
    });
  }

  async assertText(locator: Locator, expectedText: string): Promise<void> {
    await expect(locator).toHaveText(expectedText, {
      timeout: TIMEOUTS.ASSERTION,
    });
  }

  async assertContainsText(locator: Locator, text: string): Promise<void> {
    await expect(locator).toContainText(text, {
      timeout: TIMEOUTS.ASSERTION,
    });
  }

  async assertUrl(expectedUrl: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(expectedUrl, {
      timeout: TIMEOUTS.ASSERTION,
    });
  }

  async assertTitle(expectedTitle: string): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle, {
      timeout: TIMEOUTS.ASSERTION,
    });
  }

  async assertEnabled(locator: Locator): Promise<void> {
    await expect(locator).toBeEnabled({ timeout: TIMEOUTS.ASSERTION });
  }

  async assertDisabled(locator: Locator): Promise<void> {
    await expect(locator).toBeDisabled({ timeout: TIMEOUTS.ASSERTION });
  }

  // ─── Screenshots ────────────────────────────────────────────────────────────

  async takeScreenshot(name: string): Promise<Buffer> {
    this.logger.info(`Screenshot: ${name}`);
    return await this.page.screenshot({
      path:     `reports/screenshots/${name}_${Date.now()}.png`,
      fullPage: true,
    });
  }

  // ─── Contract ───────────────────────────────────────────────────────────────

  /**
   * Every Page Object must implement this guard.
   * Called after navigation to verify the correct page is loaded.
   */
  abstract isLoaded(): Promise<boolean>;
}