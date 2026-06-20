import { AfterAll, AfterStep, BeforeStep } from '@cucumber/cucumber';
import { Logger } from '../utils/logger/winston.logger';
import { AllureReporter } from '../utils/reporters/allure.reporter';
import { envConfig } from '../config/environment.config';
import { CustomWorld } from './world';

const logger = Logger.getInstance();

// ─── Step-level logging ───────────────────────────────────────────────────────

BeforeStep(async function (this: CustomWorld, { pickleStep }) {
  this.logger.debug(`  → ${pickleStep.text}`);
});

AfterStep(async function (this: CustomWorld, { result, pickleStep }) {
  const status = result?.status ?? 'UNKNOWN';

  switch (status) {
    case 'PASSED':
      this.logger.debug(`  ✓ ${pickleStep.text}`);
      break;
    case 'FAILED':
      this.logger.error(`  ✗ FAILED step: "${pickleStep.text}"`);
      if (result?.message) this.logger.error(`    ${result.message}`);
      break;
    case 'SKIPPED':
      this.logger.warn(`  ⊘ SKIPPED: ${pickleStep.text}`);
      break;
    case 'PENDING':
      this.logger.warn(`  ⚠ PENDING: ${pickleStep.text}`);
      break;
    default:
      this.logger.warn(`  ? ${status}: ${pickleStep.text}`);
  }
});

// ─── Post-suite: Allure environment & categories ──────────────────────────────

AfterAll(async function () {
  const allure = AllureReporter.getInstance();

  allure.writeEnvironmentInfo({
    Environment:    envConfig.ENV,
    'Base URL':     envConfig.BASE_URL,
    Browser:        envConfig.BROWSER,
    Headless:       String(envConfig.HEADLESS),
    'Node Version': process.version,
    'Run Date':     new Date().toISOString(),
    'Timeout (ms)': String(envConfig.TIMEOUT),
    Workers:        String(envConfig.PARALLEL_WORKERS),
  });

  allure.writeCategories([
    {
      name:            'Broken tests',
      matchedStatuses: ['broken'],
      messageRegex:    '.*Error.*',
    },
    {
      name:            'Failed assertions',
      matchedStatuses: ['failed'],
      messageRegex:    '.*AssertionError.*',
    },
    {
      name:            'Ignored tests',
      matchedStatuses: ['skipped', 'pending'],
    },
  ]);

  logger.info('Allure environment.properties written ✓');
  logger.info('Run "npm run allure:generate" then "npm run allure:open" to view the report.');
});