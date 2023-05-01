import { ProductDetailsCard6Props } from '../ProductDetailsCard6/ProductDetailsCard6.props';

export interface ProductDetailsNegotiationModalProps {
  isOpen: boolean;
  onClickClose: () => void;
  action: () => void;
  disableActionText: boolean;
  isLoadingListingBoxes: boolean;
  productDetailsCard6Props: ProductDetailsCard6Props;
  negotiationPrice: number;
  handleNegotiationPriceSetting: (price: string) => void;
  unit?: string;
  negotiationWeight: string;
  groupedBox: {
    id: string;
    totalWeight: number;
    quantity: number;
    cost: number;
    boxes: Box[];
    unit: string;
  }[];
  selectedBoxesIndex: number;
  handleSelectedBoxesWeight: (boxes: Box[], boxesIndex: number) => void;
  priceDiffPercentage: number;
  selectedBoxesWeight: Box[];
  handleDesiredQuantityChange: (weight: string) => void;
  actionText?: string;
}

export interface Box {
  count: number | null;
  id: string;
  quantity: number | null;
  weight: number;
}
