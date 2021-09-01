import {
  BUYER_ACCOUNT_ROUTES,
  BUYER_ROUTES,
  SELLER_ACCOUNT_ROUTES,
  SELLER_ROUTES,
} from 'consts';
import { NotificationType, NotifName } from 'types/store/GetNotificationsState';

//TODO will add more once logic/routing is planned
const NOTIF_NAMES: NotifName[] = ['Credit Added'];

/**
 * Handle on click of notif
 * TEMP: use resource as mapping
 */
export function notifURLMapper(
  resource: NotificationType,
  appType?: 'seller' | 'buyer',
  name?: NotifName
): string {
  let url = '';

  if (name && NOTIF_NAMES.includes(name)) {
    if (appType === 'buyer') {
      url = buyerNotifNameToUrl(name);
    }
    return url;
  }

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
    case 'market_requests':
      if (appType === 'seller') {
        url = SELLER_ROUTES.MARKET_BOARD;
        break;
      }
      url = BUYER_ROUTES.MARKET_REQUESTS;
      break;
    case 'market_board':
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

function buyerNotifNameToUrl(name: NotifName): string {
  let url = '';
  switch (name) {
    case 'Credit Added':
      url = BUYER_ACCOUNT_ROUTES.BANK_DETAILS;
      break;
    default:
      url = BUYER_ROUTES.HOME;
      break;
  }

  return url;
}
