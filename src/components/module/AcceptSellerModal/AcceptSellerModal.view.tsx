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
  DetailsContainer,
  Line,
  TotalValueContainer,
} from './AcceptSellerModal.style';

const AcceptSellerModal = (props: AcceptSellerModalProps): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const ModalLayout = isMobile ? MobileModal : Modal;

  const getTotalListingBoxesWeight = () =>
    props.listingBoxes?.boxes?.length > 0
      ? props.listingBoxes.boxes[props.selectedGroupedBoxIndex || 0].reduce(
          (prevValue, currentValue) =>
            prevValue + currentValue.weight * currentValue.quantity,
          0
        )
      : 0;

  const getFinalPrice = () =>
    props.negotiation?.negotiation_offer?.counter_offer ||
    Number(props.negotiation?.counter_offer || 0);

  const getAgreedTotalPrice = () => {
    if (isNegotiatedBoxGone()) {
      return getFinalPrice() * getTotalListingBoxesWeight();
    }

    return (
      (props?.negotiation?.listing_boxes?.reduce(
        (prevValue, currentValue) =>
          prevValue + currentValue.weight * currentValue.quantity,
        0
      ) ?? 0) * getFinalPrice()
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
          {(props?.listingBoxes?.boxes?.length <= 0 || isNegotiatedBoxGone()) &&
            !props.isAccepting && (
              <div style={{ marginRight: -20, marginBottom: -20 }}>
                <Exclamation
                  fill={theme.brand.primary}
                  width={40}
                  height={40}
                />
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
        isNegotiatedBoxGone() &&
        !props.isAccepting && (
          <>
            <div>
              <Typography color="primary" weight="700" style={{ fontSize: 14 }}>
                Update the box combination for this negotiation
              </Typography>
              {props?.listingBoxes?.boxes?.map((groupedBoxes, index) => {
                const totalWeight = groupedBoxes.reduce(
                  (acc, box) => box.weight * box.quantity + acc,
                  0
                );
                return (
                  <BoxContainer key={index}>
                    <div style={{ marginTop: '3px' }}>
                      <Radio
                        size={13}
                        checked={props.selectedGroupedBoxIndex === index}
                        onClick={() =>
                          props.handleRadioClick &&
                          props.handleRadioClick(index)
                        }
                      />
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flex: '1',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'start',
                        }}
                      >
                        {groupedBoxes.map((box, index) => (
                          <Typography
                            key={box.id}
                            color="noshade"
                            weight="700"
                            style={{
                              marginLeft: index > 0 ? '0.75rem' : '5px',
                            }}
                          >
                            {box.weight}
                            {props.negoMeasurementUnit.toLowerCase()} x{' '}
                            {box.quantity}
                          </Typography>
                        ))}
                      </div>
                      <Typography
                        color="noshade"
                        weight="700"
                        style={{ marginLeft: 5 }}
                      >
                        {`${totalWeight}${props.negoMeasurementUnit.toLowerCase()}`}
                      </Typography>
                    </div>
                  </BoxContainer>
                );
              })}
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
