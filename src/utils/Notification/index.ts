import {
  BUYER_ACCOUNT_ROUTES,
  BUYER_ROUTES,
  SELLER_ACCOUNT_ROUTES,
  SELLER_ROUTES,
} from 'consts';
import { NotificationType } from 'types/store/GetNotificationsState';

/**
 * Handle on click of notif
 * TEMP: use resource as mapping
 */
export function notifResourceToURLMapper(
  resource: NotificationType,
  appType?: 'seller' | 'buyer'
): string {
  let url = '';
  const resource_ = resource.toLocaleLowerCase();
  switch (resource_) {
    case 'account':
      if (appType === 'seller') {
        url = SELLER_ACCOUNT_ROUTES.LANDING;
        break;
      }
      url = BUYER_ACCOUNT_ROUTES.LANDING;
      break;
    case 'cart':
      url = BUYER_ROUTES.CHECKOUT;
      break;
    case 'listings':
      if (appType === 'seller') {
        url = SELLER_ROUTES.SELLING;
        break;
      }
      url = BUYER_ROUTES.ALL_LISTING;
      break;
    case 'market-requests':
      if (appType === 'seller') {
        url = SELLER_ROUTES.MARKET_BOARD;
        break;
      }
      url = BUYER_ROUTES.MARKET_REQUESTS;
      break;
    case 'ordering':
      if (appType === 'seller') {
        url = SELLER_ROUTES.SOLD;
        break;
      }
      url = BUYER_ROUTES.ORDERS;
      break;
    case 'orders':
      if (appType === 'seller') {
        url = SELLER_ROUTES.SOLD;
        break;
      }
      url = BUYER_ROUTES.ORDERS;
      break;
    case 'rating-favourite':
      url = BUYER_ROUTES.HOME;
      break;
    default:
      if (appType === 'seller') {
        url = SELLER_ROUTES.DASHBOARD;
        break;
      }
      url = BUYER_ROUTES.HOME;
      break;
  }
  return url;
}
