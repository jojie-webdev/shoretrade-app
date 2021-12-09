import { collectAddressShort } from 'consts';
import moment from 'moment';
import groupBy from 'ramda/es/groupBy';
import omit from 'ramda/es/omit';
import { GetAllSellerOrder } from 'types/store/GetAllSellerOrdersState';
import { GetSellerOrdersResponseItem } from 'types/store/GetSellerOrdersState';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { formatOrderReferenceNumber } from 'utils/String/formatOrderReferenceNumber';
import { toPrice } from 'utils/String/toPrice';

import { SoldItemData, PendingToShipItemData, SoldItem } from './Sold.props';

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

export const groupToShipOrders = (groupedOrders: {
  [key: string]: GetSellerOrdersResponseItem[];
}) => {
  return Object.keys(groupedOrders)
    .map((k) => ({
      title: k,
      data: groupedOrders[k],
    }))
    .map((k) => ({
      ...k,
      data: groupByDeliveryMethodAndState(k.data),
    }));
};

const getShipmentMethodLabel = (deliveryMethod: string) => {
  switch (deliveryMethod) {
    case 'airDeliveryOrders':
      return 'Air Freight: Delivery to Door';
    case 'airPickupOrders':
      return 'Air Freight: Pickup at Airport';
    case 'roadDeliveryOrders':
      return 'Road Freight: Delivery to Door';
    case 'roadPickupOrders':
      return 'Pickup from Supplier';
    case 'selfDeliveryOrder':
      return 'Dropoff at Depot';
    default:
      return 'Delivery by Supplier';
  }
};

const getSalesChannel = (data: GetSellerOrdersResponseItem) => {
  return data.orderLineItem.some((l) => l.listing.isAquafuture)
    ? 'Aquafuture'
    : data.orderLineItem.some((l) => l.listing.isPreAuctionSale)
    ? 'Pre-Auction'
    : 'Direct Sale';
};

export const orderItemToPendingToShipItem = (
  data: GetAllSellerOrder[]
): PendingToShipItemData[] => {
  if (data.length === 0) return [];
  const groupedData = omit(['date'], data[0]);
  return Object.keys(groupedData).reduce(
    (accum: PendingToShipItemData[], current: string) => {
      const currentData = groupedData[current];
      if (currentData.length === 0) return accum;
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
          groupName: current,
          buyerCompanyId: currentData[0].buyerCompanyId,
          buyerCompanyName: currentData[0].buyerCompanyName,
          deliveryMethod: currentData[0].deliveryMethod,
          deliveryMethodLabel: getShipmentMethodLabel(current),
          buyerId: currentData[0].buyerId, // this is employee id
          orderCount: currentData.length,
          totalWeight,
          totalPrice,
          orders: computeSubtotalWeight,
          salesChannel: getSalesChannel(currentData[0]),
        },
      ];
    },
    []
  );
};

export const orderItemToSoldItemData = ({
  date,
  ...data
}: GetAllSellerOrder): { [p: string]: SoldItemData[] } => {
  //@ts-ignore
  const newObj: { [p: string]: ToShipItemData[] } = { ...data };
  for (const [key, value] of Object.entries(data)) {
    newObj[key] = value.map((order: GetSellerOrdersResponseItem) => ({
      groupName: key,
      key: getShipmentMethodLabel(key),
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
        id: lineItem.id,
        weightConfirmed: lineItem.weightConfirmed,
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
      salesChannel: getSalesChannel(order),
    }));
  }

  return newObj;
};

export const sortByDate = function (a: SoldItem, b: SoldItem) {
  const getTime = (z: string) => {
    return moment(z).toDate().getTime();
  };

  return getTime(b.title) - getTime(a.title);
};
