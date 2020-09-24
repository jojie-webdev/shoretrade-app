export {
  MAIN_ROUTES,
  SELLER_ROUTES,
  SELLER_ACCOUNT_ROUTES,
  BUYER_ROUTES,
  BUYER_ACCOUNT_ROUTES,
  SELLER_DASHBOARD_ROUTES,
  SELLER_SOLD_ROUTES,
} from './routes';

export const API = {
  URL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  VERSION: process.env.REACT_APP_API_VERSION || 'v1',
};

export const STRIPE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY || '';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const proxyURL = 'https://cors-anywhere.herokuapp.com/';

export const GOOGLE_AUTOCOMPLETE = `${
  isDev ? proxyURL : ''
}https://maps.googleapis.com/maps/api/place/autocomplete/json?`;

export const GOOGLE_PLACE_DETAILS = `${
  isDev ? proxyURL : ''
}https://maps.googleapis.com/maps/api/place/details/json?`;
