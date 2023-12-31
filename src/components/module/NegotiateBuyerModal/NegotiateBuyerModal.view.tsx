import React, { useState } from 'react';

import Button from 'components/base/Button';
// import Checkbox from 'components/base/Checkbox';
import { MarketBoardOutlined } from 'components/base/SVG';
import Typography from 'components/base/Typography/Typography.view';
import MobileFooter from 'components/layout/MobileFooter';
import MobileModal from 'components/layout/MobileModal';
import Modal from 'components/layout/Modal';
import { NegotiateBuyerModalProps } from 'components/module/NegotiateBuyerModal/NegotiateBuyerModal.props';
import {
  StyledTextField,
  Inputs,
  ButtonContainer,
  ComputationContainer,
  // CheckBoxContainer,
} from 'components/module/NegotiateBuyerModal/NegotiateBuyerModal.style';
import { BREAKPOINTS } from 'consts/breakpoints';
import pathOr from 'ramda/es/pathOr';
import { Hidden } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { GetNegotiationByIdRequestResponseItem } from 'types/store/GetNegotiationByIdState';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
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
    // negotiation,
    ...modalProps
  } = props;
  const { unit: measurementUnit, value: weightValue } = weight;
  const theme = useTheme();
  const textColor = 'shade9';
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const ModalLayout = isSmallScreen ? MobileModal : Modal;

  const [negotiationPrice, setNegotiationPrice] = useState<number | undefined>(
    undefined
  );

  // const handleCheck = () => {
  //   if (setCloseOnAccept) {
  //     setCloseOnAccept(!closeOnAccept);
  //   }
  // };

  const initialPrice = newOffer ? parseFloat(newOffer) : originalOffer;
  const updatedPrice = negotiationPrice || initialPrice;

  // standard change in price formula
  const discountValue = updatedPrice - initialPrice;
  const discountPercentage = ((discountValue / initialPrice) * 100).toFixed(2);

  // const discountValue =
  //   actualPrice - (negotiationPrice || parseFloat(counterOffer));
  // const discountPercentage = (discountValue
  //   ? (discountValue / actualPrice) * 100
  //   : 0
  // ).toFixed(2);

  const deliveryTotal =
    (negotiationPrice ? negotiationPrice : parseFloat(newOffer)) * weightValue;

  // const lastOffer =
  //   sortedNegotiations.filter((i) => i.type === 'COUNTER_OFFER').length + 1;

  const unit = formatMeasurementUnit(measurementUnit);
  const latestSellerNego =
    modalLastNegotiationsArray[modalLastNegotiationsArray.length - 1];

  // const negotiationOffer = pathOr(
  //   {},
  //   ['negotiation_offer'],
  //   negotiation
  // ) as GetNegotiationByIdRequestResponseItem['negotiation_offer'];

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
          <Typography weight="bold" variant="title4" color={textColor} altFont>
            Negotiate
          </Typography>
        )}
        <Inputs>
          <StyledTextField
            type="number"
            inputType="decimal"
            step=".01"
            label={'Counter Offer'}
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
              {sortedNegotiations.length === 0
                ? toPrice(originalOffer)
                : toPrice(latestSellerNego.price)}
              /{unit}
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
              <span className="indicator">{`${
                discountValue > 0 ? '+' : ''
              }${discountPercentage}%`}</span>
            </Typography>
            {discountValue !== 0 ? (
              <Typography
                color={discountValue > 0 ? 'error' : 'success'}
                variant="body"
              >
                {toPrice(Math.abs(discountValue))}/{unit}
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
              {weightValue} {unit}
            </Typography>
          </div>

          <div className="computation-item-container">
            <Typography variant="body" weight="bold" color="shade6">
              Total Product Value
            </Typography>
            <Typography variant="body" weight="bold" color={textColor}>
              {toPrice(deliveryTotal)}
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
                if (negotiationPrice && negotiationPrice >= 1) {
                  onSubmit(negotiationPrice);
                }
              }}
              takeFullWidth={isSmallScreen}
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
            takeFullWidth={isSmallScreen}
            loading={isNegotiating}
          />
        </MobileFooter>
      </>
    </ModalLayout>
  );
};

export default React.memo(NegotiateBuyerModal);
