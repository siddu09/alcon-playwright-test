import { DataLoader } from './data-loader';
import { Logger } from '../logger/winston.logger';

// ─── Shared data interfaces ───────────────────────────────────────────────────

export interface IUserData {
  username: string;
  password: string;
  role:     string;
  email?:   string;
}

export interface IProductData {
  id:           string;
  name:         string;
  price:        number;
  description?: string;
}

export interface ICheckoutData {
  firstName:  string;
  lastName:   string;
  postalCode: string;
}

// ─── Manager ─────────────────────────────────────────────────────────────────

/**
 * Typed accessors for all test data.
 * Uses DataLoader internally for file I/O and caching.
 */
export class TestDataManager {
  private static readonly logger = Logger.getInstance();

  // ── User data ──────────────────────────────────────────────────────────────

  static getUser(role: string): IUserData {
    const users = DataLoader.loadJson<IUserData[]>('users/users.json');
    const user  = users.find(u => u.role === role);

    if (!user) {
      throw new Error(`No user found with role: "${role}". Available roles: ${users.map(u => u.role).join(', ')}`);
    }

    this.logger.debug(`User loaded: ${user.username} (role=${role})`);
    return user;
  }

  static getAllUsers(): IUserData[] {
    return DataLoader.loadJson<IUserData[]>('users/users.json');
  }

  // ── Product data ───────────────────────────────────────────────────────────

  static getProduct(id: string): IProductData {
    const products = DataLoader.loadJson<IProductData[]>('products/products.json');
    const product  = products.find(p => p.id === id);

    if (!product) {
      throw new Error(`No product found with id: "${id}"`);
    }

    return product;
  }

  static getAllProducts(): IProductData[] {
    return DataLoader.loadJson<IProductData[]>('products/products.json');
  }

  // ── Checkout data ──────────────────────────────────────────────────────────

  static getCheckoutData(): ICheckoutData {
    return DataLoader.loadJson<ICheckoutData>('checkout/checkout.json');
  }

  // ── Random generators ──────────────────────────────────────────────────────

  static randomEmail(prefix = 'test'): string {
    return `${prefix}_${Date.now()}@example.com`;
  }

  static randomString(length = 8): string {
    return Math.random().toString(36).substring(2, 2 + length);
  }

  static randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static randomPhone(): string {
    return `+1${Array.from({ length: 10 }, () => this.randomInt(0, 9)).join('')}`;
  }
}