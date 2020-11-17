import moment from 'moment';
import groupBy from 'ramda/es/groupBy';
import prop from 'ramda/es/prop';
import reverse from 'ramda/es/reverse';
import sortBy from 'ramda/es/sortBy';
import { GetSellerOrdersResponseItem } from 'types/store/GetSellerOrdersState';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { formatOrderReferenceNumber } from 'utils/String/formatOrderReferenceNumber';
import { toPrice } from 'utils/String/toPrice';

import { SoldItemData, PendingToShipItemData } from './Sold.props';

const groupByDate = groupBy((order: GetSellerOrdersResponseItem) => {
  if (!order.sellerDropOffCutOffTime && order.deliveryMethod === 'AIR') {
    return '0';
  }

  if (
    !order.sellerDropOffCutOffTime &&
    !order.originalExpectedDeliveryDate &&
    !order.latestExpectedDeliveryDate
  ) {
    return '0';
  }

  const deliveryMoment = moment(
    order.sellerDropOffCutOffTime ||
      order.originalExpectedDeliveryDate ||
      order.latestExpectedDeliveryDate
  );

  const momentDateFormat = 'yyyy-MM-DD';

  if (order.deliveryMethod === 'AIR') {
    if (deliveryMoment.hour() < 12) {
      return deliveryMoment.clone().subtract(1, 'day').format(momentDateFormat);
    }
  }

  return deliveryMoment.format(momentDateFormat);
});

const groupByDeliveryMethodAndState = groupBy(
  (order: GetSellerOrdersResponseItem) => {
    if (order.deliveryMethod === 'AIR') {
      return `Air Freight - ${order.toAddress.state}`;
    }
    return `Road Freight - ${order.toAddress.state}`;
  }
);

export const groupToShipOrders = (orders: GetSellerOrdersResponseItem[]) => {
  const groupedOrders = groupByDate(orders);
  return Object.keys(groupedOrders)
    .filter((k) => k !== '0')
    .map((k) => ({
      title: moment(k, 'yyyy-MM-DD').toDate(),
      data: groupedOrders[k],
    }))
    .map((k) => ({
      ...k,
      data: groupByDeliveryMethodAndState(k.data),
    }));
};

const groupByBuyer = groupBy((order: GetSellerOrdersResponseItem) => {
  return order.buyerCompanyId;
});

export const orderItemToPendingToShipItem = (
  data: GetSellerOrdersResponseItem[]
): PendingToShipItemData[] => {
  const groupedData = groupByBuyer(data);
  return Object.keys(groupedData).reduce(
    (accum: PendingToShipItemData[], current: string) => {
      const currentData = groupedData[current];
      const totalWeight = currentData.reduce((accumA: number, currentA) => {
        return (
          accumA +
          currentA.orderLineItem.reduce((accumB: number, currentB) => {
            return accumB + currentB.weight;
          }, 0)
        );
      }, 0);
      const totalPrice = currentData.reduce((accumA: number, currentA) => {
        return (
          accumA +
          currentA.orderLineItem.reduce((accumB: number, currentB) => {
            return accumB + currentB.price;
          }, 0)
        );
      }, 0);

      const computeSubtotalWeight = currentData.map((d) => {
        return {
          ...d,
          itemCount: d.orderLineItem.length,
          totalWeight: d.orderLineItem.reduce((accumA: number, currentA) => {
            return accumA + currentA.weight;
          }, 0),
        };
      });
      return [
        ...accum,
        {
          buyerCompanyId: currentData[0].buyerCompanyId,
          buyerCompanyName: currentData[0].buyerCompanyName,
          orderCount: currentData.length,
          totalWeight,
          totalPrice,
          orders: computeSubtotalWeight,
        },
      ];
    },
    []
  );
};

export const orderItemToSoldItemData = (data: {
  [p: string]: GetSellerOrdersResponseItem[];
}): { [p: string]: SoldItemData[] } => {
  //@ts-ignore
  const newObj: { [p: string]: ToShipItemData[] } = { ...data };

  for (const [key, value] of Object.entries(data)) {
    newObj[key] = value.map((order) => ({
      id: order.orderId,
      date: moment(order.orderDate).toDate(),
      type: order.deliveryMethod.toLowerCase(),
      orderRefNumber: order.orderRefNumber,
      orders: order.orderLineItem.map((lineItem) => ({
        orderNumber: formatOrderReferenceNumber(order.orderRefNumber),
        buyer: order.buyerCompanyName,
        fisherman: lineItem.listing.fishermanFirstName
          ? `${lineItem.listing.fishermanFirstName} ${lineItem.listing.fishermanLastName}`
          : 'N/A',
        uri: lineItem.listing.images[0],
        price: `${toPrice(lineItem.price)}`,
        weight: `${lineItem.weight.toFixed(2)} ${formatMeasurementUnit(
          lineItem.listing.measurementUnit
        )}`,
        name: lineItem.listing.typeName,
        tags: lineItem.listing.specifications.map((s) => ({ label: s })),
        size: sizeToString(
          lineItem.listing.metricLabel,
          lineItem.listing.sizeFrom || '',
          lineItem.listing.sizeTo || ''
        ),
      })),
      toAddressState: order.toAddress.state,
    }));
  }

  return newObj;
};
