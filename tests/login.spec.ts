import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/auth/login.page';
import { DashboardPage } from '../pages/dashboard/dashboard.page';
import { TestDataManager } from '../utils/data/test-data.manager';

// ─── Playwright Test Suite for Login ─────────────────────────────────────────

test.describe('Login — Playwright Test Suite', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    expect(await loginPage.isLoaded()).toBe(true);
  });

  // ── Positive tests ──────────────────────────────────────────────────────────

  test('should login with valid credentials @smoke', async ({ page }) => {
    const user      = TestDataManager.getUser('standard');
    const loginPage = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await loginPage.loginAs(user.username, user.password);
    await dashboard.assertLoaded();
    await expect(page).toHaveURL(/inventory/);
  });

  test('should show the product inventory after login @smoke', async ({ page }) => {
    const user      = TestDataManager.getUser('standard');
    const loginPage = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await loginPage.loginAs(user.username, user.password);
    const count = await dashboard.getItemCount();
    expect(count).toBeGreaterThan(0);
  });

  // ── Negative tests ──────────────────────────────────────────────────────────

  test('should show error for invalid credentials @negative', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAs('invalid_user', 'bad_password');
    await loginPage.assertErrorMessage(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('should show error for empty username @negative', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAs('', 'secret_sauce');
    await loginPage.assertErrorMessage('Epic sadface: Username is required');
  });

  test('should show error for empty password @negative', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAs('standard_user', '');
    await loginPage.assertErrorMessage('Epic sadface: Password is required');
  });

  test('should show error for locked-out user @negative', async ({ page }) => {
    const user      = TestDataManager.getUser('locked');
    const loginPage = new LoginPage(page);
    await loginPage.loginAs(user.username, user.password);
    await loginPage.assertErrorMessage(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });

  // ── Logout flow ─────────────────────────────────────────────────────────────

  test('should allow a logged-in user to log out @smoke', async ({ page }) => {
    const user      = TestDataManager.getUser('standard');
    const loginPage = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await loginPage.loginAs(user.username, user.password);
    await dashboard.assertLoaded();
    await dashboard.logout();
    expect(await loginPage.isLoaded()).toBe(true);
  });
});