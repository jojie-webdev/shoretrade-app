import { MouseEventHandler } from 'react';

export interface OrderItemProps extends OrderItem {
  isLoading?: boolean;
  onClick?: MouseEventHandler<any>;
  completedOrder?: boolean;
}

export interface OrderItem {
  id: string;
  confirmed: boolean;
  data: {
    orderRefNumber: number;
    orderNumber: string;
    seller: string;
    orderedBy: string;
    detailsProps: {
      uri: string;
      name: string;
      price: string;
      tags: {
        label: string;
      }[];
      weight: string;
      unit: string;
      size: string;
      location: string;
      vendor: string;
      cBorderRadius: string;
      cBorderWidth: string;
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
