export const MAIN_ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ONBOARDING: '/onboarding',
};

const SELLER_ROOT = '/seller';
export const SELLER_ROUTES = {
  ROOT: `${SELLER_ROOT}`,
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
  CHANGE_PASSWORD: `${SELLER_ROUTES.ACCOUNT}/change-password`,
  ASSISTANTS: `${SELLER_ROUTES.ACCOUNT}/assistants`,
  BANK_DETAILS: `${SELLER_ROUTES.ACCOUNT}/bank-details`,
  HELP_AND_SUPPORT: `${SELLER_ROUTES.ACCOUNT}/help-and-support`,
};
