import moment from 'moment';
import omit from 'ramda/es/omit';
import sortBy from 'ramda/es/sortBy';
import { PendingOrder } from 'routes/Buyer/Orders/Orders.props';
import {
  GetAllSellerOrder,
  GetAllSellerOrderGroup,
} from 'types/store/GetAllSellerOrdersState';
import { GetSellerOrdersResponseItem } from 'types/store/GetSellerOrdersState';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { formatOrderReferenceNumber } from 'utils/String/formatOrderReferenceNumber';
import { toPrice } from 'utils/String/toPrice';

import { SoldItemData, PendingToShipItemData, SoldItem } from './Sold.props';

export const getShipmentMethodLabel = (
  deliveryMethod: string,
  locationName: string | null,
  sellerDropOff: string | null
) => {
  switch (deliveryMethod) {
    case 'airDeliveryOrders':
      return 'Air Freight: Delivery to Door';
    case 'airPickupOrders':
      return `Air Freight: Drop off to ${sellerDropOff}`;
    case 'roadDeliveryOrders':
      return `Dropoff at ${locationName}`;
    case 'roadPickupOrders':
      return `Dropoff at ${sellerDropOff ?? locationName}`;
    case 'selfDeliveryOrder':
      return 'Delivering Yourself';
    case 'selfPickupOrders':
      return `Collecting from Yourself`;
    case 'preAuctionOrders':
      return 'Pre-Auction';
    default:
      return 'Others';
  }
};

export const getDeliveryAddress = (
  deliveryMethod: string,
  orderGroup: GetAllSellerOrderGroup
) => {
  const { orders, sellerAddress } = orderGroup;
  const { sellerDropOffAddress, marketAddress } =
    orders[0].deliveryInstruction || {};

  switch (deliveryMethod) {
    case 'selfPickupOrders':
      return sellerDropOffAddress ?? sellerAddress;
    case 'roadPickupOrders':
    case 'airPickupOrders':
      return sellerDropOffAddress;
    case 'roadDeliveryOrders':
      return orderGroup.marketAddress ?? marketAddress;
    default:
      return '';
  }
};

export const formatAddressString = (toAddress: {
  postcode: string;
  state: string;
  streetName: string;
  streetNumber: string;
  suburb: string;
}) => {
  return `${toAddress.streetNumber} ${toAddress.streetName}, ${toAddress.suburb}, ${toAddress.state}, ${toAddress.postcode}`;
};

const getSalesChannel = (data: GetSellerOrdersResponseItem) => {
  if (data.isMarketRequest) return 'Market Request';
  return data.orderLineItem.some((l) => l.listing.isAquafuture)
    ? 'Aquafuture'
    : data.orderLineItem.some((l) => l.listing.isPreAuction)
    ? 'Pre-Auction'
    : 'Direct Sale';
};

export const filterDuplicateGroupings = (
  items: PendingToShipItemData[] | PendingOrder[]
) => {
  const groupings: {
    [key: string]: PendingToShipItemData | PendingOrder;
  } = {};
  for (const group of items) {
    if (group.groupName === 'selfPickupOrders') {
      // @ts-ignore
      groupings[
        `${group.deliveryMethodLabel}-${group.deliveryAddress}`
      ] = group;
    } else {
      const existingGroup = groupings[group.deliveryMethodLabel];
      if (!existingGroup) {
        // @ts-ignore
        groupings[group.deliveryMethodLabel] = group;
      } else {
        groupings[group.deliveryMethodLabel] = {
          ...existingGroup,
          // @ts-ignore
          totalPrice: existingGroup.totalPrice + group.totalPrice,
          // @ts-ignore
          totalWeight: existingGroup.totalWeight + group.totalWeight,
          orderCount: existingGroup.orderCount + group.orderCount,
          // @ts-ignore
          orders: [...existingGroup.orders, ...group.orders],
        };
      }
    }
  }
  return Object.values(groupings);
};

const sortByOrderRef = sortBy(
  (data: { orderRefNumber: number }) => -data.orderRefNumber
);

