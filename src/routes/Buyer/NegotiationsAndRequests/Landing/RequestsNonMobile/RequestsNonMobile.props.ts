import { Dispatch, SetStateAction } from 'react';

import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';

import { Result } from '../Landing.props';

export interface RequestsNonMobilePrivateProps
  extends RequestsNonMobilePublicProps {}

export interface RequestsNonMobilePublicProps {
  item: Result;
  onClickItem: (item: Result) => void;
  activeOffersData: GetActiveOffersRequestResponseItem[];
  setItemToDelete: Dispatch<
    SetStateAction<{
      value: null | string;
    }>
  >;
}
