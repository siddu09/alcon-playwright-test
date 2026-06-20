import { When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { CustomWorld } from '../../hooks/world';
import { WaitHelper } from '../../utils/helpers/wait.helper';

// ─── Timing ───────────────────────────────────────────────────────────────────

When('I wait for {int} seconds', async function (this: CustomWorld, seconds: number) {
  this.logger.debug(`Waiting ${seconds}s`);
  await WaitHelper.wait(seconds * 1_000);
});

When('I wait for {int} milliseconds', async function (this: CustomWorld, ms: number) {
  this.logger.debug(`Waiting ${ms}ms`);
  await WaitHelper.wait(ms);
});

// ─── URL & Title ──────────────────────────────────────────────────────────────

Then('the page URL should contain {string}', async function (
  this: CustomWorld,
  fragment: string
) {
  const url = this.page.url();
  assert.ok(
    url.includes(fragment),
    `Expected URL to contain "${fragment}", but got: "${url}"`
  );
  this.logger.info(`URL fragment "${fragment}" verified ✓`);
});

Then('the page URL should be {string}', async function (
  this: CustomWorld,
  expectedUrl: string
) {
  const url = this.page.url();
  assert.strictEqual(url, expectedUrl, `Expected URL "${expectedUrl}", but got "${url}"`);
});

Then('the page title should be {string}', async function (
  this: CustomWorld,
  title: string
) {
  await this.page.waitForFunction(
    (expected: string) => document.title === expected,
    title,
    { timeout: 10_000 }
  );
  this.logger.info(`Page title "${title}" verified ✓`);
});

// ─── Screenshots ──────────────────────────────────────────────────────────────

Then('I take a screenshot', async function (this: CustomWorld) {
  const screenshot = await this.page.screenshot({ fullPage: true });
  await this.attach(screenshot, 'image/png');
  this.logger.info('Manual screenshot attached to report');
});

Then('I take a screenshot named {string}', async function (
  this: CustomWorld,
  name: string
) {
  const screenshot = await this.page.screenshot({
    path:     `reports/screenshots/${name}_${Date.now()}.png`,
    fullPage: true,
  });
  await this.attach(screenshot, 'image/png');
  this.logger.info(`Screenshot "${name}" captured and attached`);
});