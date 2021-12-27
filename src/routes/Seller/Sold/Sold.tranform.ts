import moment from 'moment';
import omit from 'ramda/es/omit';
import { GetAllSellerOrder } from 'types/store/GetAllSellerOrdersState';
import { GetSellerOrdersResponseItem } from 'types/store/GetSellerOrdersState';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { formatOrderReferenceNumber } from 'utils/String/formatOrderReferenceNumber';
import { toPrice } from 'utils/String/toPrice';

import { SoldItemData, PendingToShipItemData, SoldItem } from './Sold.props';

const getShipmentMethodLabel = (
  deliveryMethod: string,
  locationName: string | null
) => {
  switch (deliveryMethod) {
    case 'airDeliveryOrders':
      return 'Air Freight: Delivery to Door';
    case 'airPickupOrders':
      return `Air Freight: Drop off at ${locationName}`;
    case 'roadDeliveryOrders':
      return `Dropoff at ${locationName}`;
    case 'roadPickupOrders':
      return `Dropoff at ${locationName}`;
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

const getSalesChannel = (data: GetSellerOrdersResponseItem) => {
  if (data.isMarketRequest) return 'Market Request';
  return data.orderLineItem.some((l) => l.listing.isAquafuture)
    ? 'Aquafuture'
    : data.orderLineItem.some((l) => l.listing.isPreAuction)
    ? 'Pre-Auction'
    : 'Direct Sale';
};

const filterDuplicateGroupings = (items: PendingToShipItemData[]) => {
  const groupings: { [key: string]: PendingToShipItemData } = {};
  for (const group of items) {
    const existingGroup = groupings[group.deliveryMethodLabel];
    if (!existingGroup) {
      groupings[group.deliveryMethodLabel] = group;
    } else {
      groupings[group.deliveryMethodLabel] = {
        ...existingGroup,
        totalPrice: existingGroup.totalPrice + group.totalPrice,
        totalWeight: existingGroup.totalWeight + group.totalWeight,
        orderCount: existingGroup.orderCount + group.orderCount,
        orders: [...existingGroup.orders, ...group.orders],
      };
    }
  }
  return Object.values(groupings);
};

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
        const {
          orders,
          locationName,
          sellerAddress,
          marketAddress,
        } = currentDatum;
        const deliveryMethodLabel = getShipmentMethodLabel(
          current,
          locationName
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
          deliveryAddress: deliveryMethodLabel.includes('Collecting from')
            ? sellerAddress
            : marketAddress,
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
  return filterDuplicateGroupings(pendingItems);
};

export const orderItemToSoldItemData = ({
  date,
  ...data
}: GetAllSellerOrder): { [p: string]: SoldItemData[] } => {
  //@ts-ignore
  const newObj: { [p: string]: ToShipItemData[] } = {};
  for (const [key, value] of Object.entries(data)) {
    for (const data of value) {
      const { orders, locationName, sellerAddress, marketAddress } = data;
      const groupKey = getShipmentMethodLabel(key, locationName);
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
          deliveryAddress: groupKey.includes('Collecting from')
            ? sellerAddress
            : marketAddress,
          id: order.orderId,
          date: moment(order.orderDate).toDate(),
          type:
            order.deliveryOption === 'COLLECT'
              ? 'pickup'
              : order.deliveryMethod.toLowerCase(),
          orderRefNumber: order.orderRefNumber,
          totalPrice: `${toPrice(
            order.orderLineItem.reduce((t, lineItem) => t + lineItem.price, 0)
          )}`,
          totalWeight: `${order.orderLineItem
            .reduce((t, lineItem) => t + lineItem.weight, 0)
            .toFixed(2)} ${formatMeasurementUnit(groupMeasurementUnit)}`,
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
        };
      });

      if (!newObj[groupKey]) {
        newObj[groupKey] = soldOrders;
      } else {
        newObj[groupKey] = [...newObj[groupKey], ...soldOrders];
      }
    }
  }

  return newObj;
};

export const sortByDate = function (a: SoldItem, b: SoldItem) {
  const getTime = (z: string) => {
    return moment(z).toDate().getTime();
  };

  return getTime(b.title) - getTime(a.title);
};
