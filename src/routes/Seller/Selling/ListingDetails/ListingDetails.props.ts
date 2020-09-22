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
  };
  orderDetails: {
    price: string;
    minOrder: string;
    remaining: string;
  };
  boxDetails: {
    avgBoxSize: string;
    validUntil: Date;
    catchDate: Date;
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
