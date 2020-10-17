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

import {
  ToShipItemData,
  InTransitItemData,
  DeliveredItemData,
  PendingToShipItemData,
} from './Sold.props';

const sortByTitle = sortBy(prop('title'));

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

const groupByToAddressState = groupBy(
  (order: GetSellerOrdersResponseItem) => order.toAddress.state
);

const groupByDeliveryMethod = groupBy((order: GetSellerOrdersResponseItem) => {
  if (order.deliveryMethod === 'AIR') {
    return 'Air Freight';
  }
  return 'Road Freight';
});

export const groupToShipOrders = (orders: GetSellerOrdersResponseItem[]) => {
  const groupedOrders = groupByDate(orders);
  return Object.keys(groupedOrders)
    .filter((k) => k !== '0')
    .map((k) => ({
      title: moment(k, 'yyyy-MM-DD').toDate(),
      data: groupedOrders[k],
    }));
};

export const orderItemToPendingToShipItem = (
  data: GetSellerOrdersResponseItem[]
): PendingToShipItemData[] => {
  return data.map((order) => ({
    id: order.orderId,
    orderNumber: formatOrderReferenceNumber(order.orderRefNumber),
    numberOfOrders: order.orderLineItem.length,
    total: order.totalPrice,
    buyerCompanyName: order.buyerCompanyName,
    orderImage: order.orderLineItem[0].listing.images[0],
    toAddressState: order.toAddress.state,
    type: order.deliveryMethod.toLowerCase(),
  }));
};

export const orderItemToToShipItemData = (
  data: GetSellerOrdersResponseItem[]
): ToShipItemData[] => {
  console.log(data[0].status);

  return data.map((order) => ({
    id: order.orderId,
    date: moment(order.orderDate).toDate(),
    type: order.deliveryMethod.toLowerCase(),
    orderRefNumber: order.orderRefNumber,
    orders: order.orderLineItem.map((lineItem) => ({
      orderNumber: formatOrderReferenceNumber(order.orderRefNumber),
      buyer: order.buyerCompanyName,
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
  }));
};

export const groupInTransitOrders = (orders: GetSellerOrdersResponseItem[]) => {
  const groupedByState = groupByToAddressState(orders);
  const nestedGrouping = Object.keys(groupedByState)
    .filter((key) => key !== '0')
    .map((key) => {
      return {
        key,
        data: groupedByState[key],
      };
    })
    .map((group) => {
      const regrouped = groupByDeliveryMethod(group.data);
      return {
        state: group.key,
        deliveryMethod: regrouped,
      };
    });

  return nestedGrouping;
};

export const orderItemToInTransitItemData = (
  data: GetSellerOrdersResponseItem[]
): InTransitItemData[] => {
  return data.map((order) => ({
    id: order.orderId,
    date: moment(
      order.latestExpectedDeliveryDate || order.originalExpectedDeliveryDate
    ).toDate(),
    amount: toPrice(order.totalPrice, false),
    type: order.deliveryMethod.toLowerCase(),
    buyer: `${order.buyerEmployeeFirstName} ${order.buyerEmployeeLastName}`,
    orderRefNumber: order.orderRefNumber,
  }));
};

export const groupDeliveredOrders = (orders: GetSellerOrdersResponseItem[]) => {
  const groupedOrders = groupByDate(orders);
  const result = Object.keys(groupedOrders)
    .filter((k) => k !== '0')
    .map((k) => ({
      title: moment(k, 'yyyy-MM-DD').toDate(),
      data: groupedOrders[k],
    }));

  return reverse(sortByTitle(result));
};

export const orderItemToDeliveredItemData = (
  data: GetSellerOrdersResponseItem[]
): DeliveredItemData[] => {
  return data.map((order) => ({
    id: order.orderId,
    date: moment(
      order.deliveryDate ||
        order.latestExpectedDeliveryDate ||
        order.originalExpectedDeliveryDate
    ).toDate(),
    amount: toPrice(order.totalPrice, false),
    type: order.deliveryMethod.toLowerCase(),
    buyer: `${order.buyerEmployeeFirstName} ${order.buyerEmployeeLastName}`,
    orderRefNumber: order.orderRefNumber,
  }));
};
