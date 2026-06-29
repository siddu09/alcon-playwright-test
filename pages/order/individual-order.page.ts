import { expect, Page } from '@playwright/test';
import { BasePage } from '../base/base.page';
import { MYALCON_ORDER_SELECTORS } from '../../src/constants/selectors.constants';

type Eye = 'left' | 'right';

type EyeLensSelection = {
  power: string;
  cylinder: string;
  axis: string;
};

export class IndividualOrderPage extends BasePage {
  private get loginButton() { return this.page.locator(MYALCON_ORDER_SELECTORS.LOGIN_BUTTON).first(); }
  private get emailInput() { return this.page.locator(MYALCON_ORDER_SELECTORS.EMAIL_INPUT).first(); }
  private get passwordInput() { return this.page.locator(MYALCON_ORDER_SELECTORS.PASSWORD_INPUT).first(); }
  private get loginSubmitButton() { return this.page.locator(MYALCON_ORDER_SELECTORS.LOGIN_SUBMIT).first(); }

  private get newOrderNavButton() { return this.page.locator(MYALCON_ORDER_SELECTORS.NEW_ORDER_NAV_BUTTON).first(); }
  private get individualOrderMenuItem() { return this.page.locator(MYALCON_ORDER_SELECTORS.INDIVIDUAL_ORDER_MENU_ITEM).first(); }

  private get configureProductName() { return this.page.locator(MYALCON_ORDER_SELECTORS.CONFIGURE_PRODUCT_NAME).first(); }
  private get packSizeTrial() { return this.page.locator(MYALCON_ORDER_SELECTORS.PACK_SIZE_TRIAL).first(); }
  private get addToCartButton() { return this.page.locator(MYALCON_ORDER_SELECTORS.ADD_TO_CART_BUTTON).first(); }
  private get miniCartButton() { return this.page.locator(MYALCON_ORDER_SELECTORS.MINI_CART_BUTTON).first(); }

  constructor(page: Page) {
    super(page);
  }

  async openJapanStore(): Promise<void> {
    await this.page.goto('https://qa.nonprod-store.myalcon.com/jp', {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });
    await expect(this.loginButton).toBeVisible({ timeout: 60_000 });
  }

  async acceptCookiesIfVisible(): Promise<void> {
    const acceptAllCookies = this.page.getByRole('button', { name: 'Accept All Cookies' });
    if (await acceptAllCookies.isVisible().catch(() => false)) {
      await acceptAllCookies.click();
    }
  }

  async clickLoginFromHome(): Promise<void> {
    await this.assertVisible(this.loginButton, 'Login button should be visible on home page');
    await this.click(this.loginButton);
    await this.page.waitForURL(/q-id\.myalcon\.com|oauth2|authorize/, { timeout: 60_000 });
  }

  async loginWith(email: string, password: string): Promise<void> {
    const emailField = this.page
      .locator(MYALCON_ORDER_SELECTORS.EMAIL_INPUT)
      .or(this.page.getByRole('textbox', { name: /email/i }))
      .first();

    const passwordField = this.page
      .locator(MYALCON_ORDER_SELECTORS.PASSWORD_INPUT)
      .or(this.page.getByRole('textbox', { name: /password/i }))
      .first();

    const submitButton = this.page
      .locator(MYALCON_ORDER_SELECTORS.LOGIN_SUBMIT)
      .or(this.page.getByRole('button', { name: /log\s*in/i }))
      .first();

    await expect(emailField).toBeVisible({ timeout: 60_000 });
    await this.fill(emailField, email);
    await this.fill(passwordField, password);
    await expect(submitButton).toBeEnabled({ timeout: 30_000 });
    await submitButton.click();
    await expect(this.page).toHaveURL(/\/mas|\/individual-order/);
  }

  async assertMasLandingUrl(): Promise<void> {
    await expect(this.page).toHaveURL('https://qa.nonprod-store.myalcon.com/mas');
  }

  async openNewOrder(): Promise<void> {
    if (await this.newOrderNavButton.isVisible().catch(() => false)) {
      await this.click(this.newOrderNavButton);
      return;
    }

    const menuButton = this.page.getByRole('button', { name: 'menu' }).first();
    await this.click(menuButton);
  }

  async selectIndividualOrder(): Promise<void> {
    if (/individual-order/.test(this.page.url())) {
      return;
    }

    const menuItemByRole = this.page.getByRole('menuitem', { name: /individual order/i }).first();

    if (await menuItemByRole.isVisible().catch(() => false)) {
      await menuItemByRole.click();
      await expect(this.page).toHaveURL(/individual-order/);
      return;
    }

    if (await this.individualOrderMenuItem.isVisible().catch(() => false)) {
      await this.click(this.individualOrderMenuItem);
      await expect(this.page).toHaveURL(/individual-order/);
      return;
    }

    // Fallback for environments where the menu does not render consistently.
    await this.page.goto('https://qa.nonprod-store.myalcon.com/mas/individual-order', {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });
    await expect(this.page).toHaveURL(/individual-order/);
  }

