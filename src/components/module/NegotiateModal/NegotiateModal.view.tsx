import React, { useEffect, useState } from 'react';

import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import Typography from 'components/base/Typography/Typography.view';
import Modal from 'components/layout/Modal';
import { toPrice } from 'utils/String/toPrice';
import { useTheme } from 'utils/Theme';

import { NegotiateModalProps } from './NegotiateModal.props';
import {
  StyledTextField,
  Inputs,
  ButtonContainer,
  ComputationContainer,
  CheckBoxContainer,
} from './NegotiateModal.style';

const NegotiateModal = (props: NegotiateModalProps): JSX.Element => {
  const {
    onSubmit,
    weight,
    originalOffer,
    counterOffer: counterOfferProp,
    isNegotiating,
    ...modalProps
  } = props;
  const { unit, value: weightValue } = weight;

  const theme = useTheme();
  const isBuyer = useTheme().appType === 'buyer';
  const textColor = isBuyer ? 'shade9' : 'noshade';

  const [counterOffer, setCounterOffer] = useState(counterOfferProp);
  const [closeListing, setCloseListing] = useState(false);
  const [discountValue, setDiscountValue] = useState(0);

  useEffect(() => {
    if (counterOffer >= 1) {
      setDiscountValue(Number(originalOffer) - Number(counterOffer));
    }
  }, [counterOffer]);

  const discountPercentage = discountValue
    ? ((discountValue / originalOffer) * 100).toFixed(2)
    : 0;
  const deliveryTotal = counterOffer * weightValue;

  const handleCheck = (value: any) => {
    setCloseListing(!closeListing);
  };

  //TODO: offer buyer
  return (
    <Modal
      backgroundColor={isBuyer ? theme.grey.noshade : theme.grey.shade8}
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
            label={isBuyer ? 'Counter Offer' : 'Make a new Offer'}
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
        {isBuyer && (
          <CheckBoxContainer>
            <Checkbox
              onClick={(v) => handleCheck(v)}
              className="checkbox"
              checked={closeListing}
            />
            <Typography
              className="label"
              variant="label"
              color={isBuyer ? 'shade7' : 'noshade'}
            >
              Close this listing if accepted.
            </Typography>
          </CheckBoxContainer>
        )}
        <ComputationContainer isSeller={!isBuyer}>
          <div className="computation-item-container">
            <Typography variant="label" color={textColor}>
              Your original offer is
            </Typography>
            <Typography variant="label" weight="bold" color={textColor}>
              {toPrice(counterOfferProp)}/{unit}
            </Typography>
          </div>
          <div className="computation-item-container">
            <Typography variant="label" color={textColor}>
              Their counter offer was
            </Typography>
            <Typography variant="label" weight="bold" color={textColor}>
              {toPrice(originalOffer)}/{unit}
            </Typography>
          </div>
          <div className="computation-item-container">
            <Typography variant="label" color={textColor}>
              Your {isBuyer ? 'counter' : 'new'} offer is
            </Typography>
            <Typography variant="label" weight="bold" color={textColor}>
              {toPrice(counterOffer)}/{unit}
            </Typography>
          </div>
          <div className="computation-item-container">
            <Typography variant="label" color={textColor}>
              Discount Value{' '}
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
                {toPrice(Math.abs(discountValue))}/{unit}
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

export default React.memo(NegotiateModal);
