import { MouseEventHandler } from 'react';

// eslint-disable-next-line import/named
import { Moment } from 'moment';
import { ScanHistoryItem } from 'types/store/GetSellerOrdersState';

export interface OrderItemProps extends OrderItem {
  isLoading?: boolean;
  onClick?: () => void;
  completedOrder?: boolean;
  validity?: string;
  onRateClick?: () => void;
}

export interface OrderItem {
  id: string;
  confirmed: boolean;
  data: {
    isPending: boolean;
    isCollectable: boolean;
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
      scanHistory: ScanHistoryItem[];
    }[];
    shippingOption: string;
    shippingAddress?: string;
    shippingPrice: string;
    shippingTo: string;
    shippingFrom: string;
    shippingChargeGst: number;
    shippingChargeNet: number;
    total: string;
    totalCrateFee: number;
  };

  estDeliveryDate: Date;
  estCatchmentDate: Date;
  deliveredDate: Date;
  price: string;
  isAquafuture: boolean;
  token?: string;
  deliveryAddress: string | null;
  updateScanHistoryModal?: React.Dispatch<
    Partial<{
      isOpen: boolean;
      scanHistoryItems: ScanHistoryItem[];
    }>
  >;
}

export type ItemDetailVariants = 'left' | 'center' | 'right';
