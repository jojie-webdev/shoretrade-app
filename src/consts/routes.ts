const SELLER_ROOT = '/seller';
const BUYER_ROOT = '/buyer';

export const MAIN_ROUTES = {
  LANDING: '/',
  LOGIN: '/login',
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
  CONFIRM_LIST: `${SELLER_ROUTES.SOLD}/confirm/:orderId`,
  CONFIRM: `${SELLER_ROUTES.SOLD}/confirm/:orderId/:lineItemId`,
  DETAILS: `${SELLER_ROUTES.SOLD}/details/:status/:orderId`,
};

export const SELLING_ROUTES = {
  LANDING: `${SELLER_ROUTES.SELLING}`,
  LISTING_DETAILS: `${SELLER_ROUTES.SELLING}/details/:listingId`,
};

export const SELLER_ACCOUNT_ROUTES = {
  LANDING: `${SELLER_ROUTES.ACCOUNT}`,
  YOUR_DETAILS: `${SELLER_ROUTES.ACCOUNT}/details`,
  SHIPPING_ADDRESS: `${SELLER_ROUTES.ACCOUNT}/shipping-address`,
  EDIT_ADDRESS: `${SELLER_ROUTES.ACCOUNT}/shipping-address/edit-address`,
  CREATE_ADDRESS: `${SELLER_ROUTES.ACCOUNT}/shipping-address/create-address`,
  CHANGE_PASSWORD: `${SELLER_ROUTES.ACCOUNT}/change-password`,
  CREATE_ASSISTANT: `${SELLER_ROUTES.ACCOUNT}/create-assistant`,
  ASSISTANTS: `${SELLER_ROUTES.ACCOUNT}/assistants`,
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
  //Authenticated Routes
  CATEGORIES: `${BUYER_ROOT}/categories`,
  CHECKOUT: `${BUYER_ROOT}/checkout`,
  CATEGORY_PRODUCTS: (id = ':id') => `${BUYER_ROOT}/categories/${id}`,
  PRODUCT_PREVIEW: (id = ':id') => `${BUYER_ROOT}/categories/products/${id}`,
  SEARCH_PREVIEW: (id = ':id') => `${BUYER_ROOT}/search/products/${id}`,
  ORDERS: `${BUYER_ROOT}/orders`,
  FAVOURITES: `${BUYER_ROOT}/favourites`,
  ACCOUNT: `${BUYER_ROOT}/account`,
};

export const BUYER_ACCOUNT_ROUTES = {
  LANDING: `${BUYER_ROUTES.ACCOUNT}`,
  BANK_DETAILS: `${BUYER_ROUTES.ACCOUNT}/bank-details`,
  DETAILS: `${BUYER_ROUTES.ACCOUNT}/details`,
  DELIVERY: `${BUYER_ROUTES.ACCOUNT}/delivery-address`,
  LINKED_ACCOUNTS: `${BUYER_ROUTES.ACCOUNT}/linked-accounts`,
  CHANGE_PASSWORD: `${BUYER_ROUTES.ACCOUNT}/change-password`,
  HELP: `${BUYER_ROUTES.ACCOUNT}/help`,
  ASSISTANT: `${BUYER_ROUTES.ACCOUNT}/assistant`,
  CREDIT_HISORY: `${BUYER_ROUTES.ACCOUNT}/bank-details/credit-history`,
  CREDIT_CARD: `${BUYER_ROUTES.ACCOUNT}/bank-details/credit-card`,
  ADD_CREDIT: `${BUYER_ROUTES.ACCOUNT}/bank-details/add-credit`,
};
