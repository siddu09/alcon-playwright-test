import {
  Before,
  After,
  BeforeAll,
  AfterAll,
  setDefaultTimeout,
  Status,
} from '@cucumber/cucumber';
import {
  chromium,
  firefox,
  webkit,
  Browser,
} from 'playwright';
import path from 'path';
import fs from 'fs';
import { CustomWorld } from './world';
import { Logger } from '../utils/logger/winston.logger';
import { envConfig } from '../config/environment.config';
import { TIMEOUTS } from '../src/constants/timeouts.constants';

const logger = Logger.getInstance();

// ─── Default step timeout ─────────────────────────────────────────────────────

setDefaultTimeout(envConfig.TIMEOUT);

// ─── Report directory setup ───────────────────────────────────────────────────

const REPORT_DIRS = [
  'reports/allure-results',
  'reports/screenshots',
  'reports/traces',
  'reports/videos',
  'reports/logs',
];

// ─── Suite Lifecycle ──────────────────────────────────────────────────────────

BeforeAll(async function () {
  REPORT_DIRS.forEach(dir => fs.mkdirSync(dir, { recursive: true }));

  logger.info('══════════════════════════════════════════════════');
  logger.info('  🚀  Alcon Playwright BDD Test Suite — STARTED');
  logger.info(`      Environment  : ${envConfig.ENV}`);
  logger.info(`      Base URL     : ${envConfig.BASE_URL}`);
  logger.info(`      Browser      : ${envConfig.BROWSER}`);
  logger.info(`      Headless     : ${String(envConfig.HEADLESS)}`);
  logger.info(`      Timeout (ms) : ${envConfig.TIMEOUT}`);
  logger.info(`      Workers      : ${envConfig.PARALLEL_WORKERS}`);
  logger.info('══════════════════════════════════════════════════');
});

AfterAll(async function () {
  logger.info('══════════════════════════════════════════════════');
  logger.info('  ✅  Alcon Playwright BDD Test Suite — COMPLETE');
  logger.info('══════════════════════════════════════════════════');
});

// ─── Scenario Lifecycle ───────────────────────────────────────────────────────

Before(async function (this: CustomWorld, { pickle }) {
  this.startTime    = new Date();
  this.scenarioName = pickle.name;
  this.featureName  = pickle.uri ?? '';
  this.testName     = pickle.name.replace(/\W+/g, '_').substring(0, 80);

  const tags = pickle.tags.map(t => t.name).join(', ') || 'none';
  logger.info(`\n▶  Scenario : "${this.scenarioName}"`);
  logger.info(`   Tags     : ${tags}`);

  // ── Launch browser ──────────────────────────────────────────────────────────

  const launchers: Record<string, () => Promise<Browser>> = {
    chromium: () => chromium.launch(getLaunchOptions()),
    firefox:  () => firefox.launch(getLaunchOptions()),
    webkit:   () => webkit.launch(getLaunchOptions()),
  };

  const launchBrowser = launchers[envConfig.BROWSER] ?? launchers['chromium'];
  this.browser = await launchBrowser();

  // ── Create context ──────────────────────────────────────────────────────────

  this.context = await this.browser.newContext({
    viewport:          { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    ...(envConfig.RECORD_VIDEO && {
      recordVideo: {
        dir:  'reports/videos',
        size: { width: 1280, height: 720 },
      },
    }),
  });

  // ── Start tracing ───────────────────────────────────────────────────────────

  if (envConfig.RECORD_TRACE || process.env.CI) {
    await this.context.tracing.start({
      screenshots: true,
      snapshots:   true,
      sources:     true,
    });
  }

  // ── Open page ───────────────────────────────────────────────────────────────

  this.page = await this.context.newPage();
  this.page.setDefaultTimeout(TIMEOUTS.ELEMENT);
  this.page.setDefaultNavigationTimeout(TIMEOUTS.NAVIGATION);
});

After(async function (this: CustomWorld, { result, pickle }) {
  const status   = result?.status;
  const duration = Date.now() - this.startTime.getTime();
  const icon     = status === Status.PASSED   ? '✅' :
                   status === Status.SKIPPED  ? '⏭ ' :
                                               '❌';

  logger.info(`${icon}  "${pickle.name}" → ${status ?? 'UNKNOWN'}  (${duration}ms)`);

  // ── On failure: capture artefacts ──────────────────────────────────────────

  if (status === Status.FAILED) {

    // Screenshot
    if (this.page) {
      try {
        const screenshotPath = path.join(
          'reports/screenshots',
          `${this.testName}_${Date.now()}.png`
        );
        const screenshot = await this.page.screenshot({
          path:     screenshotPath,
          fullPage: true,
        });
        await this.attach(screenshot, 'image/png');
        logger.info(`   📸 Screenshot → ${screenshotPath}`);
      } catch (err) {
        logger.error('Failed to capture screenshot', err);
      }

      // Page HTML snapshot
      try {
        const html = await this.page.content();
        await this.attach(html, 'text/html');
      } catch { /* non-critical */ }
    }

    // Trace
    if (this.context && (envConfig.RECORD_TRACE || process.env.CI)) {
      try {
        const tracePath = path.join(
          'reports/traces',
          `${this.testName}_${Date.now()}.zip`
        );
        await this.context.tracing.stop({ path: tracePath });
        logger.info(`   🔍 Trace → ${tracePath}`);
      } catch (err) {
        logger.error('Failed to save trace', err);
      }
    }

  } else {
    // Stop tracing without saving (passed scenarios)
    try {
      await this.context?.tracing.stop();
    } catch { /* tracing may not have been started */ }
  }

  // ── Teardown ────────────────────────────────────────────────────────────────

  try {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
  } catch (err) {
    logger.warn('Cleanup error during scenario teardown');
    logger.error('Teardown error', err);
  }
});

// ─── Helper ───────────────────────────────────────────────────────────────────

function getLaunchOptions() {
  return {
    headless: envConfig.HEADLESS,
    slowMo:   envConfig.SLOW_MO,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-extensions',
    ],
  };
}