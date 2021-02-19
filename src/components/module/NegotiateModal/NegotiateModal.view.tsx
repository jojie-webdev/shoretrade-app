import React, { useEffect, useState } from 'react';

import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import Typography from 'components/base/Typography/Typography.view';
import Modal from 'components/layout/Modal';
// import { useTheme } from 'utils/Theme';

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
    originalOffer = 50,
    offerId,
    ...modalProps
  } = props;

  const [counterOffer, setCounterOffer] = useState(originalOffer);
  const [closeListing, setCloseListing] = useState(false);
  const [discountValue, setDiscountValue] = useState(0);

  useEffect(() => {
    if (counterOffer >= 1) {
      setDiscountValue(Number(originalOffer) - Number(counterOffer));
    }
  }, [counterOffer]);

  const handleCheck = (value: any) => {
    console.log(value);
    setCloseListing(!closeListing);
  };

  // const theme = useTheme();
  return (
    <Modal
      backgroundColor="#fff"
      style={{
        width: '',
        padding: '',
      }}
      {...modalProps}
    >
      <>
        <Typography weight="bold" variant="title4">
          Negotiate
        </Typography>
        <Inputs>
          <StyledTextField
            type="number"
            label="Counter Offer"
            value={counterOffer}
            onChangeText={(v) => {
              setCounterOffer(Number(v));
            }}
            min={1}
            LeftComponent={
              <Typography variant="label" color="shade6">
                {'$'}
              </Typography>
            }
          />
        </Inputs>
        <CheckBoxContainer>
          <Checkbox
            onClick={(v) => handleCheck(v)}
            className="checkbox"
            checked={closeListing}
          />
          <Typography className="label" variant="label" color="shade7">
            Close this listing if accepted.
          </Typography>
        </CheckBoxContainer>
        <ComputationContainer>
          <div className="computation-item-container">
            <Typography variant="label">Original offer was</Typography>
            <Typography className="value" weight="bold">
              {'$'}
              {originalOffer}/{'kg'}
            </Typography>
          </div>
          <div className="computation-item-container">
            <Typography variant="label">Your counter offer is</Typography>
            <Typography className="value" weight="bold">
              {'$'}
              {counterOffer}/{'kg'}
            </Typography>
          </div>
          <div className="computation-item-container">
            <Typography variant="label">
              {/* TODO */}
              Discount Value <span className="indicator">{'0.5%'}</span>
            </Typography>
            {discountValue !== 0 ? (
              <Typography
                color={discountValue > 0 ? 'success' : 'error'}
                className="value"
                weight="bold"
              >
                {/* TODO */}
                {'$'}
                {discountValue > 0 ? '-' : '+'}
                {Math.abs(discountValue)}/{'kg'}
              </Typography>
            ) : (
              <Typography>0</Typography>
            )}
          </div>
          <div className="computation-item-container">
            <Typography variant="label">Original offer was</Typography>
            <Typography className="value" weight="bold">
              {'$'}
              {originalOffer}/{'kg'}
            </Typography>
          </div>
        </ComputationContainer>
        <ButtonContainer>
          <Button
            variant="primary"
            text="Negotiate"
            onClick={() => {
              onSubmit({ counterOffer, offerId });
              modalProps.onClickClose();
            }}
          />
        </ButtonContainer>
      </>
    </Modal>
  );
};

export default React.memo(NegotiateModal);
