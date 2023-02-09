import { GenericResponse } from 'types/GenericResponse';

export type GetAllNegotiationsMeta = {
  // TODO: Add request values
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
};

export type GetAllNegotiationsPayload = GenericResponse<{
  negotiations: GetAllNegoRequestResponseItem[];
}>;
