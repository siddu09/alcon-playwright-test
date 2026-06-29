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

// ─── MyAlcon Individual Order ───────────────────────────────────────────────
export const MYALCON_ORDER_SELECTORS = {
  LOGIN_BUTTON:                     '[data-test="lf-loginBtn"]',
  EMAIL_INPUT:                      'input[name="identifier"]',
  PASSWORD_INPUT:                   'input[name="credentials.passcode"]',
  LOGIN_SUBMIT:                     'button[type="submit"]',
  NEW_ORDER_NAV_BUTTON:             '[data-test="h-NavigateBtnNewOrder"]',
  INDIVIDUAL_ORDER_MENU_ITEM:       'role=menuitem[name="Individual Order"]',
  PRODUCT_CARD_CONTAINER:           '[data-test="pc-ProductCardContainer"]',
  PRODUCT_CARD_TITLE:               '[data-test="pc-CardTitle"]',
  PRODUCT_SELECT_BUTTON:            '[data-test="pc-SelectBtn"]',
  CONFIGURE_PRODUCT_NAME:           '[data-test="product-name"]',
  LEFT_LENS_POWER:                  '[data-test="asf-AttributeNameSelectlefteyelensPower"]',
  LEFT_LENS_CYLINDER:               '[data-test="asf-AttributeNameSelectlefteyelensCylinder"]',
  LEFT_LENS_AXIS:                   '[data-test="asf-AttributeNameSelectlefteyelensAxis"]',
  RIGHT_LENS_POWER:                 '[data-test="asf-AttributeNameSelectrighteyelensPower"]',
  RIGHT_LENS_CYLINDER:              '[data-test="asf-AttributeNameSelectrighteyelensCylinder"]',
  RIGHT_LENS_AXIS:                  '[data-test="asf-AttributeNameSelectrighteyelensAxis"]',
  PACK_SIZE_TRIAL:                  '[data-test="psf-PackSizeChip-5-Trial"]',
  ADD_TO_CART_BUTTON:               '[data-test="od-AddToCartBtn"]',
  MINI_CART_BUTTON:                 '[data-test="mc-IconButton"]',
  CART_PRODUCT_NAME:                '[data-test="product-name"]',
  AUTOCOMPLETE_INPUT:               'input[role="combobox"]',
  AUTOCOMPLETE_OPEN_BUTTON:         'button[aria-label="Open"]',
  AUTOCOMPLETE_OPTIONS:             '[role="option"]',
} as const;