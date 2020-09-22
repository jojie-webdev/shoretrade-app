import moment from 'moment';
import pathOr from 'ramda/es/pathOr';
import { GetSellerOrdersResponseItem } from 'types/store/GetSellerOrdersState';
import { sizeToString } from 'utils/Listing';
import { toPrice } from 'utils/String/toPrice';

import { Details } from './Details.props';

const STATUS = {
  PLACED: 'To Send',
  TRANSIT: 'In Transit',
  DELIVERED: 'Delivered',
};

const formatAddress = ({
  streetNumber = '',
  streetName = '',
  suburb = '',
  state = '',
}: Partial<{
  id: string | null;
  unitNumber: string | null;
  level: string | null;
  streetNumber: string | null;
  streetName: string | null;
  suburb: string | null;
  state: string | null;
  postcode: string | null;
  countryCode: string | null;
}>) => `${streetNumber} ${streetName}\n${suburb}\n${state}`;

export const sellerOrderToSoldDetails = (
  order?: GetSellerOrdersResponseItem
): Details => ({
  orderRefNumber: order?.orderRefNumber || 0,
  status: pathOr('N/A', [order?.status || 'N/A'], STATUS),
  shippingDate: moment(
    order?.latestExpectedDeliveryDate || order?.originalExpectedDeliveryDate
  ).format('DD MMM YYYY - hh:mm a'),
  deliveryDate: moment(
    order?.deliveryDate ||
      order?.latestExpectedDeliveryDate ||
      order?.originalExpectedDeliveryDate
  ).format('DD MMM YYYY'),
  orderDate: moment(order?.orderDate).format('DD MMM YYYY'),
  orderedBy: `${order?.buyerEmployeeFirstName} ${order?.buyerEmployeeLastName}`,
  seller: order?.sellerCompanyName || '',
  shippingFrom: formatAddress(order?.fromAddress || {}),
  shippingTo: formatAddress(order?.toAddress || {}),
  packingList: order?.orderLineItem
    ? (order?.orderLineItem).map((lineItem) => ({
        imgSrc: lineItem.listing.images[0],
        name: lineItem.listing.typeName,
        tags: lineItem.listing.specifications.map((s) => ({ label: s })),
        size: sizeToString(
          lineItem.listing.metricLabel,
          lineItem.listing.sizeFrom || '',
          lineItem.listing.sizeTo || ''
        ),
        boxes: lineItem.listingBoxes,
        cost: lineItem.listing.pricePerKilo,
        unit: lineItem.listing.measurementUnit,
      }))
    : [],
  total: toPrice(order?.totalPrice || 0),
});
