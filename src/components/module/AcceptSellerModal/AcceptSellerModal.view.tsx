import React from 'react';

import Button from 'components/base/Button';
import Radio from 'components/base/Radio';
import Typography from 'components/base/Typography';
import MobileModal from 'components/layout/MobileModal';
import Modal from 'components/layout/Modal';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'utils/Theme';

import { AcceptSellerModalProps } from './AcceptSellerModal.props';
import {
  BoxContainer,
  Container,
  DetailsContainer,
  Line,
  TotalValueContainer,
} from './AcceptSellerModal.style';

const AcceptSellerModal = (props: AcceptSellerModalProps): JSX.Element => {
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
      onClickClose={props.onCloseClick}
    >
      <Typography
        weight="bold"
        variant="title4"
        color="noshade"
        style={{ fontFamily: 'Canela' }}
      >
        Accept Negotiation
      </Typography>

      <div style={{ marginTop: 25 }} />
      <DetailsContainer>
        <Typography color="shade7">Quantity</Typography>
        <Typography color="shade7">{props.quantity}</Typography>
      </DetailsContainer>
      <div style={{ padding: '10px 0px 10px 10px' }}>
        <BoxContainer>
          <div style={{ display: 'flex' }}>
            <div style={{ marginTop: 1 }}>
              <Radio size={13} />
            </div>

            <div>
              <Typography color="noshade" style={{ marginLeft: 5 }}>
                5kg x 2
              </Typography>
            </div>
          </div>
          <Typography color="noshade">10 kg</Typography>
        </BoxContainer>
        <div style={{ marginTop: 10 }} />

        <BoxContainer>
          <div style={{ display: 'flex' }}>
            <div style={{ marginTop: 1 }}>
              <Radio size={13} />
            </div>

            <div>
              <Typography color="noshade" style={{ marginLeft: 5 }}>
                5kg x 2
              </Typography>
              <Typography color="noshade" style={{ marginLeft: 5 }}>
                4kg x 1
              </Typography>
            </div>
          </div>
          <Typography color="noshade">14 kg</Typography>
        </BoxContainer>
      </div>

      <div style={{ marginTop: 15 }} />

      <DetailsContainer>
        <Typography color="shade7">Buyer&apos;s Negotiated Price</Typography>
        <Typography color="shade7">{props.buyersNegoPrice}</Typography>
      </DetailsContainer>
      <DetailsContainer>
        <Typography color="shade7">
          Change in value{' '}
          <span className="indicator" style={{ color: theme.grey.noshade }}>
            {props.percentageChangeInPrice}
          </span>
        </Typography>
        <Typography color={props.isGoodNego ? 'success' : 'error'}>
          {props.negoDiff}
        </Typography>
      </DetailsContainer>

      <div style={{ marginTop: 20 }} />
      <Line />
      <TotalValueContainer>
        <Typography color="noshade">Total Value</Typography>
        <Typography color="noshade">{props.totalValue}</Typography>
      </TotalValueContainer>

      <div style={{ marginTop: 7 }} />
      <Button
        color="primary"
        text="Accept"
        loading={props.isAccepting}
        onClick={props.onAcceptBtnClick}
      />
    </ModalLayout>
  );
};

export default React.memo(AcceptSellerModal);
