import { Dispatch, SetStateAction } from 'react';

import { ModalProps } from 'components/layout/Modal/Modal.props';
import { Negotiations } from 'types/store/GetActiveOffersState';

export interface NegotiateBuyerModalProps extends ModalProps {
  originalOffer: number;
  newOffer: string;
  counterOffer: string;
  weight: {
    unit: string;
    value: number;
  };
  sortedNegotiations: Negotiations[];
  modalLastNegotiationsArray: Negotiations[];
  closeOnAccept?: boolean | undefined;
  setCloseOnAccept?: Dispatch<SetStateAction<boolean>> | undefined;
  isNegotiating?: boolean;
  onSubmit: (counterOffer: number) => void;
}
