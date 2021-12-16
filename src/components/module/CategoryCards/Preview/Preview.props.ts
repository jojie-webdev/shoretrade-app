import { CSSProperties, HTMLAttributes } from 'react';

export interface PreviewProps {
  caught?: string;
  coop?: { name: string };
  createdAt?: string;
  description?: string;
  ends?: string;
  catchRecurrence?: string;
  fisherman?: { name: string };
  id: string;
  images: string[];
  isAquafuture?: boolean;
  measurementUnit?: string;
  minimumOrder?: string;
  origin?: { state: string; suburb: string; countryCode: string };
  shippingFrom?: { state: string; suburb: string; countryCode: string };
  price?: string;
  remaining?: string;
  sellInMultiplesOf?: boolean;
  size?: { from: string; to: string; unit: string };
  state?: string[];
  total?: number;
  type?: string;
  backgroundColor?: string;
  weight: string;
  unit?: string;
  cardContainerStyle?: CSSProperties;
  cardContainerClass?: any;
  hiddenPrice?: boolean;
  hiddenVendor?: boolean;
  alternate?: boolean;
  isIkeJime: boolean;
  isIceSlurry: boolean;
}
