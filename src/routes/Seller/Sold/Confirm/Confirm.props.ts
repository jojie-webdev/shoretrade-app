import { Dispatch, SetStateAction } from 'react';

export type Details = {
  orderNumber: string;
  buyer: string;
  uri?: string;
  price: string;
  name: string;
  tags: { label: string }[];
  size: string;
};

export interface Box {
  id: string;
  weight: number;
  quantity: number;
  count?: number;
}

export type Total = {
  weight: string;
  quantities: string;
  amount: string;
};

export interface ConfirmPublicProps {
  isOpen: boolean;
  orderId: string;
  lineItemId: string;
  status: 'PENDING' | 'PLACED' | 'TRANSIT' | 'DELIVERED';
  onClickClose: () => void;
  onClickConfirm: () => void;
}

export interface ConfirmGeneratedProps {
  pending: boolean;
  details: Details;
  boxes: Box[];
  setBoxes: Dispatch<Box[]>;
  initialBoxes: Box[];
  pricePerKilo: number;
  onCancel: () => void;
  onConfirm: () => void;
  measurementUnit: string;
}
export interface ConfirmProps
  extends ConfirmPublicProps,
    ConfirmGeneratedProps {}
