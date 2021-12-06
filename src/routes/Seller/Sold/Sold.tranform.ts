import { collectAddressShort } from 'consts';
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

import { SoldItemData, PendingToShipItemData, SoldItem } from './Sold.props';

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
      order.latestExpectedDeliveryDate ||
      order.originalExpectedDeliveryDate
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
    if (order.deliveryOption === 'COLLECT') {
      return `Pick Up at ${collectAddressShort}`;
    }

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

const groupByDeliveryMethod = groupBy((order: GetSellerOrdersResponseItem) => {
  return order.deliveryMethod;
});

const getDeliveryMethodLabel = (deliveryMethod: string) => {
  switch (deliveryMethod) {
    case 'AIR':
      return 'Air Freight';
    case 'ROAD':
      return 'Road Freight';
    case 'SELLER':
      return 'Pick Up';
    default:
      return 'Deliver Myself';
  }
};

export const orderItemToPendingToShipItem = (
  data: GetSellerOrdersResponseItem[]
): PendingToShipItemData[] => {
  const groupedData = groupByDeliveryMethod(data);
  return Object.keys(groupedData).reduce(
    (accum: PendingToShipItemData[], current: string) => {
      const currentData = groupedData[current];
      const totalWeight = currentData.reduce((accumA: number, currentA) => {
        return (
          accumA +
          currentA.orderLineItem.reduce((accumB: number, currentB) => {
            return (
              accumB +
              currentB.listingBoxes.reduce((accumB: number, currentB) => {
                return accumB + currentB.quantity * currentB.weight;
              }, 0)
            );
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
            return (
              accumA +
              currentA.listingBoxes.reduce((accumB: number, currentB) => {
                return accumB + currentB.quantity * currentB.weight;
              }, 0)
            );
          }, 0),
        };
      });
      return [
        ...accum,
        {
          buyerCompanyId: currentData[0].buyerCompanyId,
          buyerCompanyName: currentData[0].buyerCompanyName,
          deliveryMethod: currentData[0].deliveryMethod,
          deliveryMethodLabel: getDeliveryMethodLabel(
            currentData[0].deliveryMethod
          ),
          buyerId: currentData[0].buyerId, // this is employee id
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
      type:
        order.deliveryOption === 'COLLECT'
          ? 'pickup'
          : order.deliveryMethod.toLowerCase(),
      orderRefNumber: order.orderRefNumber,
      totalPrice: `${toPrice(
        order.orderLineItem.reduce((t, lineItem) => t + lineItem.weight, 0)
      )}`,
      totalWeight: `${order.orderLineItem
        .reduce((t, lineItem) => t + lineItem.price, 0)
        .toFixed(2)} ${formatMeasurementUnit(
        order.orderLineItem[0]?.listing.measurementUnit
      )}`,
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
        totalPrice: `${toPrice(lineItem.price * lineItem.weight)}`,
        name: lineItem.listing.typeName,
        tags: lineItem.listing.specifications.map((s) => ({ label: s })),
        size: sizeToString(
          lineItem.listing.metricLabel,
          lineItem.listing.sizeFrom || '',
          lineItem.listing.sizeTo || ''
        ),
      })),
      toAddressState: order.toAddress.state,
      allowPartialShipment: order.orderLineItem.some((i) => i.weightConfirmed),
      allowFullShipment: order.orderLineItem.every((i) => i.weightConfirmed),
      buyerId: order.buyerId,
      buyerCompanyName: order.buyerCompanyName,
      buyerCompanyId: order.buyerCompanyId,
    }));
  }

  return newObj;
};

export const sortByDate = function (a: SoldItem, b: SoldItem) {
  const getTime = (z: Date) => {
    return moment(z).toDate().getTime();
  };

  return getTime(b.title) - getTime(a.title);
};
