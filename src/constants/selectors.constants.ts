/**
 * Centralised selector constants.
 * Replace or extend these with your application-specific selectors.
 * All selectors use data-test attributes for stability.
 */

// ─── Authentication ───────────────────────────────────────────────────────────
export const LOGIN_SELECTORS = {
  USERNAME_INPUT: '[data-test="username"]',
  PASSWORD_INPUT: '[data-test="password"]',
  LOGIN_BUTTON:   '[data-test="login-button"]',
  ERROR_MESSAGE:  '[data-test="error"]',
  WELCOME_BANNER: '.app_logo',
  ERROR_BUTTON:   '[data-test="error-button"]',
} as const;

// ─── Dashboard / Inventory ────────────────────────────────────────────────────
export const DASHBOARD_SELECTORS = {
  PAGE_TITLE:     '.title',
  MENU_BUTTON:    '#react-burger-menu-btn',
  MENU_CLOSE:     '#react-burger-cross-btn',
  LOGOUT_LINK:    '#logout_sidebar_link',
  INVENTORY_LIST: '.inventory_list',
  INVENTORY_ITEM: '.inventory_item',
  ITEM_NAME:      '.inventory_item_name',
  ITEM_PRICE:     '.inventory_item_price',
  ITEM_DESC:      '.inventory_item_desc',
  CART_BADGE:     '.shopping_cart_badge',
  CART_LINK:      '.shopping_cart_link',
  ADD_TO_CART:    '[data-test^="add-to-cart"]',
  REMOVE_ITEM:    '[data-test^="remove"]',
  SORT_DROPDOWN:  '[data-test="product-sort-container"]',
} as const;

// ─── Cart ─────────────────────────────────────────────────────────────────────
export const CART_SELECTORS = {
  CART_ITEM:      '.cart_item',
  ITEM_NAME:      '.inventory_item_name',
  ITEM_PRICE:     '.inventory_item_price',
  ITEM_QUANTITY:  '.cart_quantity',
  CHECKOUT_BTN:   '[data-test="checkout"]',
  CONTINUE_BTN:   '[data-test="continue-shopping"]',
  REMOVE_BTN:     '[data-test^="remove"]',
} as const;

// ─── Checkout ─────────────────────────────────────────────────────────────────
export const CHECKOUT_SELECTORS = {
  FIRST_NAME:     '[data-test="firstName"]',
  LAST_NAME:      '[data-test="lastName"]',
  POSTAL_CODE:    '[data-test="postalCode"]',
  CONTINUE_BTN:   '[data-test="continue"]',
  FINISH_BTN:     '[data-test="finish"]',
  CANCEL_BTN:     '[data-test="cancel"]',
  COMPLETE_HEADER:'.complete-header',
  BACK_HOME_BTN:  '[data-test="back-to-products"]',
} as const;

// ─── Common / Shared ──────────────────────────────────────────────────────────
export const COMMON_SELECTORS = {
  LOADING_SPINNER: '.loading-spinner',
  MODAL_OVERLAY:   '.modal-overlay',
  SUCCESS_MESSAGE: '.success-message',
  ERROR_MESSAGE:   '.error-message',
  TOAST_MESSAGE:   '.toast-message',
} as const;