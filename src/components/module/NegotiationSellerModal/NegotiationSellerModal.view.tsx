import React, { useState } from 'react';

import Button from 'components/base/Button';
import Divider from 'components/base/Divider';
import Radio from 'components/base/Radio';
import { Exclamation } from 'components/base/SVG';
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
import { equals, filter } from 'ramda';
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

  const getTotalListingBoxesWeight = () =>
    props.listingBoxes?.boxes?.length > 0
      ? props.listingBoxes.boxes[props.selectedGroupedBoxIndex || 0].reduce(
          (prevValue, currentValue) =>
            prevValue + currentValue.weight * currentValue.quantity,
          0
        )
      : 0;

  const getFinalPrice = () =>
    negotiationPrice ||
    props.negotiation?.negotiation_offer?.counter_offer ||
    Number(props.negotiation?.counter_offer || 0);

  const isNegotiatedBoxGone = () => {
    return (
      filter(equals(props?.negotiation?.listing_boxes || []))(
        props?.listingBoxes?.boxes || []
      ).length <= 0
    );
  };

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
          disabled={props.listingBoxes?.boxes?.length === 0}
        />
      </Inputs>

      <ComputationContainer>
        <div className="computation-item-container" style={{ marginTop: -3 }}>
          <Typography variant="body" weight="400" style={{ color: textColor }}>
            Quantity
          </Typography>
          <div style={{ display: 'flex' }}>
            <Typography weight="700" style={{ color: '#565A6A' }}>
              {props.quantity}
            </Typography>
            {(props?.listingBoxes?.boxes?.length <= 0 ||
              isNegotiatedBoxGone()) &&
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
        </div>

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
                <Typography
                  color="primary"
                  weight="700"
                  style={{ fontSize: 14 }}
                >
                  Update the box combination for this negotiation
                </Typography>
                {props?.listingBoxes?.boxes?.map((groupedBoxes, index) => {
                  const totalWeight = groupedBoxes.reduce(
                    (acc, box) => box.weight * box.quantity + acc,
                    0
                  );
                  return (
                    <BoxContainer key={index}>
                      <div style={{ marginTop: 3 }}>
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
              ? `${toPrice(
                  negotiationPrice || 0
                )}/${negotiation.measurement_unit.toLowerCase()}`
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
                : (negotiationPrice || 0) < Number(negotiation?.counter_offer)
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
            {toPrice(getAgreedTotalPrice())}
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
            disabled={!negotiationPrice}
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
          disabled={!negotiationPrice || isNegotiatedBoxGone()}
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