export const orderItemToPendingToShipItem = (
  data: GetAllSellerOrder[]
): PendingToShipItemData[] => {
  if (data.length === 0) return [];
  const groupedData = omit(['date'], data[0]);
  const pendingItems = Object.keys(groupedData).reduce(
    (accum: PendingToShipItemData[], current: string) => {
      const currentData = groupedData[current];
      if (currentData.length === 0) return accum;

      const newOrders: PendingToShipItemData[] = [];
      for (const currentDatum of currentData) {
        const { orders, locationName, sellerDropOff } = currentDatum;
        const deliveryMethodLabel = getShipmentMethodLabel(
          current,
          locationName,
          sellerDropOff ?? orders[0].deliveryInstruction?.sellerDropOff
        );
        const totalWeight = orders.reduce((accumA: number, currentA) => {
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
        const totalPrice = orders.reduce((accumA: number, currentA) => {
          return (
            accumA +
            currentA.orderLineItem.reduce((accumB: number, currentB) => {
              return accumB + currentB.price;
            }, 0)
          );
        }, 0);
        const computeSubtotalWeight = orders.map((d) => {
          return {
            ...d,
            salesChannel: getSalesChannel(d),
            itemCount: d.orderLineItem.length,
            formattedAddress:
              current === 'selfDeliveryOrder'
                ? formatAddressString(d.toAddress)
                : undefined,
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
        newOrders.push({
          groupName: current,
          buyerCompanyId: orders[0].buyerCompanyId,
          buyerCompanyName: orders[0].buyerCompanyName,
          deliveryMethod: orders[0].deliveryMethod,
          deliveryMethodLabel,
          deliveryAddress: getDeliveryAddress(current, currentDatum),
          buyerId: orders[0].buyerId, // this is employee id
          orderCount: orders.length,
          totalWeight,
          totalPrice,
          orders: computeSubtotalWeight,
        });
      }
      return [...accum, ...newOrders];
    },
    []
  );
  const regroupedItems: any = filterDuplicateGroupings(pendingItems);

  return regroupedItems.map((regroupedItem: any) => ({
    ...regroupedItem,
    orders: sortByOrderRef(regroupedItem.orders),
  }));
};

export const orderItemToSoldItemData = ({
  date,
  ...data
}: GetAllSellerOrder): { [p: string]: SoldItemData[] } => {
  const newObj: { [p: string]: any } = {};
  for (const [key, value] of Object.entries(data)) {
    for (const data of value) {
      const { orders, locationName, sellerAddress, sellerDropOff } = data;
      const groupKey = getShipmentMethodLabel(
        key,
        locationName,
        sellerDropOff ?? orders[0].deliveryInstruction?.sellerDropOff
      );
      const soldOrders = orders.map((order: GetSellerOrdersResponseItem) => {
        const referenceMeasurementUnit =
          order.orderLineItem.length > 0
            ? order.orderLineItem[0].listing.measurementUnit
            : 'kg';
        const groupMeasurementUnit = order.orderLineItem.every(
          (a) => a.listing.measurementUnit === referenceMeasurementUnit
        )
          ? referenceMeasurementUnit
          : 'KG'; // assume KG for mixed units
        return {
          groupName: key,
          key: groupKey,
          deliveryAddress: getDeliveryAddress(key, data),
          id: order.orderId,
          date: moment(order.orderDate).toDate(),
          type:
            order.deliveryOption === 'COLLECT'
              ? 'pickup'
              : order.deliveryMethod.toLowerCase(),
          orderRefNumber: order.orderRefNumber,
          totalPrice: order.orderLineItem.reduce((accumB: number, currentB) => {
            return accumB + currentB.price;
          }, 0),
          totalWeight: order.orderLineItem.reduce(
            (accumB: number, currentB) => {
              return (
                accumB +
                currentB.listingBoxes.reduce((accumB: number, currentB) => {
                  return accumB + currentB.quantity * currentB.weight;
                }, 0)
              );
            },
            0
          ),
          orders: order.orderLineItem.map((lineItem) => {
            const additionalInfos = [];
            if (lineItem.listing.isIkeJime)
              additionalInfos[additionalInfos.length] = 'Ike Jime';

            if (lineItem.listing.isIceSlurry)
              additionalInfos[additionalInfos.length] = 'Ice Slurry';

            if (lineItem.listing.quality)
              additionalInfos[additionalInfos.length] =
                lineItem.listing.quality;

            return {
              id: lineItem.id,
              scanHistory: lineItem.scanHistory,
              weightConfirmed: lineItem.weightConfirmed,
              unit: lineItem.listing.measurementUnit,
              orderNumber: formatOrderReferenceNumber(order.orderRefNumber),
              buyer: order.buyerCompanyName,
              fisherman: lineItem.listing.fishermanFirstName
                ? `${lineItem.listing.fishermanFirstName} ${lineItem.listing.fishermanLastName}`
                : 'N/A',
              uri: lineItem.listing.images[0],
              price: `${toPrice(lineItem.listing.pricePerKilo)}`,
              weight: `${lineItem.weight.toFixed(2)} ${formatMeasurementUnit(
                lineItem.listing.measurementUnit
              )}`,
              totalPrice: `${toPrice(lineItem.price)}`,
              name: lineItem.listing.typeName,
              tags: additionalInfos
                .map((info) => ({
                  label: info,
                  type: 'blue',
                }))
                .concat(
                  lineItem.listing.specifications.map((s) => ({
                    label: s,
                    type: 'plain',
                  }))
                ),
              size: sizeToString(
                lineItem.listing.metricLabel,
                lineItem.listing.sizeFrom || '',
                lineItem.listing.sizeTo || ''
              ),
              formattedAddress:
                key === 'selfDeliveryOrder'
                  ? formatAddressString(order.toAddress)
                  : undefined,
            };
          }),
          toAddressState: order.toAddress.state,
          allowPartialShipment: order.orderLineItem.some(
            (i) => i.weightConfirmed
          ),
          allowFullShipment: order.orderLineItem.every(
            (i) => i.weightConfirmed
          ),
          buyerId: order.buyerId,
          buyerCompanyName: order.buyerCompanyName,
          buyerCompanyId: order.buyerCompanyId,
          salesChannel: getSalesChannel(order),
          groupMeasurementUnit,
        };
      });

      if (!newObj[groupKey]) {
        newObj[groupKey] = soldOrders;
      } else if (groupKey === 'Collecting from Yourself') {
        newObj[`${groupKey}-${sellerAddress}`] = soldOrders;
      } else {
        newObj[groupKey] = [...newObj[groupKey], ...soldOrders];
      }
    }
  }

  const sortedObj = Object.keys(newObj).reduce((accum, key) => {
    const orders = newObj[key];
    const sortedOrders = sortByOrderRef(orders);
    return {
      ...accum,
      [key]: sortedOrders,
    };
  }, {});
  return computeTotalWeightAndPrice(sortedObj);
};

export const computeTotalWeightAndPrice = (newObj: { [p: string]: any }) =>
  Object.keys(newObj).reduce((map, key) => {
    return {
      ...map,
      [key]: newObj[key].map(
        (order: {
          groupMeasurementUnit: string | undefined;
          totalPrice: number;
          totalWeight: number;
        }) => {
          return {
            ...order,
            totalPrice: `${toPrice(order.totalPrice)}`,
            totalWeight: `${newObj[key]
              .reduce(
                (accum: any, o: { totalWeight: any }) => accum + o.totalWeight,
                0
              )
              .toFixed(2)} ${formatMeasurementUnit(
              order.groupMeasurementUnit
            )}`,
          };
        }
      ),
    };
  }, {});

export const sortByDate = function (a: SoldItem, b: SoldItem) {
  const getTime = (z: string) => {
    return moment(z).toDate().getTime();
  };

  return getTime(b.title) - getTime(a.title);
};
