import { Page } from 'playwright';
import { LoginPage } from '../pages/auth/login.page';
import { DashboardPage } from '../pages/dashboard/dashboard.page';

export interface IPageFixtures {
  loginPage:     LoginPage;
  dashboardPage: DashboardPage;
}

/**
 * Creates pre-wired page object instances for a given Playwright Page.
 * Used in both Cucumber step definitions and Playwright Test specs.
 *
 * Usage:
 *   const pages = PageFixture.create(this.page);
 *   await pages.loginPage.goto();
 */
export class PageFixture {
  static create(page: Page): IPageFixtures {
    return {
      loginPage:     new LoginPage(page),
      dashboardPage: new DashboardPage(page),
    };
  }
}