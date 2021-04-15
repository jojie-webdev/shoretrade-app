import React, { useEffect, useState } from 'react';

import Button from 'components/base/Button';
import Typography from 'components/base/Typography/Typography.view';
import Modal from 'components/layout/Modal';
import { NegotiateSellerModalProps } from 'components/module/NegotiateSellerModal/NegotiateSellerModal.props';
import {
  StyledTextField,
  Inputs,
  ButtonContainer,
  ComputationContainer,
} from 'components/module/NegotiateSellerModal/NegotiateSellerModal.style';
import { sortBy } from 'ramda';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { toOrdinalSuffix } from 'utils/String/toOrdinalSuffix';
import { toPrice } from 'utils/String/toPrice';
import { useTheme } from 'utils/Theme';

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
  const textColor = 'noshade';

  const [negotiationPrice, setNegotiationPrice] = useState(0);

  const { negotiations, price, weight, measurementUnit } = marketOffer;

  const sortByDate = sortBy((data: { created_at: string }) => data.created_at);
  const sortedNegotiations = sortByDate(negotiations);
  const newOffers = sortedNegotiations.filter((a) => a.type === 'NEW_OFFER');
  const counterOffers = sortedNegotiations.filter(
    (a) => a.type === 'COUNTER_OFFER'
  );
  const latestNewOffer = newOffers.slice(-1)[0];
  const latestCounterOffer = counterOffers.slice(-1)[0];
  const currentOfferPrice = price || latestNewOffer?.price;

  const currentNewOffer = negotiationPrice || currentOfferPrice;
  const discountValue = currentNewOffer - currentOfferPrice;
  const discountPercentage = (
    (discountValue / currentOfferPrice) *
    100
  ).toFixed(2);

  const totalValue = currentNewOffer * weight;

  const unit = formatMeasurementUnit(measurementUnit);
  return (
    <Modal
      backgroundColor={theme.grey.shade8}
      style={{
        width: '',
        padding: '48px',
      }}
      {...modalProps}
    >
      <>
        <Typography weight="bold" variant="title4" color={textColor}>
          Negotiate
        </Typography>
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
                {toPrice(negotiationPrice)}/{unit}
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
            variant="primary"
            text="Negotiate"
            onClick={() => {
              if (negotiationPrice >= 1) onSubmit(negotiationPrice);
            }}
            loading={isNegotiating}
          />
        </ButtonContainer>
      </>
    </Modal>
  );
};

export default React.memo(NegotiateSellerModal);
