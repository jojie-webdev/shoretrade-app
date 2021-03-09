import React, { useEffect, useState } from 'react';

import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import Typography from 'components/base/Typography/Typography.view';
import Modal from 'components/layout/Modal';
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
  const { onSubmit, weight, originalOffer = 0, offerId, ...modalProps } = props;

  const theme = useTheme();
  const isBuyer = useTheme().appType === 'buyer';
  const textColor = isBuyer ? 'shade9' : 'noshade';

  const [counterOffer, setCounterOffer] = useState(originalOffer);
  const [closeListing, setCloseListing] = useState(false);
  const [discountValue, setDiscountValue] = useState(0);

  useEffect(() => {
    if (counterOffer >= 1) {
      setDiscountValue(Number(originalOffer) - Number(counterOffer));
    }
  }, [counterOffer]);

  const handleCheck = (value: any) => {
    setCloseListing(!closeListing);
  };

  // const theme = useTheme();
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
          <Typography
            className="label"
            variant="label"
            color={isBuyer ? 'shade7' : 'noshade'}
          >
            Close this listing if accepted.
          </Typography>
        </CheckBoxContainer>
        <ComputationContainer>
          <div className="computation-item-container">
            <Typography variant="label" color={textColor}>
              Original offer was
            </Typography>
            <Typography variant="label" weight="bold" color={textColor}>
              {'$'}
              {originalOffer}/{'kg'}
            </Typography>
          </div>
          <div className="computation-item-container">
            <Typography variant="label" color={textColor}>
              Your counter offer is
            </Typography>
            <Typography variant="label" weight="bold" color={textColor}>
              {'$'}
              {counterOffer}/{'kg'}
            </Typography>
          </div>
          <div className="computation-item-container">
            <Typography variant="label" color={textColor}>
              {/* TODO */}
              Discount Value <span className="indicator">{'0.5%'}</span>
            </Typography>
            {discountValue !== 0 ? (
              <Typography
                color={discountValue > 0 ? 'success' : 'error'}
                variant="label"
                weight="bold"
              >
                {/* TODO */}
                {'$'}
                {discountValue > 0 ? '-' : '+'}
                {Math.abs(discountValue)}/{'kg'}
              </Typography>
            ) : (
              <Typography variant="label" weight="bold" color={textColor}>
                0
              </Typography>
            )}
          </div>
          <div className="computation-item-container">
            <Typography variant="label" color={textColor}>
              Original offer was
            </Typography>
            <Typography variant="label" weight="bold" color={textColor}>
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
