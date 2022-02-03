export const getOrderListingKey = (
  order: { [key: string]: any } & {
    companyId?: string;
    vendorId?: string;
    isPreAuctionSale?: boolean;
    listing?: { [key: string]: any } & {
      isPreAuctionSale?: boolean;
    };
  }
) =>
  `${order.companyId ?? order.vendorId}-${
    order.listing?.isPreAuctionSale || order.isPreAuctionSale ? 1 : 0
  }`;