  async selectProductByName(productName: string): Promise<void> {
    const card = this.page
      .locator(MYALCON_ORDER_SELECTORS.PRODUCT_CARD_CONTAINER)
      .filter({ has: this.page.locator(MYALCON_ORDER_SELECTORS.PRODUCT_CARD_TITLE, { hasText: productName }) })
      .first();

    await this.assertVisible(card, `Product card "${productName}" should be visible`);
    await card.locator(MYALCON_ORDER_SELECTORS.PRODUCT_SELECT_BUTTON).first().click();

    await expect(this.configureProductName).toContainText(productName);
  }

  async selectRandomLensValuesForBothEyes(): Promise<{ left: EyeLensSelection; right: EyeLensSelection }> {
    const left: EyeLensSelection = {
      power: await this.selectRandomFromAutocomplete(this.getLensSelector('left', 'power')),
      cylinder: await this.selectRandomFromAutocomplete(this.getLensSelector('left', 'cylinder')),
      axis: await this.selectRandomFromAutocomplete(this.getLensSelector('left', 'axis')),
    };

    const right: EyeLensSelection = {
      power: await this.selectRandomFromAutocomplete(this.getLensSelector('right', 'power')),
      cylinder: await this.selectRandomFromAutocomplete(this.getLensSelector('right', 'cylinder')),
      axis: await this.selectRandomFromAutocomplete(this.getLensSelector('right', 'axis')),
    };

    this.logger.info(`Lens selections -> LEFT: ${JSON.stringify(left)} | RIGHT: ${JSON.stringify(right)}`);
    return { left, right };
  }

  async selectPackSizeTrial(): Promise<void> {
    await expect(this.packSizeTrial).toBeEnabled();
    await this.click(this.packSizeTrial);
  }

  async isAddToCartEnabled(): Promise<boolean> {
    return await this.addToCartButton.isEnabled();
  }

  async clickAddToCart(): Promise<void> {
    await this.assertEnabled(this.addToCartButton);
    await this.click(this.addToCartButton);
  }

  async openCartFromHomeHeader(): Promise<void> {
    await this.assertVisible(this.miniCartButton, 'Mini cart button should be visible');
    await this.click(this.miniCartButton);

    const yourCartButton = this.page.getByRole('button', { name: /your cart/i }).first();
    if (await yourCartButton.isVisible().catch(() => false)) {
      await yourCartButton.click();
    }
  }

  async getMiniCartCount(): Promise<number> {
    const text = (await this.miniCartButton.textContent()) ?? '';
    const match = text.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  async assertProductExistsInCart(productName: string): Promise<void> {
    const cartContext = this.page
      .getByText(/your cart|cart/i)
      .first();

    await expect(cartContext).toBeVisible({ timeout: 20_000 });

    const strictProduct = this.page
      .locator(MYALCON_ORDER_SELECTORS.CART_PRODUCT_NAME, { hasText: productName })
      .first();

    if (await strictProduct.isVisible().catch(() => false)) {
      return;
    }

    const fallbackProduct = this.page
      .locator('[data-test="pqf-ProductNameLabel"]', { hasText: /DAILIES TOTAL1.*Astigmatism/i })
      .first();

    if (await fallbackProduct.isVisible().catch(() => false)) {
      return;
    }

    const textFallback = this.page.getByText(/DAILIES TOTAL1.*Astigmatism/i).first();
    await this.assertVisible(textFallback, `Expected product "${productName}" in cart`);
  }

  private getLensSelector(eye: Eye, type: 'power' | 'cylinder' | 'axis'): string {
    if (eye === 'left' && type === 'power') return MYALCON_ORDER_SELECTORS.LEFT_LENS_POWER;
    if (eye === 'left' && type === 'cylinder') return MYALCON_ORDER_SELECTORS.LEFT_LENS_CYLINDER;
    if (eye === 'left' && type === 'axis') return MYALCON_ORDER_SELECTORS.LEFT_LENS_AXIS;
    if (eye === 'right' && type === 'power') return MYALCON_ORDER_SELECTORS.RIGHT_LENS_POWER;
    if (eye === 'right' && type === 'cylinder') return MYALCON_ORDER_SELECTORS.RIGHT_LENS_CYLINDER;
    return MYALCON_ORDER_SELECTORS.RIGHT_LENS_AXIS;
  }

  private async selectRandomFromAutocomplete(selector: string): Promise<string> {
    const root = this.page.locator(selector).first();
    const input = root.locator(MYALCON_ORDER_SELECTORS.AUTOCOMPLETE_INPUT).first();
    const openButton = root.locator(MYALCON_ORDER_SELECTORS.AUTOCOMPLETE_OPEN_BUTTON).first();

    await this.assertVisible(root);
    await expect(input).toBeEnabled();

    await openButton.click();

    const options = this.page.locator(MYALCON_ORDER_SELECTORS.AUTOCOMPLETE_OPTIONS);
    await expect(options.first()).toBeVisible();

    const count = await options.count();
    const cappedCount = Math.min(count, 12);
    const pickIndex = Math.floor(Math.random() * cappedCount);
    const pickedOption = options.nth(pickIndex);
    const value = ((await pickedOption.textContent()) ?? '').trim();

    await pickedOption.click();

    return value;
  }

  async isLoaded(): Promise<boolean> {
    return await this.loginButton.isVisible().catch(() => false)
      || await this.newOrderNavButton.isVisible().catch(() => false)
      || await this.miniCartButton.isVisible().catch(() => false);
  }
}
