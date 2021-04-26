import { GetAllListingsResponseItem } from 'types/store/GetAllListingsState';

export interface SellingGeneratedProps {
  listings: GetAllListingsResponseItem[];
  staticListings: GetAllListingsResponseItem[];
  pending: boolean;
  goToListingDetails: (id: string) => void;
  onClickRemoveListing: (listingId: string, companyId: string) => void;
  showDeletedSuccess: boolean;
  onClickEdit: (listingId: string) => void;
  clearListingData: () => void;
  showModal: boolean;
  onRemove: () => void;
  search: string;
  onChangeSearch: (value: string) => void;
  resetSearch: () => void;
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
  sales?: string;
  data: GetAllListingsResponseItem;
  unit?: string;
  originalWeight?: string;
  onClick: () => void;
  onClickEdit: () => void;
  onRemove: () => void;
};
