import fs from 'fs';
import path from 'path';
import { Logger } from '../logger/winston.logger';

const DATA_ROOT = path.resolve(process.cwd(), 'data');

/**
 * Reads, parses and caches JSON test-data files from the data/ directory.
 * Supports environment-specific data files with automatic fallback.
 *
 * Usage:
 *   const users = DataLoader.loadJson<IUserData[]>('users/users.json');
 */
export class DataLoader {
  private static readonly logger = Logger.getInstance();
  private static readonly cache  = new Map<string, unknown>();

  /**
   * Load a JSON file relative to the data/ root directory.
   * @param relPath   Path relative to data/ (e.g. 'users/users.json')
   * @param useCache  Whether to cache the result (default true)
   */
  static loadJson<T>(relPath: string, useCache = true): T {
    const fullPath = path.resolve(DATA_ROOT, relPath);

    if (useCache && this.cache.has(fullPath)) {
      this.logger.debug(`Cache hit: ${fullPath}`);
      return this.cache.get(fullPath) as T;
    }

    if (!fs.existsSync(fullPath)) {
      throw new Error(`Test data file not found: ${fullPath}`);
    }

    try {
      const raw  = fs.readFileSync(fullPath, 'utf-8');
      const data = JSON.parse(raw) as T;

      if (useCache) this.cache.set(fullPath, data);
      this.logger.debug(`Data loaded: ${fullPath}`);
      return data;
    } catch (err) {
      this.logger.error(`Failed to parse data file: ${fullPath}`, err);
      throw err;
    }
  }

  /**
   * Attempts to load an environment-specific file
   * (e.g. data/users/qa-users.json), falls back to
   * the generic file (e.g. data/users/users.json).
   */
  static loadEnvData<T>(type: string): T {
    const env = process.env.ENV || 'qa';
    try {
      return this.loadJson<T>(`${type}/${env}-${type}.json`);
    } catch {
      this.logger.debug(`Env-specific data not found for ${env}, using default`);
      return this.loadJson<T>(`${type}/${type}.json`);
    }
  }

  /** Clear the in-memory cache */
  static clearCache(): void {
    this.cache.clear();
    this.logger.debug('DataLoader cache cleared');
  }
}