const SELLER_ROOT = '/seller';
const BUYER_ROOT = '/buyer';

export const MAIN_ROUTES = {
  LANDING: '/',
};

export const SELLER_ROUTES = {
  ROOT: `${SELLER_ROOT}`,
  LOGIN: `${SELLER_ROOT}/login`,
  REGISTER: `${SELLER_ROOT}/register`,
  FORGOT_PASSWORD: `${SELLER_ROOT}/forgot-password`,
  VERIFY2FA: `${SELLER_ROOT}/verify2fa`,
  ONBOARDING: `${SELLER_ROOT}/onboarding`,
  // Authenticated Routes
  ACCOUNT: `${SELLER_ROOT}/account`,
  ADD_PRODUCT: `${SELLER_ROOT}/add-product`,
  DASHBOARD: `${SELLER_ROOT}/dashboard`,
  MARKET_PRICE_DETAIL: (id = ':id') => `${SELLER_ROOT}/market-prices/${id}`,
  MARKET_PRICES: `${SELLER_ROOT}/market-prices`,
  SELLING: `${SELLER_ROOT}/selling`,
  SOLD: `${SELLER_ROOT}/sold`,
};

export const SELLER_DASHBOARD_ROUTES = {
  LANDING: SELLER_ROUTES.DASHBOARD,
  CASH_FLOW: (months = ':months') =>
    `${SELLER_ROUTES.DASHBOARD}/cash-flow/${months}`,
  CATEGORIES: (months = ':months') =>
    `${SELLER_ROUTES.DASHBOARD}/categories/${months}`,
  CATEGORY_DETAIL: (title = ':title', months = ':months', id = ':id') =>
    `${SELLER_ROUTES.DASHBOARD}/categories/${title}/${months}/${id}`,
};

export const SELLER_SOLD_ROUTES = {
  LANDING: `${SELLER_ROUTES.SOLD}`,
  CONFIRM_LIST: `${SELLER_ROUTES.SOLD}/confirm-list/:orderId`,
  CONFIRM: `${SELLER_ROUTES.SOLD}/confirm-list/:orderId/:id`,
};

export const SELLER_ACCOUNT_ROUTES = {
  LANDING: `${SELLER_ROUTES.ACCOUNT}`,
  YOUR_DETAILS: `${SELLER_ROUTES.ACCOUNT}/details`,
  SHIPPING_ADDRESS: `${SELLER_ROUTES.ACCOUNT}/shipping-address`,
  EDIT_ADDRESS: `${SELLER_ROUTES.ACCOUNT}/shipping-address/edit-address`,
  CHANGE_PASSWORD: `${SELLER_ROUTES.ACCOUNT}/change-password`,
  ASSISTANTS: `${SELLER_ROUTES.ACCOUNT}/assistants`,
  CREATE_ASSISTANT: `${SELLER_ROUTES.ACCOUNT}/assistants/create-assistant`,
  EDIT_ASSISTANT: (assitantId = ':assistantId') =>
    `${SELLER_ROUTES.ACCOUNT}/assistants/${assitantId}`,
  BANK_DETAILS: `${SELLER_ROUTES.ACCOUNT}/bank-details`,
  HELP_AND_SUPPORT: `${SELLER_ROUTES.ACCOUNT}/help-and-support`,
};

export const BUYER_ROUTES = {
  ROOT: `${BUYER_ROOT}`,
  LOGIN: `${BUYER_ROOT}/login`,
  REGISTER: `${BUYER_ROOT}/register`,
  FORGOT_PASSWORD: `${BUYER_ROOT}/forgot-password`,
  VERIFY2FA: `${BUYER_ROOT}/verify2fa`,
  ONBOARDING: `${BUYER_ROOT}/onboarding`,
};
