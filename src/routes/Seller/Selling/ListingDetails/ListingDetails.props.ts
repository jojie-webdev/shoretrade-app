export interface ListingDetailsPublicProps {
  match: {
    params: {
      listingId: string;
    };
  };
}

export interface ListingProps {
  carousel: {
    items: {
      uri: string;
      tags: { label: string }[];
    }[];
  };
  sales: {
    sales: string;
    soldWeight: string;
    totalWeight: string;
    unit: string;
  };
  productDetails: {
    title: string;
    tags: { label: string }[];
    size: string;
    location: string;
    vendor: {
      uri?: string;
      name?: string;
      rating?: any;
    };
  };
  orderDetails: {
    price: string;
    minOrder: string;
    remaining: string;
    unit: string;
    validUntil: Date;
    catchDate: Date;
  };
  boxDetails: {
    boxes?: {
      id: string;
      weight: number;
      count: number;
      quantity: number;
    }[];
    unit: string;
  };
}

export interface ListingDetailsGeneratedProps {
  listing: ListingProps;
  onRemove?: () => void;
  onCreate?: () => void;
  isExisting?: boolean;
  isPending?: boolean;
}

export interface ListingDetailsProps
  extends ListingDetailsPublicProps,
    ListingDetailsGeneratedProps {}
