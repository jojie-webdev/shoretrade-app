import { GenericResponse } from 'types/GenericResponse';

export type GetAllNegotiationsMeta = {
  // TODO: Add request values
};

export type NegotiationItem = {
  company_id: string;
  counter_offer: number;
  created_at: string;
  desired_quantity: number;
  id: string;
  listing_box_id: string;
  negotiation_request_id: string;
  seller_id: string;
  status: string;
  updated_at: string;
};

export type GetAllNegoRequestResponseItem = {
  active_size_unit: string;
  counter_offer: string;
  created_at: string;
  default_photo: string;
  desired_quantity: number;
  display_status: string;
  listing_box_id: string;
  listing_id: string;
  name: string;
  negotiation_request_id: string;
  size_from: string;
  size_to: string;
  specifications: { id: string; name: string }[];
  status: string;
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
