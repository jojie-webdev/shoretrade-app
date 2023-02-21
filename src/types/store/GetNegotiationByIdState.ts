import { GenericResponse } from 'types/GenericResponse';

export type GetNegotiationByIdMeta = {
  negotiationRequestId: string;
};

export type GetNegotiationByIdRequestResponseItem = {
  id: string;
  listing_id: string;
  listing_box_id: string;
  counter_offer: string;
  desired_quantity: number;
  status: string;
  created_at: string;
  name: string;
  thumbnail: string;
  default_photo: string;
  specifications: [
    {
      id: string;
      name: string;
    }
  ];
  size_from: string;
  size_to: string;
  active_size_unit: string;
  price_per_kilo: string;
  measurement_unit: string;
  unit_kg_conversion: string;
  metric: string;
  negotiation_offer: {
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
  auction_date: string;
  is_pre_auction: false;
  display_status: string;
};

// TODO: Update response value
export type GetNegotiationByIdPayload =
  GenericResponse<GetNegotiationByIdRequestResponseItem>;
