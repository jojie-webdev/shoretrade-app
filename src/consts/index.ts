export {
  MAIN_ROUTES,
  SELLER_ROUTES,
  SELLER_ACCOUNT_ROUTES,
  BUYER_ROUTES,
  SELLER_DASHBOARD_ROUTES,
} from './routes';

export const API = {
  URL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  VERSION: process.env.REACT_APP_API_VERSION || 'v1',
};

export const STRIPE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY || '';

export const GOOGLE_AUTOCOMPLETE =
  'https://maps.googleapis.com/maps/api/place/autocomplete/json?';

export const GOOGLE_PLACE_DETAILS =
  'https://maps.googleapis.com/maps/api/place/details/json?';
