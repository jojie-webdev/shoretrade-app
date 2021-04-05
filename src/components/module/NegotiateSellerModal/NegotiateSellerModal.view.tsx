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
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { toPrice } from 'utils/String/toPrice';
import { useTheme } from 'utils/Theme';

const NegotiateSellerModal = (
  props: NegotiateSellerModalProps
): JSX.Element => {
  const {
    onSubmit,
    weight,
    originalOffer = 0,
    counterOffer: counterOfferProp,
    isNegotiating,
    ...modalProps
  } = props;
  const { unit, value: weightValue } = weight;
  const theme = useTheme();
  const textColor = 'noshade';

  const [counterOffer, setCounterOffer] = useState(counterOfferProp);
  const [discountValue, setDiscountValue] = useState(0);

  useEffect(() => {
    if (counterOffer >= 1) {
      setDiscountValue(Number(originalOffer) - Number(counterOffer));
    }
  }, [counterOffer]);

  const discountPercentage = discountValue
    ? (
        (discountValue / (originalOffer === 0 ? counterOffer : originalOffer)) *
        100
      ).toFixed(2)
    : 0;
  const deliveryTotal = counterOffer
    ? counterOffer * weightValue
    : originalOffer * weightValue;

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
            value={counterOffer}
            onChangeText={(v) => {
              setCounterOffer(parseFloat(v));
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
          <div className="computation-item-container">
            <Typography variant="label" color={textColor}>
              Your original offer
            </Typography>
            <Typography variant="label" weight="bold" color={textColor}>
              {toPrice(originalOffer)}/{formatMeasurementUnit(unit)}
            </Typography>
          </div>

          {counterOfferProp > 0 && (
            <div className="computation-item-container">
              <Typography variant="label" color={textColor}>
                Your counter offer was
              </Typography>
              <Typography variant="label" weight="bold" color={textColor}>
                {toPrice(counterOfferProp)}/{formatMeasurementUnit(unit)}
              </Typography>
            </div>
          )}
          {counterOfferProp !== counterOffer && (
            <div className="computation-item-container">
              <Typography variant="label" color={textColor}>
                Your new offer is
              </Typography>
              <Typography variant="label" weight="bold" color={textColor}>
                {toPrice(counterOffer)}/{formatMeasurementUnit(unit)}
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
                color={
                  Math.sign(discountValue) === 0
                    ? 'noshade'
                    : Math.sign(discountValue) === 1
                    ? 'success'
                    : 'error'
                }
                variant="label"
                weight="bold"
              >
                {Math.sign(discountValue) === -1 && '-'}
                {toPrice(Math.abs(discountValue))}/{formatMeasurementUnit(unit)}
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
              {toPrice(deliveryTotal)}
            </Typography>
          </div>
        </ComputationContainer>
        <ButtonContainer>
          <Button
            variant="primary"
            text="Negotiate"
            onClick={() => {
              if (counterOffer >= 1) onSubmit(counterOffer);
            }}
            loading={isNegotiating}
          />
        </ButtonContainer>
      </>
    </Modal>
  );
};

export default React.memo(NegotiateSellerModal);
