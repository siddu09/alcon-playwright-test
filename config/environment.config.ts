import dotenv from 'dotenv';
import path from 'path';
import { IEnvironmentConfig, Environment } from '../src/types/environment.types';

/**
 * Singleton environment configuration loader.
 * Reads from config/environments/<ENV>.env first,
 * then falls back to the root .env file.
 *
 * Usage:
 *   import { envConfig } from './config/environment.config';
 *   const baseUrl = envConfig.BASE_URL;
 */
export class EnvironmentConfig {
  private static instance: EnvironmentConfig;
  private readonly config: IEnvironmentConfig;

  private constructor() {
    const env = (process.env.ENV || 'qa') as Environment;

    // Load env-specific file first, then root .env as fallback
    dotenv.config({ path: path.resolve(process.cwd(), `config/environments/${env}.env`) });
    dotenv.config({ path: path.resolve(process.cwd(), '.env'), override: false });

    this.config = {
      ENV:              env,
      BASE_URL:         process.env.BASE_URL         || 'https://qa.nonprod-store.myalcon.com/jp',
      API_URL:          process.env.API_URL,
      TEST_USERNAME:    process.env.TEST_USERNAME,
      TEST_PASSWORD:    process.env.TEST_PASSWORD,
      HEADLESS:         process.env.HEADLESS          !== 'false',
      BROWSER:          (process.env.BROWSER as IEnvironmentConfig['BROWSER']) || 'chromium',
      TIMEOUT:          parseInt(process.env.TIMEOUT          || '30000'),
      PARALLEL_WORKERS: parseInt(process.env.PARALLEL_WORKERS || '1'),
      LOG_LEVEL:        process.env.LOG_LEVEL         || 'info',
      SLOW_MO:          parseInt(process.env.SLOW_MO  || '0'),
      RECORD_VIDEO:     process.env.RECORD_VIDEO      === 'true',
      RECORD_TRACE:     process.env.RECORD_TRACE      === 'true',
    };
  }

  public static getInstance(): EnvironmentConfig {
    if (!EnvironmentConfig.instance) {
      EnvironmentConfig.instance = new EnvironmentConfig();
    }
    return EnvironmentConfig.instance;
  }

  /** Returns the full config object */
  public getConfig(): IEnvironmentConfig {
    return this.config;
  }

  /** Type-safe single-key getter */
  public get<K extends keyof IEnvironmentConfig>(key: K): IEnvironmentConfig[K] {
    return this.config[key];
  }
}

/** Pre-resolved singleton config — import this throughout the framework */
export const envConfig = EnvironmentConfig.getInstance().getConfig();