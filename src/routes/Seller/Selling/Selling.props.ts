import { GetAllListingsResponseItem } from 'types/store/GetAllListingsState';

export interface SellingGeneratedProps {
  listings: GetAllListingsResponseItem[];
  pending: boolean;
  goToListingDetails: (id: string) => void;
}

export type ItemProp = {
  uri?: string;
  title: string;
  price: string;
  tags?: { label: string }[];
  size?: string;
  listedOn?: Date;
  expiresIn?: Date;
  remaining?: string;
  data: GetAllListingsResponseItem;
  unit?: string;
  originalWeight?: string;
  onClick?: () => void;
};
