import { Page } from '@playwright/test';
import { BasePage } from '../base/base.page';
import { DASHBOARD_SELECTORS } from '../../src/constants/selectors.constants';

/**
 * Page Object for the Product Dashboard (Inventory) page.
 */
export class DashboardPage extends BasePage {

  // ─── Locators ────────────────────────────────────────────────────────────────

  private get pageTitle()      { return this.page.locator(DASHBOARD_SELECTORS.PAGE_TITLE); }
  private get menuButton()     { return this.page.locator(DASHBOARD_SELECTORS.MENU_BUTTON); }
  private get menuClose()      { return this.page.locator(DASHBOARD_SELECTORS.MENU_CLOSE); }
  private get logoutLink()     { return this.page.locator(DASHBOARD_SELECTORS.LOGOUT_LINK); }
  private get inventoryList()  { return this.page.locator(DASHBOARD_SELECTORS.INVENTORY_LIST); }
  private get inventoryItems() { return this.page.locator(DASHBOARD_SELECTORS.INVENTORY_ITEM); }
  private get itemNames()      { return this.page.locator(DASHBOARD_SELECTORS.ITEM_NAME); }
  private get itemPrices()     { return this.page.locator(DASHBOARD_SELECTORS.ITEM_PRICE); }
  private get cartBadge()      { return this.page.locator(DASHBOARD_SELECTORS.CART_BADGE); }
  private get cartLink()       { return this.page.locator(DASHBOARD_SELECTORS.CART_LINK); }
  private get sortDropdown()   { return this.page.locator(DASHBOARD_SELECTORS.SORT_DROPDOWN); }
  private get addToCartBtns()  { return this.page.locator(DASHBOARD_SELECTORS.ADD_TO_CART); }

  constructor(page: Page) {
    super(page);
  }

  // ─── Navigation ──────────────────────────────────────────────────────────────

  async openMenu(): Promise<void> {
    this.logger.info('Opening navigation menu');
    await this.click(this.menuButton);
  }

  async closeMenu(): Promise<void> {
    this.logger.info('Closing navigation menu');
    await this.click(this.menuClose);
  }

  async goToCart(): Promise<void> {
    this.logger.info('Navigating to cart');
    await this.click(this.cartLink);
  }

  // ─── Actions ─────────────────────────────────────────────────────────────────

  async logout(): Promise<void> {
    this.logger.info('Logging out');
    await this.openMenu();
    await this.click(this.logoutLink);
    await this.waitForPageLoad();
  }

  async sortBy(option: string): Promise<void> {
    this.logger.info(`Sorting by: ${option}`);
    await this.selectDropdown(this.sortDropdown, option);
  }

  async addFirstProductToCart(): Promise<void> {
    const btn = this.addToCartBtns.first();
    await this.click(btn);
    this.logger.info('First product added to cart');
  }

  // ─── Getters ────────────────────────────────────────────────────────────────

  async getTitle(): Promise<string> {
    return await this.getText(this.pageTitle);
  }

  async getItemCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async getCartCount(): Promise<number> {
    const visible = await this.cartBadge.isVisible();
    if (!visible) return 0;
    const text = await this.getText(this.cartBadge);
    return parseInt(text, 10);
  }

  async getAllProductNames(): Promise<string[]> {
    return await this.itemNames.allTextContents();
  }

  async getAllProductPrices(): Promise<number[]> {
    const texts = await this.itemPrices.allTextContents();
    return texts.map(t => parseFloat(t.replace('$', '')));
  }

  // ─── Assertions ──────────────────────────────────────────────────────────────

  async assertLoaded(): Promise<void> {
    await this.assertVisible(
      this.inventoryList,
      'Inventory list must be visible on the dashboard'
    );
    this.logger.info('Dashboard loaded and verified ✓');
  }

  async assertTitle(expected: string): Promise<void> {
    await this.assertText(this.pageTitle, expected);
  }

  async assertCartCount(expected: number): Promise<void> {
    const actual = await this.getCartCount();
    if (actual !== expected) {
      throw new Error(`Expected cart count ${expected}, but got ${actual}`);
    }
  }

  // ─── Contract ────────────────────────────────────────────────────────────────

  async isLoaded(): Promise<boolean> {
    return await this.inventoryList.isVisible();
  }
}