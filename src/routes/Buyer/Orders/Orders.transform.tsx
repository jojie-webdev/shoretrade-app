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
    date: moment(orderItem.originalExpectedDeliveryDate).toDate(),
    price: totalPrice,
  };
};
