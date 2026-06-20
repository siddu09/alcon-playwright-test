import { Given, When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { CustomWorld } from '../../hooks/world';
import { LoginPage } from '../../pages/auth/login.page';
import { DashboardPage } from '../../pages/dashboard/dashboard.page';
import { TestDataManager } from '../../utils/data/test-data.manager';

// ─── Pre-conditions ───────────────────────────────────────────────────────────

Given('I am logged in as a standard user', async function (this: CustomWorld) {
  const user      = TestDataManager.getUser('standard');
  const loginPage = new LoginPage(this.page);

  await loginPage.goto();
  await loginPage.loginAs(user.username, user.password);
  await loginPage.assertLoginSuccess();

  this.logger.info(`Logged in as: ${user.username} (role=standard)`);
});

Given('I am logged in as an admin user', async function (this: CustomWorld) {
  const user      = TestDataManager.getUser('admin');
  const loginPage = new LoginPage(this.page);

  await loginPage.goto();
  await loginPage.loginAs(user.username, user.password);
  await loginPage.assertLoginSuccess();

  this.logger.info(`Logged in as: ${user.username} (role=admin)`);
});

// ─── Actions ─────────────────────────────────────────────────────────────────

When('I log out from the application', async function (this: CustomWorld) {
  this.logger.info('Logging out from application');
  await new DashboardPage(this.page).logout();
});

// ─── Assertions ───────────────────────────────────────────────────────────────

Then('the product count should be greater than 0', async function (this: CustomWorld) {
  const count = await new DashboardPage(this.page).getItemCount();
  assert.ok(count > 0, `Expected product count > 0, but got ${count}`);
  this.logger.info(`Product count verified: ${count} ✓`);
});

Then('the dashboard title should be {string}', async function (
  this: CustomWorld,
  expected: string
) {
  await new DashboardPage(this.page).assertTitle(expected);
});

Then('I should be redirected to the login page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  const loaded    = await loginPage.isLoaded();
  assert.ok(loaded, 'Expected to be on the login page — username input not visible');
  this.logger.info('Redirect to login page verified ✓');
});