import React from 'react';

import Button from 'components/base/Button';
import Typography from 'components/base/Typography';
import MobileModal from 'components/layout/MobileModal';
import Modal from 'components/layout/Modal';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'utils/Theme';

// import { useTheme } from 'utils/Theme';
import { DeclineSellerModalProps } from './DeclineSellerModal.props';

const DeclineSellerModal = (props: DeclineSellerModalProps): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const ModalLayout = isMobile ? MobileModal : Modal;

  return (
    <ModalLayout
      backgroundColor={theme.grey.shade10}
      style={{
        width: '',
        maxWidth: 430,
        borderRadius: 12,
        padding: 48,
      }}
      isOpen={props.show}
      onClickClose={props.onCancelBtnClick}
    >
      <Typography
        weight="bold"
        variant="title4"
        color="noshade"
        style={{ fontFamily: 'Canela' }}
      >
        Decline Confirmation
      </Typography>

      <div style={{ marginTop: 10 }} />

      <Typography color="shade7">
        Are you sure you want to decline this negotiation
      </Typography>
      <Typography color="shade7">
        The negotiation will automatically close and you will not be refunded
        any negotiation credits
      </Typography>

      <div style={{ marginTop: 20 }} />

      <div style={{ display: 'flex' }}>
        <Button
          text={<Typography color="primary">Cancel</Typography>}
          variant="outline"
          onClick={props.onCancelBtnClick}
        />
        <div style={{ marginLeft: 8 }} />
        <Button
          color="primary"
          text={<Typography color="noshade">Confirm</Typography>}
          onClick={props.onConfirmBtnClick}
        />
      </div>
    </ModalLayout>
  );
};

export default React.memo(DeclineSellerModal);
