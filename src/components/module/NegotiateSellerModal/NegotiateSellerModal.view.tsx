import React, { useState } from 'react';

import Button from 'components/base/Button';
import Divider from 'components/base/Divider';
import Radio from 'components/base/Radio';
import Typography from 'components/base/Typography/Typography.view';
import MobileFooter from 'components/layout/MobileFooter/MobileFooter.view';
import MobileModal from 'components/layout/MobileModal';
import Modal from 'components/layout/Modal';
import { NegotiateSellerModalProps } from 'components/module/NegotiateSellerModal/NegotiateSellerModal.props';
import {
  StyledTextField,
  Inputs,
  ButtonContainer,
  ComputationContainer,
  BoxContainer,
} from 'components/module/NegotiateSellerModal/NegotiateSellerModal.style';
import { BREAKPOINTS } from 'consts/breakpoints';
import { sortBy } from 'ramda';
import { Hidden } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { toPrice } from 'utils/String/toPrice';
import { useTheme } from 'utils/Theme';

const Content = (props: NegotiateSellerModalProps) => {
  const { marketOffer, onSubmit, isNegotiating } = props;
  const theme = useTheme();
  const textColor = 'shade7';

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
  const latestPrice = latestNewOffer?.price || price;

  // input field vs latest buyer's counter offer
  const discountValue = currentNewOffer - currentOfferPrice;
  const discountPercentage = (
    (discountValue / currentOfferPrice) *
    100
  ).toFixed(2);
  const totalValue = currentNewOffer * weight;

  const unit = formatMeasurementUnit(measurementUnit);

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
          value={negotiationPrice}
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
          placeholder={`per ${unit}`}
        />
      </Inputs>

      <ComputationContainer>
        <div className="computation-item-container" style={{ marginTop: -3 }}>
          <Typography variant="body" weight="400" color={textColor}>
            Quantity
          </Typography>
          <Typography variant="body" weight="400" color={textColor}>
            20 kg
          </Typography>
        </div>

        <div style={{ padding: '10px 0px' }}>
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
        </div>

        {sortedNegotiations.length >= 1 && (
          <div className="computation-item-container">
            <Typography variant="body" weight="400" color={textColor}>
              Buyer&apos;s negotiated price
            </Typography>
            <Typography variant="body" weight="400" color={textColor}>
              {toPrice(latestCounterOffer.price)}/{unit}
            </Typography>
          </div>
        )}

        {/* <div className="computation-item-container">
          <Typography variant="body" weight="400" color={textColor}>
            Previous offer was
          </Typography>
          <Typography variant="body" weight="400" color={textColor}>
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
            {toPrice(negotiationPrice || 0)}/{unit}
          </Typography>
        </div>

        {/* 
        {latestCounterOffer && sortedNegotiations.length <= 3 && (
          <div className="computation-item-container">
            <Typography variant="body" color={textColor}>
              Your New Offer
            </Typography>
            <Typography variant="body" color={textColor}>
              {toPrice(negotiationPrice || 0)}/{unit}
            </Typography>
          </div>
        )} */}

        <div className="computation-item-container">
          <Typography variant="body" weight="400" color={textColor}>
            Change in value{' '}
            <span
              className="indicator"
              style={{ color: theme.grey.noshade }}
            >{`${discountValue > 0 ? '+' : ''}${discountPercentage}%`}</span>
          </Typography>
          {discountValue !== 0 ? (
            <Typography weight="400" color={textColor} variant="body">
              {toPrice(discountValue)}/{formatMeasurementUnit(unit)}
            </Typography>
          ) : (
            <Typography variant="body" color={textColor}>
              0
            </Typography>
          )}
        </div>

        <Divider backgroundColor={theme.grey.shade7} spacing={10} />

        <div className="computation-item-container total-delivery">
          <Typography variant="body" weight="bold" color="noshade">
            Total Value
          </Typography>
          <Typography variant="body" weight="bold" color="noshade">
            {toPrice(totalValue)}
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

export default React.memo(NegotiateSellerModal);
