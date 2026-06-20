import { Locator, Page } from 'playwright';
import { TIMEOUTS } from '../../src/constants/timeouts.constants';

/**
 * Static helpers for advanced element-level interactions
 * that extend beyond the BasePage abstraction.
 */
export class ElementHelper {

  /** Wait for a locator to become visible */
  static async waitForVisible(
    locator: Locator,
    timeout = TIMEOUTS.ELEMENT
  ): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /** Wait for a locator to become hidden / removed */
  static async waitForHidden(
    locator: Locator,
    timeout = TIMEOUTS.ELEMENT
  ): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /** Returns true if the locator exists in the DOM within timeout */
  static async exists(
    locator: Locator,
    timeout = TIMEOUTS.SHORT
  ): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'attached', timeout });
      return true;
    } catch {
      return false;
    }
  }

  /** Retrieve text content of all matched elements */
  static async getAllTexts(locator: Locator): Promise<string[]> {
    return await locator.allTextContents();
  }

  /** Scroll the element into the viewport */
  static async scrollIntoView(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /** Hover over an element */
  static async hover(locator: Locator): Promise<void> {
    await ElementHelper.waitForVisible(locator);
    await locator.hover();
  }

  /** Select a <select> option by value string */
  static async selectOption(locator: Locator, value: string): Promise<void> {
    await ElementHelper.waitForVisible(locator);
    await locator.selectOption(value);
  }

  /** Read an HTML attribute value */
  static async getAttribute(
    locator: Locator,
    attr: string
  ): Promise<string | null> {
    return await locator.getAttribute(attr);
  }

  /** Press a keyboard key on the page */
  static async pressKey(page: Page, key: string): Promise<void> {
    await page.keyboard.press(key);
  }

  /** Drag a source element onto a target element */
  static async dragAndDrop(source: Locator, target: Locator): Promise<void> {
    await source.dragTo(target);
  }

  /** Return the number of elements matching a locator */
  static async getCount(locator: Locator): Promise<number> {
    return await locator.count();
  }

  /** Double-click an element */
  static async doubleClick(locator: Locator): Promise<void> {
    await ElementHelper.waitForVisible(locator);
    await locator.dblclick();
  }

  /** Right-click (context-menu) an element */
  static async rightClick(locator: Locator): Promise<void> {
    await ElementHelper.waitForVisible(locator);
    await locator.click({ button: 'right' });
  }

  /** Clear and type text into an input field */
  static async clearAndType(locator: Locator, text: string): Promise<void> {
    await ElementHelper.waitForVisible(locator);
    await locator.clear();
    await locator.fill(text);
  }
}