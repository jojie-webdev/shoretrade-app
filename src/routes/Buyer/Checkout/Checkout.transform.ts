import groupBy from 'ramda/es/groupBy';
import { GetCartDataItem } from 'types/store/GetCartState';
import { OrderCartItem } from 'types/store/OrderState';
import { getOrderListingKey } from 'utils/getOrderListingKey';

import { OrderItem } from './Checkout.props';

export const cartItemsToPayload = (
  cartItems: GetCartDataItem[],
  selectedShipping: Record<string, any>
): OrderCartItem[][] => {
  const groupCartItemByCompany = groupBy((item: GetCartDataItem) =>
    getOrderListingKey(item)
  );
  const groupedCartItems = groupCartItemByCompany(cartItems);
  const payload = Object.keys(groupedCartItems).reduce(
    (orderData: OrderCartItem[][], companyId) => {
      const companySpecificOrder = groupedCartItems[companyId].map((item) => {
        return {
          ...item,
          shipping: {
            ...selectedShipping[getOrderListingKey(item)],
            expDelDate: item.listing.isPreAuctionSale
              ? item.listing.auctionDate
              : selectedShipping.expDelDate,
          },
        };
      });
      return [...orderData, companySpecificOrder];
    },
    []
  );

  return payload;
};

// export const computePriceOrderItem = OrderItem

export const simplifyOrderObj = (
  groupedOrders: Record<string, OrderItem[]>
) => {
  const orders = Object.keys(groupedOrders).reduce(
    (
      data: {
        id: string;
        isFreeShipping: boolean;
        listings: OrderItem[];
        totalCrateFee: number;
      }[],
      vendorId
    ) => [
      ...data,
      {
        id: vendorId,
        isFreeShipping: groupedOrders[vendorId][0].isFreeShipping,
        listings: groupedOrders[vendorId],
        totalCrateFee: groupedOrders[vendorId].reduce(
          (totalFee, listing) => totalFee + Number(listing.crateFee || 0),
          0
        ),
        transactionFeeTotal: groupedOrders[vendorId].reduce(
          (totalFee, listing) => totalFee + Number(listing.transactionFee || 0),
          0
        ),
      },
    ],
    []
  );

  return orders;
};
