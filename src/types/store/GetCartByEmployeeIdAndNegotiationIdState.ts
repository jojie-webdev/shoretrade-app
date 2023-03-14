export type GetCartByEmployeeIdAndNegotiationIdMeta = {
  employeeId: string;
  negoRequestId: string;
};

export type GetCartListingDataItem = {
  id: string;
  type: string;
  fisherman: { id: string; name: string };
  metric: string;
  sizeFrom: string;
  sizeTo: string;
  price: string;
  origin: { state: string; suburb: string; countryCode: string };
  caught?: string; // yyyy-mm-dd
  ends?: string;
  catchRecurrence?: string;
  specifications: string; // ['Live', 'Wild', 'Whole'];
  image: string;
  minimumOrder: string; // '1.0'
  sellInMultiplesOf: boolean;
  remaining: number;
  average: number;
  isAquafuture: boolean;
  isPreAuctionSale: boolean;
  auctionDate: string;
  allowedWeightAdjustment: number;
  address: {
    id: string;
    streetNumber: string;
    streetName: string;
    suburb: string;
    state: string;
    postcode: string;
    countryCode: string;
  };
  measurementUnit: string;
  packagingId: string | null;
  isIkeJime?: boolean;
  isIceSlurry?: boolean;
  quality?: string;
  isGSTIncluded: boolean;
};

export type GetCartDataItem = {
  cartItemId?: string;
  companyName: string; // Seller
  companyId: string; // Seller
  crateFee?: number;
  isFreeShipping: boolean;
  listing: GetCartListingDataItem;
  orderBoxes: {
    id: string;
    weight: number;
    quantity: number;
    count: number;
  }[];
  subTotal: number;
  weight: number;
};

export type NegotiationItem = {
  approved_at: string;
  buyer_id: string;
  company_id: string;
  counter_offer: string;
  created_at: string;
  desired_quantity: number;
  id: string;
  listing_box_id: string;
  listing_id: string;
  parent_negotiation_request_id: string | null;
  status: string;
  updated_at: string;
};

export type GetCartData = {
  id: string;
  lastModified: string; // iso date string
  // items: Record<string, GetCartDataItem | NegotiationItem>;
  items: Record<string, GetCartDataItem>;
  timer: {
    expiry: number;
    warning: number;
  };
};

export type GetCartByEmployeeIdAndNegotiationIdPayload = {
  message: string;
  data: null | GetCartData;
};
