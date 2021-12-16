import { MouseEventHandler } from 'react';

// eslint-disable-next-line import/named
import { Moment } from 'moment';

export interface OrderItemProps extends OrderItem {
  isLoading?: boolean;
  onClick?: MouseEventHandler<any>;
  completedOrder?: boolean;
  validity?: string;
  onRateClick?: MouseEventHandler<any>;
}

export interface OrderItem {
  id: string;
  confirmed: boolean;
  data: {
    orderRefNumber: number;
    orderNumber: string;
    seller: string;
    orderedBy: string;
    rating: number | null;
    ratingId: string | null;
    isMarketRequest: boolean;
    detailsProps: {
      uri: string;
      name: string;
      price: string;
      tags: {
        label: string;
        type: string | 'plain' | 'blue';
      }[];
      weight: string;
      unit: string;
      size: string;
      location: string;
      vendor: string;
      cBorderRadius: string;
      cBorderWidth: string;
      pricePerUnit: string;
    }[];
    shippingOption: string;
    shippingPrice: string;
    shippingTo: string;
    shippingFrom: string;
    shippingChargeGst: number;
    shippingChargeNet: number;
    total: string;
  };

  estDeliveryDate: Date;
  estCatchmentDate: Date;
  deliveredDate: Date;
  price: string;
  isAquafuture: boolean;
  token?: string;
}

export type ItemDetailVariants = 'left' | 'center' | 'right';
