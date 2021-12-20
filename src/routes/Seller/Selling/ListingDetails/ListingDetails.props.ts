export interface ListingDetailsPublicProps {
  match?: {
    params: {
      listingId: string;
    };
  };
}

export type TagTypes = 'plain' | 'blue';

export interface ListingProps {
  carousel: {
    items: {
      uri?: string;
      data?: {
        name: string;
        type: string;
        data: string | ArrayBuffer | null;
      };
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
    tags: {
      label: string;
      type?: string | TagTypes;
    }[];
    size: string;
    location: string;
    vendor: {
      uri?: string;
      name?: string;
      rating?: any;
    };
    avgBoxSize: string;
  };
  orderDetails: {
    price: string;
    minOrder: string;
    remaining: string;
    unit: string;
    validUntil?: string;
    catchDate?: Date;
    catchRecurrence?: string;
  };
  boxDetails: {
    boxes?: {
      weight: number;
      count?: number | null;
      quantity: number;
    }[];
    unit: string;
  };
}

export interface ListingDetailsGeneratedProps {
  listing: ListingProps;
  onRemove?: () => void;
  onEdit?: () => void;
  onCreate?: () => void;
  isExisting?: boolean;
  isPending?: boolean;
  sellingDetailsBreadCrumbs?: any[];
  isCreatListingSuccess?: boolean;
  clearListing?: () => void;
}

export interface ListingDetailsProps
  extends ListingDetailsPublicProps,
    ListingDetailsGeneratedProps {}
