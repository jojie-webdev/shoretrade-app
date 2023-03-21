import React from 'react';

import Button from 'components/base/Button';
import Radio from 'components/base/Radio';
import { Exclamation } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import MobileModal from 'components/layout/MobileModal';
import Modal from 'components/layout/Modal';
import { BREAKPOINTS } from 'consts/breakpoints';
import { filter, equals } from 'ramda';
import { useMediaQuery } from 'react-responsive';
import { toPrice } from 'utils/String';
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

  const totalBoxWeight =
    props.listingBoxes?.boxes?.length > 0
      ? props.listingBoxes.boxes[props.selectedGroupedBoxIndex || 0].reduce(
          (prevValue, currentValue) => prevValue + currentValue.weight,
          0
        )
      : 0;

  const getAgreedTotalPrice = () => {
    return (
      (props.negotiation?.negotiation_offer?.counter_offer ||
        Number(props.negotiation?.counter_offer || 0)) * totalBoxWeight
    );
  };

  const isNegotiatedBoxGone = () => {
    return (
      filter(equals(props?.negotiation?.listing_boxes || []))(
        props?.listingBoxes?.boxes || []
      ).length <= 0
    );
  };

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
        <Typography weight="700" style={{ color: '#565A6A' }}>
          Quantity
        </Typography>
        <div style={{ display: 'flex' }}>
          <Typography weight="700" style={{ color: '#565A6A' }}>
            {props.quantity}
          </Typography>
          {(props?.listingBoxes?.boxes?.length <= 0 ||
            isNegotiatedBoxGone()) && (
            <div style={{ marginRight: -20, marginBottom: -20 }}>
              <Exclamation fill={theme.brand.primary} width={40} height={40} />
            </div>
          )}
        </div>
      </DetailsContainer>
      {props?.listingBoxes?.boxes?.length <= 0 ? (
        <Typography
          color="primary"
          weight="700"
          style={{ fontSize: 14, marginBottom: 20 }}
        >
          Your listing is out of stock. Add more boxes to continue negotiating
          or decline the offer.
        </Typography>
      ) : (
        isNegotiatedBoxGone() && (
          <>
            <div>
              <Typography color="primary" weight="700" style={{ fontSize: 14 }}>
                Update the box combination for this negotiation
              </Typography>
              {props?.listingBoxes?.boxes?.map((groupedBoxes, index) => (
                <>
                  <BoxContainer>
                    <div style={{ display: 'flex' }}>
                      <div style={{ marginTop: 3 }}>
                        <Radio
                          size={13}
                          checked={props.selectedGroupedBoxIndex === index}
                          onClick={() =>
                            props.handleRadioClick &&
                            props.handleRadioClick(index)
                          }
                        />
                      </div>

                      <div>
                        {groupedBoxes.map((box) => (
                          <Typography
                            key={box.id}
                            color="noshade"
                            weight="700"
                            style={{ marginLeft: 5 }}
                          >
                            {box.weight}
                            {props.negoMeasurementUnit.toLowerCase()} x{' '}
                            {box.quantity}
                          </Typography>
                        ))}
                      </div>
                    </div>
                  </BoxContainer>
                  <div style={{ marginTop: 10 }} />
                </>
              ))}
            </div>
            {props?.listingBoxes?.boxes &&
              props?.listingBoxes?.boxes.length > 0 && (
                <div style={{ marginTop: 15 }} />
              )}
          </>
        )
      )}

      <DetailsContainer>
        <Typography weight="700" style={{ color: '#565A6A' }}>
          Buyer&apos;s Negotiated Price
        </Typography>
        <Typography weight="700" style={{ color: '#565A6A' }}>
          {props.buyersNegoPrice}
        </Typography>
      </DetailsContainer>
      <DetailsContainer>
        <Typography weight="700" style={{ color: '#565A6A' }}>
          Change in value{' '}
          <span className="indicator" style={{ color: theme.grey.noshade }}>
            {props.percentageChangeInPrice}
          </span>
        </Typography>
        <Typography weight="700" color={props.isGoodNego ? 'success' : 'error'}>
          {props?.negoDiff?.toLowerCase()}
        </Typography>
      </DetailsContainer>

      <div style={{ marginTop: 48 }} />
      <Line />
      <TotalValueContainer>
        <Typography weight="700" color="noshade">
          Total Value
        </Typography>
        <Typography weight="700" color="noshade">
          {toPrice(getAgreedTotalPrice())}
        </Typography>
      </TotalValueContainer>

      <div style={{ marginTop: 7 }} />
      <Button
        color="primary"
        text="Accept"
        loading={props.isAccepting}
        onClick={props.onAcceptBtnClick}
        disabled={props?.listingBoxes?.boxes?.length <= 0}
      />
    </ModalLayout>
  );
};

export default React.memo(AcceptSellerModal);
