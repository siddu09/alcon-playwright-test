import fs from 'fs';
import path from 'path';
import { Logger } from '../logger/winston.logger';

const RESULTS_DIR = process.env.ALLURE_RESULTS_DIR || 'reports/allure-results';

/**
 * Utility wrapper for writing Allure supplementary files:
 *   - environment.properties  → shown in the Environment widget
 *   - categories.json         → customises failure categorisation
 *   - manual attachments      → screenshots, HTML dumps, etc.
 *
 * Scenario/step results are recorded automatically by allure-cucumberjs/reporter.
 */
export class AllureReporter {
  private static instance: AllureReporter;
  private readonly logger = Logger.getInstance();

  private constructor() {
    fs.mkdirSync(RESULTS_DIR, { recursive: true });
  }

  public static getInstance(): AllureReporter {
    if (!AllureReporter.instance) {
      AllureReporter.instance = new AllureReporter();
    }
    return AllureReporter.instance;
  }

  /**
   * Writes environment.properties so the Allure report shows
   * target env, browser, base URL, etc. in the Environment widget.
   */
  writeEnvironmentInfo(info: Record<string, string>): void {
    const content = Object.entries(info)
      .map(([k, v]) => `${k}=${v}`)
      .join('\n');

    fs.writeFileSync(
      path.join(RESULTS_DIR, 'environment.properties'),
      content,
      'utf-8'
    );
    this.logger.debug('Allure environment.properties written');
  }

  /**
   * Writes categories.json to customise how Allure groups failures.
   * See: https://allurereport.org/docs/categories/
   */
  writeCategories(categories: object[]): void {
    fs.writeFileSync(
      path.join(RESULTS_DIR, 'categories.json'),
      JSON.stringify(categories, null, 2),
      'utf-8'
    );
    this.logger.debug('Allure categories.json written');
  }

  /**
   * Manually save a file as an Allure attachment.
   * Useful for saving API response bodies, CSV exports, etc.
   */
  saveAttachment(name: string, content: Buffer | string, mimeType: string): void {
    const ext      = this.mimeToExtension(mimeType);
    const fileName = `${Date.now()}-${name.replace(/\W/g, '_')}-attachment.${ext}`;
    const filePath = path.join(RESULTS_DIR, fileName);

    if (typeof content === 'string') {
      fs.writeFileSync(filePath, content, 'utf-8');
    } else {
      fs.writeFileSync(filePath, content);
    }
    this.logger.debug(`Allure attachment saved → ${fileName}`);
  }

  private mimeToExtension(mime: string): string {
    const map: Record<string, string> = {
      'image/png':        'png',
      'image/jpeg':       'jpg',
      'text/html':        'html',
      'text/plain':       'txt',
      'application/json': 'json',
      'application/zip':  'zip',
    };
    return map[mime] ?? 'bin';
  }
}