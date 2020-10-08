import moment from 'moment';
import { GetSellerOrdersResponseItem } from 'types/store/GetSellerOrdersState';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
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
        onPress: () => null,
        weight: `${lineItem.weight.toFixed(2)} ${formatMeasurementUnit(
          lineItem.listing.measurementUnit
        )}`,
        tags: lineItem.listing.specifications.map((s) => ({ label: s })),
        size: sizeToString(
          lineItem.listing.metricLabel,
          lineItem.listing.sizeFrom || '',
          lineItem.listing.sizeTo || ''
        ),
      }))
    : [];
