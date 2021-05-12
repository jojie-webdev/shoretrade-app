import React, { useEffect, useState } from 'react';

import Button from 'components/base/Button';
import { Close } from 'components/base/SVG';
import Typography from 'components/base/Typography/Typography.view';
import MobileModal from 'components/layout/MobileModal';
import Modal from 'components/layout/Modal';
import { NegotiateSellerModalProps } from 'components/module/NegotiateSellerModal/NegotiateSellerModal.props';
import {
  StyledTextField,
  Inputs,
  ButtonContainer,
  ComputationContainer,
  CloseBadge,
  TopContainer,
} from 'components/module/NegotiateSellerModal/NegotiateSellerModal.style';
import { BREAKPOINTS } from 'consts/breakpoints';
import { sortBy } from 'ramda';
import { useMediaQuery } from 'react-responsive';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { toOrdinalSuffix } from 'utils/String/toOrdinalSuffix';
import { toPrice } from 'utils/String/toPrice';
import { useTheme } from 'utils/Theme';

const Content = (props: NegotiateSellerModalProps) => {
  const {
    marketOffer,
    onSubmit,
    isNegotiating,
    modalLastNegotiationsArray,
    ...modalProps
  } = props;
  const theme = useTheme();
  const textColor = 'noshade';

  const [negotiationPrice, setNegotiationPrice] = useState<number | undefined>(
    undefined
  );

  const { negotiations, price, weight, measurementUnit } = marketOffer;

  const sortByDate = sortBy((data: { created_at: string }) => data.created_at);
  const sortedNegotiations = sortByDate(negotiations);
  const newOffers = sortedNegotiations.filter((a) => a.type === 'NEW_OFFER');
  const counterOffers = sortedNegotiations.filter(
    (a) => a.type === 'COUNTER_OFFER'
  );
  const latestNewOffer = newOffers.slice(-1)[0];
  const latestCounterOffer = counterOffers.slice(-1)[0];
  const currentOfferPrice = latestCounterOffer?.price || price;

  const currentNewOffer = negotiationPrice || currentOfferPrice;
  const discountValue = currentNewOffer - currentOfferPrice;
  const discountPercentage = (
    (discountValue / currentOfferPrice) *
    100
  ).toFixed(2);

  const totalValue = currentNewOffer * weight;
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const unit = formatMeasurementUnit(measurementUnit);

  return (
    <>
      <TopContainer>
        <Typography variant="title5" color="shade1">
          Negotiate
        </Typography>

        <CloseBadge
          onClick={() => {
            modalProps.onClickClose();
          }}
        >
          <Close fill={theme.grey.shade8} />
        </CloseBadge>
      </TopContainer>

      <Inputs>
        <StyledTextField
          type="number"
          label={'Make a new Offer'}
          value={negotiationPrice}
          onChangeText={(v) => {
            setNegotiationPrice(parseFloat(v));
          }}
          min={1}
          LeftComponent={
            <Typography variant="label" color="shade6">
              {'$'}
            </Typography>
          }
        />
      </Inputs>
      <ComputationContainer>
        {sortedNegotiations.length >= 1 && (
          <div className="computation-item-container">
            <Typography variant="label" color={textColor}>
              Buyer&apos;s Counter Offer
            </Typography>
            <Typography variant="label" weight="bold" color={textColor}>
              {toPrice(latestCounterOffer.price)}/{unit}
            </Typography>
          </div>
        )}

        {latestCounterOffer && sortedNegotiations.length <= 3 && (
          <div className="computation-item-container">
            <Typography variant="label" color={textColor}>
              Your New Offer
            </Typography>
            <Typography variant="label" weight="bold" color={textColor}>
              {toPrice(negotiationPrice || 0)}/{unit}
            </Typography>
          </div>
        )}

        <div className="computation-item-container">
          <Typography variant="label" color={textColor}>
            Change in Price{' '}
            <span className="indicator">{discountPercentage}%</span>
          </Typography>
          {discountValue !== 0 ? (
            <Typography
              color={discountValue >= 0 ? 'success' : 'error'}
              variant="label"
              weight="bold"
            >
              {toPrice(discountValue)}/{formatMeasurementUnit(unit)}
            </Typography>
          ) : (
            <Typography variant="label" weight="bold" color={textColor}>
              0
            </Typography>
          )}
        </div>
        <div className="computation-item-container">
          <Typography variant="label" color={textColor}>
            Total Value
          </Typography>
          <Typography variant="label" weight="bold" color={textColor}>
            {toPrice(totalValue)}
          </Typography>
        </div>
      </ComputationContainer>
      <ButtonContainer>
        <Button
          className="negotiate-btn"
          variant="primary"
          text="Negotiate"
          onClick={() => {
            if (negotiationPrice && negotiationPrice >= 1) {
              onSubmit(negotiationPrice);
            }
          }}
          loading={isNegotiating}
        />
      </ButtonContainer>
    </>
  );
};

const NegotiateSellerModal = (
  props: NegotiateSellerModalProps
): JSX.Element => {
  const {
    marketOffer,
    onSubmit,
    isNegotiating,
    modalLastNegotiationsArray,
    ...modalProps
  } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <>
      {isMobile ? (
        <MobileModal
          backgroundColor={theme.grey.shade9}
          backdropStyle={{
            backgroundColor: theme.grey.shade8,
            borderRadiusBottom: 8,
          }}
          style={{
            width: 'unset',
            padding: isMobile ? '48px 16px' : '48px',
          }}
          {...modalProps}
        >
          <Content {...props} {...modalProps} />
        </MobileModal>
      ) : (
        <Modal
          backgroundColor={theme.grey.shade8}
          style={{
            width: '',
            padding: `${isMobile ? '12px' : '48px'}`,
          }}
          {...modalProps}
        >
          <Content {...props} {...modalProps} />
        </Modal>
      )}
    </>
  );
};

export default React.memo(NegotiateSellerModal);
