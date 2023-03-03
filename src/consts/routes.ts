const SELLER_ROOT = '/seller';
const BUYER_ROOT = '/buyer';

export const MAIN_ROUTES = {
  LANDING: '/',
  LOGIN: '/login',
  VERIFY: '/verify',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/forgot-password/:code',
  AUTHENTICATE: '/authenticate/:token',
};

export const SELLER_ROUTES = {
  ROOT: `${SELLER_ROOT}`,
  LOGIN: `${SELLER_ROOT}/login`,
  REGISTER: `${SELLER_ROOT}/register`,
  FORGOT_PASSWORD: `${SELLER_ROOT}/forgot-password`,
  VERIFY2FA: `${SELLER_ROOT}/verify2fa`,
  ONBOARDING: `${SELLER_ROOT}/onboarding`,
  // Authenticated Routes
  HELP_AND_SUPPORT: `${SELLER_ROOT}/help-and-support`,
  HELP_AND_SUPPORT_CATEGORY_TOPIC_RESOLVER: (topicId = ':topicId') =>
    `${SELLER_ROOT}/help-and-support/${topicId}`,
  HELP_AND_SUPPORT_CATEGORY: (slug = ':slug') =>
    `${SELLER_ROOT}/help-and-support/category/${slug}`,
  HELP_AND_SUPPORT_TOPIC: (topicSlug = ':topicSlug') =>
    `${SELLER_ROOT}/help-and-support/topic/${topicSlug}`,
  HELP_AND_SUPPORT_CATEGORY_TOPIC: (slug = ':slug', topicSlug = ':topicSlug') =>
    `${SELLER_ROOT}/help-and-support/category/${slug}/topic/${topicSlug}`,
  ACCOUNT: `${SELLER_ROOT}/account`,
  ADD_PRODUCT: `${SELLER_ROOT}/add-product`,
  DASHBOARD: `${SELLER_ROOT}/dashboard`,
  MARKET_PRICE_DETAIL: (id = ':id') => `${SELLER_ROOT}/market-prices/${id}`,
  MARKET_DATA: `${SELLER_ROOT}/market-data`,
  SELLING: `${SELLER_ROOT}/selling`,
  SOLD: `${SELLER_ROOT}/sold`,
  BULK_UPLOAD: `${SELLER_ROOT}/bulk-upload`,
  NEGOTIATIONS_AND_REQUESTS: `${SELLER_ROOT}/negotiations-and-requests`,
  CREATES_MANAGEMENT: `${SELLER_ROOT}/creates-management`,
  NOTIFICATIONS: `${SELLER_ROOT}/notifications`,
  NOTIFICATIONS_SETTINGS: `${SELLER_ROOT}/notifications-settings`,
  BARCODE_SCANNER: `${SELLER_ROOT}/barcode-scanner`,
  UPGRADE: `${SELLER_ROOT}/upgrade`,
};

export const SELLER_DASHBOARD_ROUTES = {
  LANDING: SELLER_ROUTES.DASHBOARD,
  CASH_FLOW: (months = ':months', isEarning = ':isEarning') =>
    `${SELLER_ROUTES.DASHBOARD}/cash-flow/${months}/${isEarning}`,
  CATEGORIES: (months = ':months') =>
    `${SELLER_ROUTES.DASHBOARD}/categories/${months}`,
  CATEGORY_DETAIL: (title = ':title', months = ':months', id = ':id') =>
    `${SELLER_ROUTES.DASHBOARD}/categories/${title}/${months}/${id}`,
};

export const SELLER_SOLD_ROUTES = {
  LANDING: `${SELLER_ROUTES.SOLD}`,
  DETAILS: `${SELLER_ROUTES.SOLD}/details/:status/:orderId`,
};

export const SELLING_ROUTES = {
  LANDING: `${SELLER_ROUTES.SELLING}`,
  LISTING_DETAILS: `${SELLER_ROUTES.SELLING}/details/:listingId`,
};

export const ADD_PRODUCT_ROUTES = {
  LANDING: `${SELLER_ROUTES.ADD_PRODUCT}`,
  PREVIEW: `${SELLER_ROUTES.ADD_PRODUCT}/preview`,
  BULK_UPLOAD_PREVIEW: `${SELLER_ROUTES.ADD_PRODUCT}/bulk-upload-preview`,
};

