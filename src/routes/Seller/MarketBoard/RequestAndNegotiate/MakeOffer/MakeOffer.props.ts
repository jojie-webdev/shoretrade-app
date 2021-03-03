import { Dispatch, SetStateAction } from 'react';

import { OfferProps, StepProps } from '../RequestAndNegotiate.props';

export interface MakeOfferProps extends StepProps, OfferProps {}

export type Option = { label: string; value: string };

export interface MakeOfferGeneratedProps extends MakeOfferProps {
  shippingTo: string;
  addresses: { label: string; value: string }[];
  stateOptions: Option[];
  marketSizes: string[];
  errors: Record<string, string[]>;

  specifications: string[];
  size: string;
  setSize: Dispatch<SetStateAction<string>>;
  weight: string;
  setWeight: Dispatch<SetStateAction<string>>;
  price: string;
  setPrice: Dispatch<SetStateAction<string>>;
  deliveryDate: Date | null;
  setDeliveryDate: Dispatch<Date | null>;
  selectedAddress: string;
  setSelectedAddress: Dispatch<SetStateAction<string>>;

  onClickSpecification: (id: string) => void;
  addToMarketOffers: () => void;
}
