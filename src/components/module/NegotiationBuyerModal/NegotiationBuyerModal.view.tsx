import React, { useState } from 'react';

import Button from 'components/base/Button';
// import Checkbox from 'components/base/Checkbox';
import { MarketBoardOutlined } from 'components/base/SVG';
import Typography from 'components/base/Typography/Typography.view';
import MobileFooter from 'components/layout/MobileFooter';
import MobileModal from 'components/layout/MobileModal';
import Modal from 'components/layout/Modal';
import { BREAKPOINTS } from 'consts/breakpoints';
import pathOr from 'ramda/es/pathOr';
import { Hidden } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { GetNegotiationByIdRequestResponseItem } from 'types/store/GetNegotiationByIdState';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { toPrice } from 'utils/String/toPrice';
import { useTheme } from 'utils/Theme';

import { NegotiationBuyerModalProps } from './NegotiationBuyerModal.props';
import {
  StyledTextField,
  Inputs,
  ButtonContainer,
  ComputationContainer,
  // CheckBoxContainer,
} from './NegotiationBuyerModal.style';

const NegotiationBuyerModal = (
  props: NegotiationBuyerModalProps
): JSX.Element => {
  const {
    negotiation,
    onSubmitClick,
    isCreateBuyerCounterNegotiationPending,
    ...modalProps
  } = props;

  const [buyerNegotiatedPrice, setBuyerNegotiatedPrice] = useState<
    number | null
  >(null);

  const theme = useTheme();

  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const ModalLayout = isSmallScreen ? MobileModal : Modal;

  const priceDiff =
    (buyerNegotiatedPrice || 0) -
    Number(
      negotiation?.negotiation_offer?.counter_offer ||
        negotiation?.counter_offer ||
        '0'
    );
  const priceDiff2 =
    priceDiff /
    Math.abs(
      Number(
        negotiation?.negotiation_offer?.counter_offer ||
          negotiation?.counter_offer ||
          '0'
      )
    );
  const priceDiffPercentage =
    buyerNegotiatedPrice === null
      ? 0
      : priceDiff2 < 0
      ? -(Math.abs(priceDiff2) * 100)
      : priceDiff2 * 100;
  // const priceDiff = 0;
  // const priceDiff2 = 0;
  // const priceDiffPercentage = 0;

  return (
    <ModalLayout
      backgroundColor={theme.grey.noshade}
      style={{
        width: '100%',
        maxWidth: 566,
        borderRadius: 12,
        padding: 48,
      }}
      {...modalProps}
    >
      <>
        {theme.isSFM ? (
          <Typography
            variant="title4"
            color="shade8"
            weight="900"
            style={{ fontFamily: 'Canela' }}
          >
            Negotiate
          </Typography>
        ) : (
          <Typography weight="bold" variant="title4" color="noshade" altFont>
            Negotiate
          </Typography>
        )}
        <Inputs>
          <StyledTextField
            type="number"
            inputType="decimal"
            step=".01"
            label={'Counter Offer'}
            value={buyerNegotiatedPrice?.toString()}
            onChangeText={(v) => {
              let price = v;
              if (price.indexOf('.') >= 0) {
                price =
                  price.substr(0, price.indexOf('.')) +
                  price.substr(price.indexOf('.'), 3);
              }
              setBuyerNegotiatedPrice(parseFloat(price));
            }}
            min={1}
            LeftComponent={
              <Typography variant="label" color="shade6">
                {'$'}
              </Typography>
            }
            placeholder={`per ${negotiation?.measurement_unit?.toLowerCase()}`}
            style={{ marginTop: 10 }}
          />
        </Inputs>
        {/* <CheckBoxContainer>
          <Checkbox
            onClick={() => handleCheck()}
            className="checkbox"
            checked={closeOnAccept}
          />
          <Typography
            className="label"
            variant="label"
            color="shade7"
            style={{ marginRight: 4 }}
          >
            Close this buyer request if accepted.
          </Typography>
        </CheckBoxContainer> */}
        <ComputationContainer>
          <div className="computation-item-container">
            <Typography variant="body" color="shade6">
              Seller&apos;s Negotiated Price
            </Typography>
            <Typography variant="body" color="shade7">
              {'$'}
              {negotiation?.negotiation_offer?.counter_offer ||
                negotiation?.counter_offer ||
                0}
              /{negotiation?.measurement_unit?.toLowerCase()}
            </Typography>
          </div>

          {/* {sortedNegotiations.length >= 2 && (
            <div className="computation-item-container">
              <Typography variant="body" color="shade6">
                Your New Offer
              </Typography>
              <Typography variant="body" color="shade7">
                {toPrice(negotiationPrice || 0)}/{unit}
              </Typography>
            </div>
          )} */}

          <div className="computation-item-container">
            <Typography variant="body" color="shade6">
              Change in Price{' '}
              {buyerNegotiatedPrice === null || isNaN(buyerNegotiatedPrice)
                ? ''
                : negotiation?.negotiation_offer.counter_offer <
                  (buyerNegotiatedPrice || 0)
                ? '+'
                : '-'}
              {buyerNegotiatedPrice === null || isNaN(buyerNegotiatedPrice)
                ? ''
                : `${Math.abs(priceDiffPercentage).toFixed(2)}%`}
            </Typography>
            {buyerNegotiatedPrice === null || isNaN(buyerNegotiatedPrice) ? (
              ''
            ) : priceDiff !== 0 ? (
              <Typography
                color={priceDiff > 0 ? 'error' : 'success'}
                variant="body"
              >
                {toPrice(Math.abs(priceDiff))}/
                {negotiation?.measurement_unit?.toLowerCase()}
              </Typography>
            ) : (
              <Typography variant="body" color="shade7">
                0
              </Typography>
            )}
          </div>

          <div className="computation-item-container">
            <Typography variant="body" color="shade6">
              Quantity
            </Typography>
            <Typography variant="body" color="shade7">
              {/* {negotiation?.desired_quantity *
                ((buyerNegotiatedPrice ?? 0) ||
                  negotiation?.negotiation_offer?.counter_offer ||
                  Number(negotiation?.counter_offer || '0'))}{' '}
              {negotiation?.measurement_unit?.toLowerCase()} */}
              {buyerNegotiatedPrice === null || isNaN(buyerNegotiatedPrice)
                ? ''
                : negotiation?.desired_quantity *
                  ((buyerNegotiatedPrice ?? 0) ||
                    negotiation?.negotiation_offer?.counter_offer)}{' '}
              {buyerNegotiatedPrice === null || isNaN(buyerNegotiatedPrice)
                ? ''
                : negotiation?.measurement_unit?.toLowerCase()}
            </Typography>
          </div>

          <div className="computation-item-container">
            <Typography variant="body" weight="bold" color="shade6">
              Total Product Value
            </Typography>
            <Typography
              variant="body"
              weight="700"
              color="shade9"
              style={{ fontFamily: 'Basis Grotesque Pro' }}
            >
              {buyerNegotiatedPrice === null || isNaN(buyerNegotiatedPrice)
                ? ''
                : toPrice(
                    (buyerNegotiatedPrice ||
                      negotiation?.negotiation_offer.counter_offer ||
                      Number(negotiation?.counter_offer || '0')) *
                      negotiation?.desired_quantity
                  )}
            </Typography>
          </div>
        </ComputationContainer>
        <Hidden xs>
          <ButtonContainer>
            <Button
              variant="primary"
              icon={<MarketBoardOutlined width={24} height={24} />}
              iconPosition="before"
              text="NEGOTIATE"
              onClick={() => {
                if (buyerNegotiatedPrice) {
                  onSubmitClick(buyerNegotiatedPrice);
                }
              }}
              takeFullWidth={isSmallScreen}
              loading={isCreateBuyerCounterNegotiationPending}
              style={{ borderRadius: 12, maxWidth: 128 }}
            />
          </ButtonContainer>
        </Hidden>
        <MobileFooter>
          <Button
            variant="primary"
            text="Negotiate"
            onClick={() => {
              if (buyerNegotiatedPrice) {
                onSubmitClick(buyerNegotiatedPrice);
              }
            }}
            takeFullWidth={isSmallScreen}
            loading={isCreateBuyerCounterNegotiationPending}
          />
        </MobileFooter>
      </>
    </ModalLayout>
  );
};

export default React.memo(NegotiationBuyerModal);
