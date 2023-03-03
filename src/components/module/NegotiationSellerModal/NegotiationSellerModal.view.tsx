import React, { useState } from 'react';

import Button from 'components/base/Button';
import Divider from 'components/base/Divider';
import Radio from 'components/base/Radio';
import Typography from 'components/base/Typography/Typography.view';
import MobileFooter from 'components/layout/MobileFooter/MobileFooter.view';
import MobileModal from 'components/layout/MobileModal';
import Modal from 'components/layout/Modal';
import { NegotiationSellerModalProps } from 'components/module/NegotiationSellerModal/NegotiationSellerModal.props';
import {
  StyledTextField,
  Inputs,
  ButtonContainer,
  ComputationContainer,
  BoxContainer,
} from 'components/module/NegotiationSellerModal/NegotiationSellerModal.style';
import { BREAKPOINTS } from 'consts/breakpoints';
import { sortBy } from 'ramda';
import { Hidden } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { toPrice } from 'utils/String/toPrice';
import { useTheme } from 'utils/Theme';

const Content = (props: NegotiationSellerModalProps) => {
  const { negotiation, onSubmit, isNegotiating } = props;
  const theme = useTheme();
  const textColor = '#565A6A';

  const [negotiationPrice, setNegotiationPrice] = useState<number | null>(null);

  const priceDiff =
    Number(negotiation?.counter_offer) - (negotiationPrice || 0);
  const priceDiff2 = priceDiff / Math.abs(Number(negotiation?.counter_offer));
  const priceDiffPercentage =
    negotiationPrice === null
      ? 0
      : priceDiff2 < 0
      ? -(Math.abs(priceDiff2) * 100)
      : priceDiff2 * 100;

  return (
    <>
      <Typography weight="bold" variant="title4" color="noshade" altFont>
        Negotiate
      </Typography>

      <Inputs>
        <StyledTextField
          type="number"
          inputType="decimal"
          label={'Counter offer'}
          step=".01"
          value={negotiationPrice?.toString()}
          onChangeText={(v) => {
            let price = v;
            if (price.indexOf('.') >= 0) {
              price =
                price.substr(0, price.indexOf('.')) +
                price.substr(price.indexOf('.'), 3);
            }
            setNegotiationPrice(parseFloat(price));
          }}
          min={1}
          LeftComponent={
            <Typography variant="label" color="shade6">
              {'$'}
            </Typography>
          }
          // placeholder={`per ${unit}`}
        />
      </Inputs>

      <ComputationContainer>
        <div className="computation-item-container" style={{ marginTop: -3 }}>
          <Typography variant="body" weight="400" style={{ color: textColor }}>
            Quantity
          </Typography>
          <Typography variant="body" weight="400" style={{ color: textColor }}>
            {negotiation?.desired_quantity}{' '}
            {negotiation?.measurement_unit.toLowerCase()}
          </Typography>
        </div>

        {/* <div style={{ padding: '10px 0px' }}>
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
        </div> */}

        <div className="computation-item-container">
          <Typography variant="body" weight="400" style={{ color: textColor }}>
            Buyer&apos;s negotiated price
          </Typography>
          <Typography variant="body" weight="400" style={{ color: textColor }}>
            {negotiation
              ? `${toPrice(
                  negotiation?.counter_offer
                )}/${negotiation.measurement_unit.toLowerCase()}`
              : '0.00'}
          </Typography>
        </div>

        {/* <div className="computation-item-container">
          <Typography variant="body" weight="400" style={{ color: textColor }}>
            Previous offer was
          </Typography>
          <Typography variant="body" weight="400" style={{ color: textColor }}>
            {sortedNegotiations.length === 1
              ? `${toPrice(props.marketOffer.originalOfferPrice)}/${unit}`
              : `${toPrice(latestPrice)}/${unit}`}
          </Typography>
        </div> */}

        <div className="computation-item-container">
          <Typography variant="body" weight="400" color="noshade">
            Your counter offer is
          </Typography>
          <Typography variant="body" weight="400" color="noshade">
            {negotiation
              ? `${toPrice(negotiationPrice || 0)}/${
                  negotiation.measurement_unit
                }`
              : '0.00'}
          </Typography>
        </div>

        {/* 
        {latestCounterOffer && sortedNegotiations.length <= 3 && (
          <div className="computation-item-container">
            <Typography variant="body" style={{ color: textColor }}>
              Your New Offer
            </Typography>
            <Typography variant="body" style={{ color: textColor }}>
              {toPrice(negotiationPrice || 0)}/{unit}
            </Typography>
          </div>
        )} */}

        <div className="computation-item-container">
          <Typography variant="body" weight="400" style={{ color: textColor }}>
            Change in value{' '}
            <span className="indicator" style={{ color: theme.grey.noshade }}>
              {negotiationPrice === null
                ? ''
                : (negotiationPrice || 0) > Number(negotiation?.counter_offer)
                ? '+'
                : '-'}
              {Math.abs(priceDiffPercentage).toFixed(2)}%
            </span>
          </Typography>
          <Typography weight="400" style={{ color: textColor }} variant="body">
            {negotiationPrice === null
              ? ''
              : `${toPrice(
                  (negotiationPrice || 0) -
                    Number(negotiation?.counter_offer || '0.00')
                )}/${
                  negotiation &&
                  formatMeasurementUnit(negotiation.measurement_unit)
                }`}
          </Typography>
        </div>

        <Divider backgroundColor="#565A6A" spacing={10} />

        <div className="computation-item-container total-delivery">
          <Typography variant="body" weight="bold" color="noshade">
            Total Value
          </Typography>
          <Typography variant="body" weight="bold" color="noshade">
            {negotiationPrice === null
              ? ''
              : toPrice(
                  negotiationPrice * (negotiation?.desired_quantity || 0)
                )}
          </Typography>
        </div>
      </ComputationContainer>

      <Hidden xs>
        <ButtonContainer>
          <Button
            variant="primary"
            text="Negotiate"
            onClick={() => {
              if (negotiationPrice && negotiationPrice >= 1) {
                onSubmit(negotiationPrice);
              }
            }}
            loading={isNegotiating}
            style={{ borderRadius: 12, maxWidth: 128 }}
          />
        </ButtonContainer>
      </Hidden>
      <MobileFooter>
        <Button
          variant="primary"
          text="Negotiate"
          onClick={() => {
            if (negotiationPrice && negotiationPrice >= 1) {
              onSubmit(negotiationPrice);
            }
          }}
          takeFullWidth
          loading={isNegotiating}
          style={{ borderRadius: 12 }}
        />
      </MobileFooter>
    </>
  );
};

const NegotiationSellerModal = (
  props: NegotiationSellerModalProps
): JSX.Element => {
  const { onSubmit, isNegotiating, ...modalProps } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const ModalLayout = isMobile ? MobileModal : Modal;

  return (
    <>
      <ModalLayout
        backgroundColor={theme.grey.shade10}
        style={{
          width: '',
          maxWidth: 430,
          borderRadius: 12,
          padding: 48,
        }}
        {...modalProps}
      >
        <Content {...props} {...modalProps} />
      </ModalLayout>
    </>
  );
};

export default React.memo(NegotiationSellerModal);
