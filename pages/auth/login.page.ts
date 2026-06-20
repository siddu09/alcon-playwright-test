import { Page } from '@playwright/test';
import { BasePage } from '../base/base.page';
import { LOGIN_SELECTORS } from '../../src/constants/selectors.constants';
import { envConfig } from '../../config/environment.config';

/**
 * Page Object for the Login / Authentication page.
 * Extends BasePage — inherits all shared interactions and assertions.
 */
export class LoginPage extends BasePage {

  // ─── Locators (lazy getters keep selectors co-located with usage) ────────

  private get usernameInput() { return this.page.locator(LOGIN_SELECTORS.USERNAME_INPUT); }
  private get passwordInput() { return this.page.locator(LOGIN_SELECTORS.PASSWORD_INPUT); }
  private get loginButton()   { return this.page.locator(LOGIN_SELECTORS.LOGIN_BUTTON); }
  private get errorMessage()  { return this.page.locator(LOGIN_SELECTORS.ERROR_MESSAGE); }
  private get welcomeBanner() { return this.page.locator(LOGIN_SELECTORS.WELCOME_BANNER); }
  private get errorButton()   { return this.page.locator(LOGIN_SELECTORS.ERROR_BUTTON); }

  constructor(page: Page) {
    super(page);
  }

  // ─── Navigation ──────────────────────────────────────────────────────────────

  async goto(): Promise<void> {
    await this.navigate(envConfig.BASE_URL);
    await this.waitForPageLoad();
    this.logger.info('Login page navigation complete');
  }

  // ─── Individual field actions ────────────────────────────────────────────────

  async enterUsername(username: string): Promise<void> {
    this.logger.info(`Entering username: ${username}`);
    await this.fill(this.usernameInput, username);
  }

  async enterPassword(password: string): Promise<void> {
    this.logger.info('Entering password: [REDACTED]');
    await this.fill(this.passwordInput, password);
  }

  async clickLogin(): Promise<void> {
    this.logger.info('Clicking login button');
    await this.click(this.loginButton);
  }

  async closeErrorMessage(): Promise<void> {
    await this.click(this.errorButton);
  }

  // ─── Composite actions ───────────────────────────────────────────────────────

  /** Full login flow — enter credentials and submit in one call */
  async loginAs(username: string, password: string): Promise<void> {
    this.logger.info(`Login as: ${username}`);
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  // ─── Assertions ──────────────────────────────────────────────────────────────

  async assertLoginSuccess(): Promise<void> {
    await this.assertVisible(
      this.welcomeBanner,
      'Welcome banner should be visible after successful login'
    );
    this.logger.info('Login success verified ✓');
  }

  async assertErrorMessage(expected: string): Promise<void> {
    await this.assertText(this.errorMessage, expected);
    this.logger.info(`Login error verified: "${expected}"`);
  }

  async assertErrorVisible(): Promise<void> {
    await this.assertVisible(this.errorMessage, 'Error message should be visible');
  }

  // ─── Getters ────────────────────────────────────────────────────────────────

  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }

  // ─── Contract ────────────────────────────────────────────────────────────────

  async isLoaded(): Promise<boolean> {
    return await this.usernameInput.isVisible();
  }
}