export {
  MAIN_ROUTES,
  SELLER_ROUTES,
  SELLER_ACCOUNT_ROUTES,
  BUYER_ROUTES,
  BUYER_ACCOUNT_ROUTES,
  SELLER_DASHBOARD_ROUTES,
  SELLER_SOLD_ROUTES,
  SELLING_ROUTES,
  ADD_PRODUCT_ROUTES,
} from './routes';

export const API = {
  URL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  VERSION: process.env.REACT_APP_API_VERSION || 'v1',
};
export const placeholderImage =
  'https://s3-ap-southeast-2.amazonaws.com/shoretrade-prod-assets/No-Image-Placeholder-(blue).png';
export const STRIPE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY || '';

export const clickAndCollectAddress = 'Sydney Fish Market (Loading Dock 3)';
export const clickAndCollectAddress2 = 'Bank St, Pyrmont NSW';
export const collectAddressShort = 'Sydney Seafood Market';
export const DEFAULT_PAGE_LIMIT = 10;
