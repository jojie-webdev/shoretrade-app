import React, { useEffect, useState } from 'react';

import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import Typography from 'components/base/Typography/Typography.view';
import Modal from 'components/layout/Modal';
import { NegotiateBuyerModalProps } from 'components/module/NegotiateBuyerModal/NegotiateBuyerModal.props';
import {
  StyledTextField,
  Inputs,
  ButtonContainer,
  ComputationContainer,
  CheckBoxContainer,
} from 'components/module/NegotiateBuyerModal/NegotiateBuyerModal.style';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { toOrdinalSuffix } from 'utils/String/toOrdinalSuffix';
import { toPrice } from 'utils/String/toPrice';
import { useTheme } from 'utils/Theme';

const NegotiateBuyerModal = (props: NegotiateBuyerModalProps): JSX.Element => {
  const {
    originalOffer,
    newOffer,
    counterOffer,
    weight,
    sortedNegotiations,
    modalLastNegotiationsArray,
    closeOnAccept,
    setCloseOnAccept,
    isNegotiating,
    onSubmit,
    ...modalProps
  } = props;
  const { unit: measurementUnit, value: weightValue } = weight;
  const theme = useTheme();
  const textColor = 'shade9';

  const [negotiationPrice, setNegotiationPrice] = useState(0);

  const handleCheck = () => {
    if (setCloseOnAccept) {
      setCloseOnAccept(!closeOnAccept);
    }
  };

  const actualPrice = newOffer ? parseFloat(newOffer) : originalOffer;
  const discountValue =
    actualPrice - (negotiationPrice || parseFloat(counterOffer));
  const discountPercentage = (discountValue
    ? (discountValue / actualPrice) * 100
    : 0
  ).toFixed(2);

  const deliveryTotal =
    (negotiationPrice ? negotiationPrice : parseFloat(newOffer)) * weightValue;

  const lastOffer =
    sortedNegotiations.filter((i) => i.type === 'COUNTER_OFFER').length + 1;

  const unit = formatMeasurementUnit(measurementUnit);

  return (
    <Modal
      backgroundColor={theme.grey.noshade}
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
            label={'Counter Offer'}
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
        <CheckBoxContainer>
          <Checkbox
            onClick={() => handleCheck()}
            className="checkbox"
            checked={closeOnAccept}
          />
          <Typography className="label" variant="label" color="shade7">
            Close this buyer request if accepted.
          </Typography>
        </CheckBoxContainer>
        <ComputationContainer>
          <div className="computation-item-container">
            <Typography variant="label" color={textColor}>
              Seller&apos;s original offer
            </Typography>
            <Typography variant="label" weight="bold" color={textColor}>
              {toPrice(originalOffer)}/{unit}
            </Typography>
          </div>

          {counterOffer !== '' && sortedNegotiations.length <= 2 && (
            <div className="computation-item-container">
              <Typography variant="label" color={textColor}>
                Your counter offer
              </Typography>
              <Typography variant="label" weight="bold" color={textColor}>
                {toPrice(counterOffer)}/{unit}
              </Typography>
            </div>
          )}

          {sortedNegotiations.length >= 2 && (
            <>
              {modalLastNegotiationsArray.map((offer) => {
                return (
                  <div key={offer.id} className="computation-item-container">
                    <Typography variant="label" color={textColor}>
                      {`${
                        offer.type === 'COUNTER_OFFER' ? 'Your' : `Seller's`
                      } ${
                        offer.ordinal && toOrdinalSuffix(offer.ordinal)
                      } offer`}
                    </Typography>
                    <Typography variant="label" weight="bold" color={textColor}>
                      {toPrice(offer.price)}/{unit}
                    </Typography>
                  </div>
                );
              })}
              <div className="computation-item-container">
                <Typography variant="label" color={textColor}>
                  Your {toOrdinalSuffix(lastOffer)} offer
                </Typography>
                <Typography variant="label" weight="bold" color={textColor}>
                  {toPrice(negotiationPrice)}/{unit}
                </Typography>
              </div>
            </>
          )}

          <div className="computation-item-container">
            <Typography variant="label" color={textColor}>
              Change in Price{' '}
              <span className="indicator">{discountPercentage}%</span>
            </Typography>
            {discountValue !== 0 ? (
              <Typography
                color={discountValue < 0 ? 'error' : 'success'}
                variant="label"
                weight="bold"
              >
                {toPrice(discountValue)}/{unit}
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
              if (negotiationPrice >= 1) onSubmit(negotiationPrice);
            }}
            loading={isNegotiating}
          />
        </ButtonContainer>
      </>
    </Modal>
  );
};

export default React.memo(NegotiateBuyerModal);
