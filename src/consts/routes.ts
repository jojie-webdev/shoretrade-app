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
  MARKET_PRICE_DETAIL: (id = ':id') => `${SELLER_ROOT}/market-price/${id}`,
  MARKET_PRICES: `${SELLER_ROOT}/market-prices`,
  SELLING: `${SELLER_ROOT}/selling`,
  SOLD: `${SELLER_ROOT}/sold`,
};

export const SELLER_ACCOUNT_ROUTES = {
  LANDING: `${SELLER_ROUTES.ACCOUNT}`,
  YOUR_DETAILS: `${SELLER_ROUTES.ACCOUNT}/details`,
  SHIPPING_ADDRESS: `${SELLER_ROUTES.ACCOUNT}/shipping-address`,
  EDIT_ADDRESS: `${SELLER_ROUTES.ACCOUNT}/shipping-address/edit-address`,
  CHANGE_PASSWORD: `${SELLER_ROUTES.ACCOUNT}/change-password`,
  ASSISTANTS: `${SELLER_ROUTES.ACCOUNT}/assistants`,
  CREATE_ASSISTANT: `${SELLER_ROUTES.ACCOUNT}/assistants/create-assistant`,
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