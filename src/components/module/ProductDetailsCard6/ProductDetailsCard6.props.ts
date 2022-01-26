import { SizingOption } from 'types/store/GetListingState';

export interface ProductDetailsCard6Props {
  cBorderWidth?: string;
  cBorderRadius?: string;
  price: string;
  timeLeft?: Date;
  avgBoxSize?: string;
  catchDate?: Date;
  catchRecurrence?: string;
  minOrder?: string;
  unit?: string;
  hiddenPrice?: boolean;
  SellerCard?: React.ReactNode;
  withBackground?: boolean;
  templateDeliveryDate: string | null;
  size?: string;
  sizingOptions: SizingOption[];
  activeSizeUnit?: string;
}
