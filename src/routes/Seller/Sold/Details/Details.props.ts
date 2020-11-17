export type Details = {
  orderRefNumber: number;
  status: 'To Send' | 'In Transit' | 'Delivered' | 'N/A';
  shippingDate?: string;
  deliveryDate?: string;
  orderDate: string;
  orderedBy: string;
  seller: string;
  shippingFrom: string;
  shippingTo: string;
  packingList: {
    imgSrc: string;
    name: string;
    tags: { label: string }[];
    size: string;
    boxes: {
      id: string;
      count: number;
      weight: number;
      quantity: number;
    }[];
    cost: number;
    unit: string;
  }[];
  total: string;
  toAddressState: string;
};

export interface DetailsPublicProps {
  match: {
    params: {
      orderId: string;
      status: 'PENDING' | 'PLACED' | 'TRANSIT' | 'DELIVERED';
    };
  };
}

export interface DetailsGeneratedProps {
  details: Details;
  token: string;
}

export interface DetailsProps
  extends DetailsPublicProps,
    DetailsGeneratedProps {}
