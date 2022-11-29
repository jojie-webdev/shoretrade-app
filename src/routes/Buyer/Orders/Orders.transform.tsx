import { ADDITIONAL_INFOS } from 'consts/listingAdditionalInfos';
import moment from 'moment';
import { groupBy } from 'ramda';
import omit from 'ramda/es/omit';
import pathOr from 'ramda/es/pathOr';
import {
  filterDuplicateGroupings,
  formatAddressString,
} from 'routes/Seller/Sold/Sold.tranform';
import {
  GetAllSellerOrder,
  GetAllSellerOrderGroup,
} from 'types/store/GetAllSellerOrdersState';
import { ListingResponseItem } from 'types/store/GetBuyerOrdersState';
import { GetSellerOrdersResponseItem } from 'types/store/GetSellerOrdersState';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { parsePrice } from 'utils/parsePrice';
import { formatOrderReferenceNumber } from 'utils/String/formatOrderReferenceNumber';
import { toPrice } from 'utils/String/toPrice';
import {
  shipmentModeToString,
  deliveryOptionToServiceNameString,
} from 'utils/String/toShipmentDateString';

import {
  DateType,
  OrderItem,
  OrderItemData,
  PendingOrder,
} from './Orders.props';

export const getShipmentOptionString = (
  deliveryMethod: string,
  deliveryOption: string,
  locationName: string,
  sellerCompanyName: string
) => {
  return `${shipmentModeToString(
    deliveryMethod,
    deliveryOption
  )} ${deliveryOptionToServiceNameString(
    deliveryMethod,
    deliveryOption,
    locationName,
    sellerCompanyName
  )}`;
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

const getLocation = (
  suburb: string | null,
  state: string | null,
  countryCode: string | null
) => {
  const haveSuburb = !!suburb && suburb.length > 0;
  const haveState = !!state && state.length > 0;
  const haveCountryCode = !!countryCode && countryCode.length > 0;

  return (
    (haveSuburb ? `${suburb}` : '') +
    (haveSuburb && (haveState || haveCountryCode) ? ', ' : '') +
    (haveState ? `${state}` : '') +
    (haveState && haveCountryCode ? ', ' : '') +
    (haveCountryCode ? `${countryCode}` : '')
  );
};

const getShipmentMethodLabel = (
  deliveryMethod: string,
  locationName: string | null,
  sellerCompanyName: string
) => {
  switch (deliveryMethod) {
    case 'airDeliveryOrders':
      return 'Air Freight: Delivery to Door';
    case 'airPickupOrders':
      return `Air Freight: Pickup at ${locationName}`;
    case 'roadDeliveryOrders':
      return `Road Freight: Delivery to Door`;
    case 'roadPickupOrders':
      return `Pickup at ${locationName}`;
    case 'selfDeliveryOrder':
      return 'Road Freight: Delivery to Door';
    case 'selfPickupOrders':
      return `Pickup from ${sellerCompanyName}`;
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
  const { sellerAddress, orders } = orderGroup;
  const { toAddress } = orders[0];
  const { marketAddress } = orders[0].deliveryInstruction || {};

  switch (deliveryMethod) {
    case 'selfPickupOrders':
      return sellerAddress;
    case 'roadDeliveryOrders':
    case 'selfDeliveryOrder':
      return formatAddressString(toAddress);
    case 'roadPickupOrders':
    case 'airPickupOrders':
      return orderGroup.marketAddress ?? marketAddress;
    default:
      return '';
  }
};

export const orderItemToPendingOrderItem = (
  data: GetAllSellerOrder[]
): PendingOrder[] => {
  if (data.length === 0) return [];
  const groupedData = omit(['date'], data[0]);
  const pendingItems = Object.keys(groupedData).reduce(
    (accum: PendingOrder[], current: string) => {
      const currentData = groupedData[current];
      if (currentData.length === 0) return accum;

      const newOrders: PendingOrder[] = [];
      for (const currentDatum of currentData) {
        const { orders, locationName, sellerAddress } = currentDatum;
        const deliveryMethodLabel = getShipmentMethodLabel(
          current,
          locationName,
          orders[0].sellerCompanyName
        );
        const deliveryAddress = getDeliveryAddress(current, currentDatum);
        newOrders.push({
          groupKey: `${deliveryMethodLabel}-${deliveryAddress}`,
          groupName: current,
          deliveryMethodLabel,
          deliveryMethod: orders[0].deliveryMethod,
          deliveryAddress,
          buyerId: orders[0].buyerId, // this is employee id
          orderCount: orders.length,
          orders: orders.map(transformOrder),
          collectableCount: orders.reduce(
            (accum, o) => accum + (o.status === 'FOR_COLLECTION' ? 1 : 0),
            0
          ),
        });
      }
      return [...accum, ...newOrders];
    },
    []
  );
  // @ts-ignore
  return filterDuplicateGroupings(pendingItems);
};

export const orderItemToOrderItemData = ({
  date,
  ...data
}: GetAllSellerOrder): { [p: string]: OrderItemData[] } => {
  const newObj: { [p: string]: any } = {};
  for (const [key, value] of Object.entries(data)) {
    for (const data of value) {
      const { orders, locationName, sellerAddress } = data;
      const deliveryMethodLabel = getShipmentMethodLabel(
        key,
        locationName,
        orders[0].sellerCompanyName
      );
      const soldOrders = orders.map((order) => {
        const deliveryAddress = getDeliveryAddress(key, data);
        return {
          ...transformOrder(order),
          groupKey: `${deliveryMethodLabel}-${deliveryAddress}`,
          groupName: key,
          deliveryMethod: key,
          deliveryMethodLabel,
          deliveryAddress,
          collectableCount: orders.reduce(
            (accum, o) => accum + (o.status === 'FOR_COLLECTION' ? 1 : 0),
            0
          ),
        };
      });
      if (!newObj[deliveryMethodLabel]) {
        newObj[deliveryMethodLabel] = soldOrders;
      } else if (deliveryMethodLabel === 'Collecting from Yourself') {
        newObj[`${deliveryMethodLabel}-${sellerAddress}`] = soldOrders;
      } else {
        newObj[deliveryMethodLabel] = [
          ...newObj[deliveryMethodLabel],
          ...soldOrders,
        ];
      }
    }
  }
  return newObj;
};

export const transformOrder = (
  orderItem: GetSellerOrdersResponseItem
): OrderItem => {
  const applyTransactionFee = (price: number | string) => {
    return Number(
      (
        +price *
        (1 + (orderItem.transactionValueFeePercentage || 0) / 100)
      ).toFixed(2)
    );
  };

  const getIsGSTIncluded = (orderLineItem: any) => {
    return orderLineItem.listing.isGSTIncluded;
  };

  const totalLineItemPrice = orderItem.orderLineItem.reduce((sum, lineItem) => {
    return sum + lineItem.price;
  }, 0);

  const getTransactionFee = (subTotal: number, isGSTIncluded: boolean) => {
    const parsedSubTotal = isGSTIncluded
      ? parsePrice(Number(subTotal / 1.1))
      : parsePrice(Number(subTotal));
    return parsedSubTotal
      ? Number(
          (
            parsedSubTotal *
            ((orderItem.transactionValueFeePercentage || 0) / 100)
          ).toFixed(2)
        )
      : 0;
  };

  const totalLineItemTransactionFee = orderItem.orderLineItem.reduce(
    (sum, lineItem) => {
      const isGSTIncluded = getIsGSTIncluded(lineItem);
      return sum + getTransactionFee(lineItem.price, isGSTIncluded);
    },
    0
  );

  const totalPrice = toPrice(
    Number(totalLineItemPrice) +
      Number(totalLineItemTransactionFee) +
      orderItem.shippingCost +
      Number(orderItem?.totalCrateFee || 0)
  );

  return {
    id: orderItem.orderId,
    confirmed: orderItem.weightConfirmed,
    data: {
      isPending: orderItem.status === 'PLACED' && !orderItem.weightConfirmed,
      isCollectable: orderItem.status === 'FOR_COLLECTION',
      orderRefNumber: orderItem.orderRefNumber,
      orderNumber: formatOrderReferenceNumber(orderItem.orderRefNumber),
      seller: orderItem.sellerCompanyName,
      orderedBy: `${orderItem.buyerEmployeeFirstName} ${orderItem.buyerEmployeeLastName}`,
      rating: orderItem.rating,
      ratingId: orderItem.ratingId,
      isMarketRequest: orderItem.isMarketRequest,
      detailsProps: orderItem.orderLineItem.map((lineItem) => {
        const unit = formatMeasurementUnit(lineItem.listing.measurementUnit);

        const additionalInfos = ADDITIONAL_INFOS.map((info) => {
          if (lineItem.listing[info.key as keyof ListingResponseItem]) {
            return info.display;
          } else return '';
        }).filter((info) => info !== '');

        return {
          uri: lineItem.listing.images[0],
          name: lineItem.listing.typeName,
          scanHistory: lineItem.scanHistory,
          price: toPrice(lineItem.price),
          tags: additionalInfos
            .map((info) => ({
              label: info,
              type: 'blue',
            }))
            .concat([
              {
                label: lineItem.listing.quality || '',
                type: 'blue',
              },
            ])
            .concat(
              lineItem.listing.specifications.map((label) => ({
                label,
                type: 'plain',
              }))
            )
            .filter((tag) => tag.label !== ''),
          weight:
            lineItem.listingBoxes
              .reduce((accum, current) => {
                return accum + current.quantity * current.weight;
              }, 0)
              .toFixed(2) + ` ${unit}`,
          unit,
          size: sizeToString(
            lineItem.listing.metricLabel,
            lineItem.listing.sizeFrom,
            lineItem.listing.sizeTo
          ),
          location: getLocation(
            lineItem.listing.origin.suburb,
            lineItem.listing.origin.state,
            lineItem.listing.origin.countryCode
          ),
          vendor: orderItem.sellerCompanyName,
          cBorderRadius: '0',
          cBorderWidth: '0',
          pricePerUnit: toPrice(lineItem.listing.pricePerKilo),
        };
      }),
      shippingOption: getShipmentOptionString(
        orderItem.deliveryMethod,
        orderItem.deliveryOption,
        orderItem?.deliveryInstruction?.locationName,
        orderItem?.sellerCompanyName
      ),
      shippingAddress: orderItem.deliveryOption.includes('COLLECT')
        ? orderItem.deliveryMethod.includes('ROAD')
          ? orderItem?.deliveryInstruction?.marketAddress
          : `${orderItem.fromAddress.streetNumber} ${orderItem.fromAddress.streetName}, ${orderItem.fromAddress.suburb}, ${orderItem.fromAddress.state} ${orderItem.fromAddress.postcode}`
        : orderItem?.deliveryInstruction?.marketAddress,
      shippingFrom: `${orderItem.fromAddress.suburb}, ${orderItem.fromAddress.state}`,
      shippingTo: `${orderItem.toAddress.streetNumber} ${orderItem.toAddress.streetName}, ${orderItem.toAddress.suburb}, ${orderItem.toAddress.state}, ${orderItem.toAddress.postcode}`,
      shippingPrice: toPrice(orderItem.shippingCost),
      shippingChargeGst: orderItem.shippingChargeGst,
      shippingChargeNet: orderItem.shippingChargeNet,
      total: totalPrice,
      totalCrateFee: orderItem.totalCrateFee || 0,
      transactionValueFeePercentage: orderItem.transactionValueFeePercentage,
      totalTransactionFee: orderItem.transactionValueFeePercentage
        ? totalLineItemTransactionFee
        : null,
    },

    estCatchmentDate: moment(
      pathOr(
        undefined,
        ['orderLineItem', '0', 'listing', 'catchDate'],
        orderItem
      )
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
    isAquafuture: pathOr(
      false,
      ['orderLineItem', '0', 'listing', 'isAquafuture'],
      orderItem
    ),
    isPartialShipped: orderItem.deliveryInstruction?.isPartialShipped,
  };
};

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

    if (isNaN(date.getTime())) {
      date = moment().add(1, 'day').toDate();
    }

    const currentDate = moment();
    const dateDiff = Math.floor(currentDate.diff(moment(date), 'days', true));
    // 1 -> 1.99
    if (dateDiff === 1) {
      return 'Yesterday';
      // 0 -> 0.99
    } else if (dateDiff === 0) {
      return 'Today';
      // -1 -> -0
    } else if (dateDiff === -1) {
      return 'Tomorrow';
    }

    return moment(date).format(momentDateFormat);
  });

export const sortByDate = function (a: string, b: string) {
  const getTime = (z: string) => {
    if (z === 'Today') {
      return moment().toDate().getTime();
    }

    if (z === 'Tomorrow') {
      return moment().add(1, 'day').toDate().getTime();
    }

    if (z === 'Yesterday') {
      return moment().subtract(1, 'day').toDate().getTime();
    }

    return moment(z, 'MMM. D, YYYY').toDate().getTime();
  };

  return getTime(b) - getTime(a);
};
