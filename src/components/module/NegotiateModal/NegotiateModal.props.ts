import { ModalProps } from 'components/layout/Modal/Modal.props';
import { Dispatch, SetStateAction } from 'react';

export interface NegotiateModalProps extends ModalProps {
  onSubmit: (counterOffer: number) => void;
  originalOffer: number;
  counterOffer: number;
  isNegotiating?: boolean;
  weight: {
    unit: string;
    value: number;
  };
  closeOnAccept?: boolean | undefined;
  setCloseOnAccept?: Dispatch<SetStateAction<boolean>> | undefined;
}
