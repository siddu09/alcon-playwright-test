import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from 'playwright';
import { Logger } from '../utils/logger/winston.logger';

/**
 * CustomWorld — the shared state object injected as `this`
 * into every step definition and hook.
 *
 * IMPORTANT: This file must be the FIRST item in the
 * cucumber.config.js `require` array.
 */
export class CustomWorld extends World {
  public browser!:       Browser;
  public context!:       BrowserContext;
  public page!:          Page;
  public testName!:      string;
  public startTime!:     Date;
  public scenarioName!:  string;
  public featureName!:   string;
  public testData:       Record<string, unknown> = {};

  public readonly logger: Logger;

  constructor(options: IWorldOptions) {
    super(options);
    this.logger = Logger.getInstance();
  }
}

setWorldConstructor(CustomWorld);