export const SELLER_MARKET_BOARD_ROUTES = {
  LANDING: `${SELLER_ROUTES.NEGOTIATIONS_AND_REQUESTS}`,
  OFFER: `${SELLER_ROUTES.NEGOTIATIONS_AND_REQUESTS}/offer`,
  NEGOTIATE: `${SELLER_ROUTES.NEGOTIATIONS_AND_REQUESTS}/negotiate`,
  NEGOTIATION: `${SELLER_ROUTES.NEGOTIATIONS_AND_REQUESTS}/negotiation`,
};

export const SELLER_MARKET_DATA_ROUTES = {
  LANDING: `${SELLER_ROUTES.MARKET_DATA}`,
  SPECIES: `${SELLER_ROUTES.MARKET_DATA}/species`,
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
  ACCOUNT_COMPLETION: `${SELLER_ROUTES.ACCOUNT}/account-completion`,
  LICENSES: `${SELLER_ROUTES.ACCOUNT}/licenses`,
  ADD_LICENSE: `${SELLER_ROUTES.ACCOUNT}/licenses/add-license`,
  EDIT_LICENSE: `${SELLER_ROUTES.ACCOUNT}/licenses/edit-license`,
  MARKET_INTERESTS: `${SELLER_ROUTES.ACCOUNT}/market-interests`,
  NOTIFICATIONS_SETTINGS: `${SELLER_ROUTES.ACCOUNT}/notifications`,
  SUBSCRIPTION_PLAN: `${SELLER_ROUTES.ACCOUNT}/subscription-plan`,
  PAYMENT_HISTORY: `${SELLER_ROUTES.ACCOUNT}/payment-history`,
  PLAN_PAYMENT_METHOD: `${SELLER_ROUTES.ACCOUNT}/subscription-plan/payment-method`,
  CREDIT_CARD: `${SELLER_ROUTES.ACCOUNT}/bank-details/credit-card`,
  ADD_CREDIT: `${SELLER_ROUTES.ACCOUNT}/bank-details/add-credit`,
};

export const BUYER_ROUTES = {
  ROOT: `${BUYER_ROOT}`,
  LOGIN: `${BUYER_ROOT}/login`,
  REGISTER: `${BUYER_ROOT}/register`,
  FORGOT_PASSWORD: `${BUYER_ROOT}/forgot-password`,
  VERIFY2FA: `${BUYER_ROOT}/verify2fa`,
  ONBOARDING: `${BUYER_ROOT}/onboarding`,
  //Authenticated Routes
  HOME: `${BUYER_ROOT}/home`,
  CATEGORIES: `${BUYER_ROOT}/categories`,
  CHECKOUT: `${BUYER_ROOT}/checkout`,
  SEARCH: `${BUYER_ROOT}/search`,
  PRODUCT_DETAIL: (id = ':id') => `${BUYER_ROOT}/product/${id}`,
  CATEGORY_PRODUCTS: (id = ':id') => `${BUYER_ROOT}/categories/${id}`,
  PRODUCT_PREVIEW: (id = ':id') => `${BUYER_ROOT}/categories/products/${id}`,
  SEARCH_PREVIEW: (id = ':id') => `${BUYER_ROOT}/search/products/${id}`,
  ORDERS: `${BUYER_ROOT}/orders`,
  NEGOTIATIONS_AND_REQUESTS: `${BUYER_ROOT}/negotiations-and-requests`,
  FAVOURITES: `${BUYER_ROOT}/favourites`,
  ACCOUNT: `${BUYER_ROOT}/account`,
  HELP_AND_SUPPORT: `${BUYER_ROOT}/help-and-support`,
  HELP_AND_SUPPORT_CATEGORY: (slug = ':slug') =>
    `${BUYER_ROOT}/help-and-support/category/${slug}`,
  HELP_AND_SUPPORT_CATEGORY_TOPIC_RESOLVER: (topicId = ':topicId') =>
    `${BUYER_ROOT}/help-and-support/${topicId}`,
  HELP_AND_SUPPORT_TOPIC: (topicSlug = ':topicSlug') =>
    `${BUYER_ROOT}/help-and-support/topic/${topicSlug}`,
  HELP_AND_SUPPORT_CATEGORY_TOPIC: (slug = ':slug', topicSlug = ':topicSlug') =>
    `${BUYER_ROOT}/help-and-support/category/${slug}/topic/${topicSlug}`,
  RECENTLY_ADDED: `${BUYER_ROOT}/recently-added`,
  SELLERS: `${BUYER_ROOT}/sellers`,
  FAVOURITE_SELLERS: `${BUYER_ROOT}/favourite-sellers`,
  SELLER_DETAILS: (id = ':id') => `${BUYER_ROOT}/seller-details/${id}`,
  ALL_LISTING: `${BUYER_ROOT}/all-listings`,
  NOTIFICATIONS: `${BUYER_ROOT}/notifications`,
  NOTIFICATIONS_SETTINGS: `${BUYER_ROOT}/notifications-settings`,
  NEGOTIATION_CHECKOUT: (negotiationId = ':negotiationId') =>
    `${BUYER_ROOT}/negotiation-checkout/${negotiationId}`,
  BARCODE_SCANNER: `${BUYER_ROOT}/barcode-scanner`,
  CRATES_MANAGEMENT: `${BUYER_ROOT}/crates-management`,
  UPGRADE: `${BUYER_ROOT}/upgrade`,
};

