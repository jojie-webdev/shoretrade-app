import { GetAllListingsResponseItem } from 'types/store/GetAllListingsState';

export interface SellingGeneratedProps {
  listings: GetAllListingsResponseItem[];
  pending: boolean;
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
};
