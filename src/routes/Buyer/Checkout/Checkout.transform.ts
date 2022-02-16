import groupBy from 'ramda/es/groupBy';
import { GetCartDataItem } from 'types/store/GetCartState';
import { OrderCartItem, OrderShipping } from 'types/store/OrderState';
import { getOrderListingKey } from 'utils/getOrderListingKey';

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
      const companySpecificOrder = groupedCartItems[companyId].map((item) => ({
        ...item,
        shipping: {
          ...selectedShipping[getOrderListingKey(item)],
          expDelDate: item.listing.isPreAuctionSale
            ? item.listing.auctionDate
            : selectedShipping.expDelDate,
        },
      }));
      return [...orderData, companySpecificOrder];
    },
    []
  );

  return payload;
};
