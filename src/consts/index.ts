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
  BUYER_MARKET_REQUEST_ROUTES,
} from './routes';

export const API = {
  URL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  PDF_URL: process.env.REACT_APP_API_PDF_URL || '',
  VERSION: process.env.REACT_APP_API_VERSION || 'v1',
  VERSION_NEXT: process.env.REACT_APP_API_VERSION_NEXT || 'v2',
  ADMIN_URL: process.env.REACT_APP_ADMIN_URL || 'https://admin.shoretrade.com',
  CONTENTFUL_CONTENT_DELIVERY_API_ACCESS_TOKEN:
    process.env.REACT_APP_PUBLIC_CONTENTFUL_CONTENT_DELIVERY_API_ACCESS_TOKEN ||
    '',
  CONTENTFUL_SPACE_ID: process.env.REACT_APP_PUBLIC_CONTENTFUL_SPACE_ID || '',
  CONTENTFUL_HOST:
    process.env.REACT_APP_PUBLIC_CONTENTFUL_HOST || 'preview.contentful.com',
  CONTENTFUL_ENV: process.env.REACT_APP_CONTENTFUL_ENV || 'master',
};
export const placeholderImage =
  'https://s3-ap-southeast-2.amazonaws.com/shoretrade-prod-assets/No-Image-Placeholder-(Shoretrade).png';
export const STRIPE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY || '';

export const clickAndCollectAddress = 'Sydney Fish Market (Loading Dock 3)';
export const clickAndCollectAddress2 = 'Bank St, Pyrmont NSW';
export const collectAddressShort = 'Sydney Seafood Market';
export const DEFAULT_PAGE_LIMIT = 10;

export const SHORETRADE_HOME = 'https://shoretrade.com';
export const SFM_BLUE_HOME = 'https://www.sfmblue.com.au';
export const SHORETRADE_EMAIL = 'info@shoretrade.com';
