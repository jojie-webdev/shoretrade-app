import { Dispatch, SetStateAction } from 'react';

import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';
import { GetAllNegoRequestResponseItem } from 'types/store/GetAllNegotiationsState';

export interface NegotiationNonMobilePrivateProps
  extends NegotiationNonMobilePublicProps {}

export interface NegotiationNonMobilePublicProps {
  item: GetAllNegoRequestResponseItem & { expiry: any };
  onClickItem: (item: GetAllNegoRequestResponseItem) => void;
  activeOffersData: GetActiveOffersRequestResponseItem[];
  setItemToDelete: Dispatch<
    SetStateAction<{
      value: null | string;
    }>
  >;
}
