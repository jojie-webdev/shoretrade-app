import { ChangeEvent } from 'react';

export interface SellerLandingGeneratedProps {
  search: string;
  results: {
    companyImage: string;
    companyName: string;
    id: string;
  }[];
  onChangeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void;
}
