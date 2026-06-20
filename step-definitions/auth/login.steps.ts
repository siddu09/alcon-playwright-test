import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../hooks/world';
import { LoginPage } from '../../pages/auth/login.page';
import { DashboardPage } from '../../pages/dashboard/dashboard.page';

// ─── Pre-conditions ───────────────────────────────────────────────────────────

Given('I am on the login page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.goto();

  const loaded = await loginPage.isLoaded();
  if (!loaded) {
    throw new Error('Login page did not load successfully — username input not visible');
  }

  this.logger.info('Login page loaded ✓');
});

// ─── Actions ─────────────────────────────────────────────────────────────────

When('I enter username {string}', async function (this: CustomWorld, username: string) {
  await new LoginPage(this.page).enterUsername(username);
});

When('I enter password {string}', async function (this: CustomWorld, password: string) {
  await new LoginPage(this.page).enterPassword(password);
});

When('I click the login button', async function (this: CustomWorld) {
  await new LoginPage(this.page).clickLogin();
});

// ─── Assertions ───────────────────────────────────────────────────────────────

Then('I should be logged in successfully', async function (this: CustomWorld) {
  await new LoginPage(this.page).assertLoginSuccess();
});

Then('I should see the product dashboard', async function (this: CustomWorld) {
  await new DashboardPage(this.page).assertLoaded();
});

Then('I should see the login error {string}', async function (
  this: CustomWorld,
  error: string
) {
  await new LoginPage(this.page).assertErrorMessage(error);
});