export const BUYER_MARKET_REQUEST_ROUTES = {
  LANDING: `${BUYER_ROUTES.NEGOTIATIONS_AND_REQUESTS}`,
  MARKET_REQUEST_DETAILS: (id = ':id') =>
    `${BUYER_ROUTES.NEGOTIATIONS_AND_REQUESTS}/details/${id}`,
  CREATE_MARKET_REQUEST: `${BUYER_ROUTES.NEGOTIATIONS_AND_REQUESTS}/create`,
  MARKET_REQUEST_DETAILS_OFFER: (id = ':id', offerId = ':offerId') =>
    `${BUYER_ROUTES.NEGOTIATIONS_AND_REQUESTS}/offer-details/${id}/${offerId}`,
};

export const BUYER_NEGOTIATION_ROUTES = {
  NEGOTIATION_DETAILS: (id = ':id', negoRequestId = ':negoRequestId') =>
    `${BUYER_ROUTES.NEGOTIATIONS_AND_REQUESTS}/negotiation/${id}/${negoRequestId}`,
};

export const BUYER_ACCOUNT_ROUTES = {
  LANDING: `${BUYER_ROUTES.ACCOUNT}`,
  BANK_DETAILS: `${BUYER_ROUTES.ACCOUNT}/bank-details`,
  DETAILS: `${BUYER_ROUTES.ACCOUNT}/details`,
  ADDRESS: `${BUYER_ROUTES.ACCOUNT}/address`,
  ADD_ADDRESS: `${BUYER_ROUTES.ACCOUNT}/address/add`,
  EDIT_ADDRESS: (id = ':id') => `${BUYER_ROUTES.ACCOUNT}/address/${id}`,
  LINKED_ACCOUNTS: `${BUYER_ROUTES.ACCOUNT}/linked-accounts`,
  CHANGE_PASSWORD: `${BUYER_ROUTES.ACCOUNT}/change-password`,
  HELP_AND_SUPPORT: `${BUYER_ROUTES.ACCOUNT}/help-and-support`,
  ADD_ASSISTANT: `${BUYER_ROUTES.ACCOUNT}/assistant/add`,
  EDIT_ASSISTANT: (id = ':id') => `${BUYER_ROUTES.ACCOUNT}/assistant/${id}`,
  ASSISTANT: `${BUYER_ROUTES.ACCOUNT}/assistant`,
  BALANCE_HISTORY: `${BUYER_ROUTES.ACCOUNT}/bank-details/credit-history`,
  PAYMENT_HISTORY: `${BUYER_ROUTES.ACCOUNT}/subscription-plan/payment-history`,
  CREDIT_CARD: `${BUYER_ROUTES.ACCOUNT}/bank-details/credit-card`,
  ADD_CREDIT: `${BUYER_ROUTES.ACCOUNT}/bank-details/add-credit`,
  ACCOUNT_COMPLETION: `${BUYER_ROUTES.ACCOUNT}/account-completion`,
  MARKET_INTERESTS: `${BUYER_ROUTES.ACCOUNT}/market-interests`,
  NOTIFICATIONS_SETTINGS: `${BUYER_ROUTES.ACCOUNT}/notifications`,
  SUBSCRIPTION_PLAN: `${BUYER_ROUTES.ACCOUNT}/subscription-plan`,
  PLAN_PAYMENT_METHOD: `${BUYER_ROUTES.ACCOUNT}/subscription-plan/payment-method`,
};
