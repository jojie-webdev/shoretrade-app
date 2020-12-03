import moment from 'moment';
import { groupBy } from 'ramda';
import { GetBuyerOrdersResponseItem } from 'types/store/GetBuyerOrdersState';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { formatOrderReferenceNumber } from 'utils/String/formatOrderReferenceNumber';
import { toPrice } from 'utils/String/toPrice';

import { DateType, OrderItem } from './Orders.props';

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
    Number(orderItem.totalPrice) + orderItem.shippingCost
  );

  return {
    id: orderItem.orderId,
    confirmed: orderItem.weightConfirmed,
    data: {
      orderRefNumber: orderItem.orderRefNumber,
      orderNumber: formatOrderReferenceNumber(orderItem.orderRefNumber),
      seller: orderItem.sellerCompanyName,
      orderedBy: `${orderItem.buyerEmployeeFirstName} ${orderItem.buyerEmployeeLastName}`,
      detailsProps: orderItem.orderLineItem.map((lineItem) => ({
        uri: lineItem.listing.images[0],
        name: lineItem.listing.typeName,
        price: toPrice(lineItem.price),
        tags: lineItem.listing.specifications.map((label) => ({ label })),
        weight: lineItem.listingBoxes
          .reduce((accum, current) => {
            return accum + current.quantity * current.weight;
          }, 0)
          .toFixed(2),
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
      shippingFrom: `${orderItem.fromAddress.suburb}, ${orderItem.fromAddress.state}`,
      shippingTo: `${orderItem.toAddress.streetNumber} ${orderItem.toAddress.streetName}, ${orderItem.toAddress.suburb}, ${orderItem.toAddress.state}, ${orderItem.toAddress.postcode}`,
      shippingPrice: toPrice(orderItem.shippingCost),
      shippingChargeGst: orderItem.shippingChargeGst,
      shippingChargeNet: orderItem.shippingChargeNet,
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

const isToday = (date: Date) => moment(date).isSame(moment(), 'day');
const isTomorrow = (date: Date) =>
  moment(date).isSame(moment().add(1, 'day'), 'day');

export const groupByDate = (dateType: DateType) =>
  groupBy((order: OrderItem) => {
    const momentDateFormat = 'MMM. D, YYYY';

    let date;

    if (dateType === 'estCatchmentDate') {
      date = order.isAquafuture
        ? order.estCatchmentDate
        : order.estDeliveryDate;
    } else {
      date = order[dateType];
    }

    if (isToday(date)) {
      return 'Today';
    }

    if (isTomorrow(date)) {
      return 'Tomorrow';
    }

    return moment(date).format(momentDateFormat);
  });

export const sortByDateAsc = (orders: OrderItem[], dateType: DateType) =>
  orders.sort((a, b) => {
    let date1, date2;

    if (dateType === 'estCatchmentDate') {
      date1 = a.isAquafuture ? a.estCatchmentDate : a.estDeliveryDate;
      date2 = b.isAquafuture ? b.estCatchmentDate : b.estDeliveryDate;
    } else {
      date1 = a[dateType];
      date2 = b[dateType];
    }

    return date1.getTime() - date2.getTime();
  });
