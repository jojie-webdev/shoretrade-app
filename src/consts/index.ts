import { MAIN_ROUTES, SELLER_ROUTES, SELLER_ACCOUNT_ROUTES } from './routes';

export const API = {
  URL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  VERSION: process.env.REACT_APP_API_VERSION || 'v1',
};

export const STRIPE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY || '';

export { MAIN_ROUTES, SELLER_ROUTES, SELLER_ACCOUNT_ROUTES };
