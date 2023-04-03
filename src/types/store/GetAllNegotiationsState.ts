import { GenericResponse } from 'types/GenericResponse';

export type GetAllNegotiationsMeta = {
  // TODO: Add request values
  term?: string;
};

export type NegotiationOfferStatus =
  | 'COUNTER_OFFER'
  | 'CLOSED'
  | 'ACCEPTED'
  | 'DECLINED'
  | 'LOST'
  | 'FINALISED';

export type NegotiationItem = {
  company_id: string;
  counter_offer: number;
  created_at: string;
  desired_quantity: number;
  id: string;
  listing_box_id: string;
  negotiation_request_id: string;
  seller_id: string;
  status: NegotiationOfferStatus;
  updated_at: string;
};

export type NegotiationRequestStatus =
  | 'OPEN'
  | 'CLOSED'
  | 'LOST'
  | 'END'
  | 'PARTIAL'
  | 'COUNTER_OFFER'
  | 'CHECKOUT';

export type GetAllNegoRequestResponseItem = {
  active_size_unit: string;
  counter_offer: string;
  created_at: string;
  updated_at: string;
  default_photo: string;
  desired_quantity: number;
  display_status: string;
  listing_box_id: string;
  listing_id: string;
  name: string;
  negotiation_request_id: string;
  parent_negotiation_request_id: string;
  size_from: string;
  size_to: string;
  specifications: { id: string; name: string }[];
  status: NegotiationRequestStatus;
  thumbnail: string;
  measurement_unit: string;
  metric: string;
  auction_date: string;
  is_pre_auction: boolean;
  negotiation_offer: NegotiationItem;
};

export type GetAllNegotiationsPayload = GenericResponse<{
  negotiations: GetAllNegoRequestResponseItem[];
}>;
