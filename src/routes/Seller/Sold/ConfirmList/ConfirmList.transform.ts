import moment from 'moment';
import { GetSellerOrdersResponseItem } from 'types/store/GetSellerOrdersState';
import { toPrice } from 'utils/String/toPrice';

import { PendingItem } from './ConfirmList.props';

export const sellerOrderToConfirmList = (
  order?: GetSellerOrdersResponseItem
): PendingItem[] =>
  order?.orderLineItem
    ? order.orderLineItem.map((lineItem) => ({
        id: lineItem.id,
        name: lineItem.listing.typeName,
        shipping: moment(
          order?.latestExpectedDeliveryDate ||
            order?.originalExpectedDeliveryDate
        ).format('DD MMM YYYY - hh:mm a'),
        uri: lineItem.listing.images[0],
        price: toPrice(lineItem.price),
        weightConfirmed: lineItem.weightConfirmed,
      }))
    : [];
