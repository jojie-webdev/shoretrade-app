import moment from 'moment';
import { GetBuyerOrdersResponseItem } from 'types/store/GetBuyerOrdersState';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { formatOrderReferenceNumber } from 'utils/String/formatOrderReferenceNumber';
import { toPrice } from 'utils/String/toPrice';

import { OrderItem } from './Orders.props';

export const getShipmentOptionString = (
  deliveryMethod: string,
  deliveryOption: string
) => {
  return `${deliveryMethod === 'AIR' ? 'Air freight' : 'Road freight'} ${
    deliveryOption !== 'DOOR' ? 'pickup at airport' : 'delivery to door'
  }`;
};

const getDeliveredDate = (
  delivered: string | null,
  latest: string | null,
  original: string | null
) => {
  if (delivered != null) return delivered;
  if (latest != null) return latest;
  if (original != null) return original;
};

export const transformOrder = (
  orderItem: GetBuyerOrdersResponseItem
): OrderItem => {
  const totalPrice = toPrice(
    Number(orderItem.totalPrice) + orderItem.shippingCost,
    false
  );
  return {
    id: orderItem.orderId,
    confirmed: orderItem.weightConfirmed,
    data: {
      orderNumber: formatOrderReferenceNumber(orderItem.orderRefNumber),
      seller: orderItem.sellerCompanyName,
      orderedBy: `${orderItem.buyerEmployeeFirstName} ${orderItem.buyerEmployeeLastName}`,
      detailsProps: orderItem.orderLineItem.map((lineItem) => ({
        uri: lineItem.listing.images[0],
        name: lineItem.listing.typeName,
        price: toPrice(lineItem.price, false),
        tags: lineItem.listing.specifications.map((label) => ({ label })),
        weight: lineItem.weight.toFixed(2),
        unit: formatMeasurementUnit(lineItem.listing.measurementUnit),
        size: sizeToString(
          lineItem.listing.metricLabel,
          lineItem.listing.sizeFrom,
          lineItem.listing.sizeTo
        ),
        location: lineItem.listing.origin.suburb,
        vendor: orderItem.sellerCompanyName,
        cBorderRadius: '0',
        cBorderWidth: '0',
      })),
      shippingOption: getShipmentOptionString(
        orderItem.deliveryMethod,
        orderItem.deliveryOption
      ),
      shippingPrice: toPrice(orderItem.shippingCost, false),
      total: totalPrice,
    },
    estCatchmentDate: moment(
      orderItem.orderLineItem[0].listing.catchDate
    ).toDate(),
    estDeliveryDate: moment(
      orderItem.latestExpectedDeliveryDate != null
        ? orderItem.latestExpectedDeliveryDate
        : orderItem.originalExpectedDeliveryDate
    ).toDate(), //original_expected_delivery_date --> from database
    deliveredDate: moment(
      getDeliveredDate(
        orderItem.deliveryDate,
        orderItem.latestExpectedDeliveryDate,
        orderItem.originalExpectedDeliveryDate
      )
    ).toDate(), // date_delivered --> from database
    price: totalPrice,
    isAquafuture: orderItem.orderLineItem[0].listing.isAquafuture,
  };
};
