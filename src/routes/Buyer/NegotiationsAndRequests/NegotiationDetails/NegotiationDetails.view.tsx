import React from 'react';

import Alert from 'components/base/Alert';
import Breadcrumbs from 'components/base/Breadcrumbs';
import Button from 'components/base/Button';
import StarRating from 'components/base/StarRating';
import { PlaceholderProfile, Close } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import BuyerNegotiationAlert from 'components/module/BuyerNegotiationAlert';
import ConfirmationModal from 'components/module/ConfirmationModal';
import Loading from 'components/module/Loading';
import MarketRequestDetailPill from 'components/module/MarketRequestDetailPill';
import MarketRequestSummary from 'components/module/MarketRequestSummary';
import NegotiateBuyerModal from 'components/module/NegotiateBuyerModal';
import NegotiationBuyerModal from 'components/module/NegotiationBuyerModal';
import PaymentTimeLeft from 'components/module/PaymentTimeLeft';
import { AvatarPlaceholder } from 'components/module/ProductSellerCard/ProductSellerCard.style';
import { BUYER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import moment from 'moment';
import pathOr from 'ramda/es/pathOr';
import { Row, Col, Hidden, Visible } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { getShippingAddress } from 'routes/Seller/MarketBoard/Landing/Landing.transform';
import { ShippingAddress } from 'types/store/GetActiveOffersState';
import { GetNegotiationByIdRequestResponseItem } from 'types/store/GetNegotiationByIdState';
import { sizeToString } from 'utils/Listing';
import { formatUnitToPricePerUnit } from 'utils/Listing/formatMeasurementUnit';
import { createdAtToExpiry } from 'utils/MarketRequest';
import { transformMarketRequestStatusText } from 'utils/MarketRequest/marketRequestTag';
import { parseImageUrl } from 'utils/parseImageURL';
import { toPrice } from 'utils/String';
import { formatOrderReferenceNumber } from 'utils/String/formatOrderReferenceNumber';
import theme from 'utils/Theme';

import Check from '../../../../components/base/SVG/Check';
import Refresh from '../../../../components/base/SVG/Refresh';
import {
  AlertProps,
  NegotiationDetailsProps,
} from './NegotiationDetails.props';
import {
  FullOfferDetailsContainer,
  CompanyInfoCol,
  TotalPriceContainer,
  DetailsValueContainer,
  StarContainer,
  StyledAcceptButton,
  StyledNegotiateButton,
  StyledTypography,
  StyledTypography2,
  StyledImage,
  StyledNumberRating,
  CTAContainer,
  StyledNegotiateButtonContainer,
  Container,
  HeaderContainer,
  AlertsContainer,
  AcceptNegoDetailContainer,
  DefaultCTAContainer,
  DefaultStyledNegotiateButtonContainer,
  DefaultStyledNegotiateButton,
  DefaultStyledAcceptButton,
  // NewNegoTypeWrapper,
} from './NegotiationDetails.style';

const NegotiationDetailsView = (props: NegotiationDetailsProps) => {
  const {
    handleStartNegotiate,
    handleNegoBtnClick,
    handleAcceptClick,
    handleConfirmOffer,
    isAccepted,
    thereIsNewOffer,
    counterOffer,
    newOffer,
    handlePayNow,
    seller,
    nego,
    closeOnAccept,
    setCloseOnAccept,
    negotiating,
    lastNegotiationsOffers,
    setNegotiating,
    sortedNegotiations,
    submitNegotiation,
    breadCrumb,
    countAcceptedWeight,
    onClickDelete,
    showDelete,
    setShowDelete,
    isLoadingAcceptOffer,
    isLoadingOffer,
    isLoadingConfirmOffer,
    isLoadingNegotiate,
    canNegotiate,
    clickAccept,
    handleDeclineClick,
    clickDecline,
    negotiation,
    handleAcceptConfirm,
    handleDeclineModalConfirmBtnClick,
    handleNegoModalNegoBtnClick,
    isCreateBuyerCounterNegotiationPending,
    handleNegoBtnClick2,
    showBuyerCounterNegoModal,
    isAcceptNegotiationPending,
    showDeclineModal,
    handleDeclineModalCloseBtnClick,
    isDeclineNegotiationPending,
    handleProceedToCheckoutClick,
  } = props;

  const history = useHistory();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const renderTotalPriceContainer = () => (
    <TotalPriceContainer>
      <Typography variant="label" color="shade7" weight="900">
        TOTAL VALUE
      </Typography>
      <Typography
        variant="title3"
        weight="900"
        color="shade9"
        style={{ marginTop: '8px' }}
      >
        {/* {toPrice(
          Number(negotiation?.desired_quantity || '0.00') *
            Number(negotiation?.counter_offer || '0.00')
        )} */}
        {toPrice(
          Number(negotiation?.desired_quantity || '0.00') * Number(price)
        )}
      </Typography>
    </TotalPriceContainer>
  );

  const renderOfferSeenTextContainer = () => (
    <div style={{ marginTop: '16px' }}>
      {!isAccepted && (
        <>
          {!thereIsNewOffer && counterOffer === '' && (
            <div className="computation-item-container">
              <Typography variant="label" color="shade9">
                You have received an offer by the Seller. Either click accept or
                negotiate to proceed.
              </Typography>
            </div>
          )}

          {thereIsNewOffer && counterOffer === newOffer && (
            <div className="computation-item-container">
              <Typography variant="label" color="shade9">
                You have received an offer by the Seller. Either click accept or
                negotiate to proceed.
              </Typography>
            </div>
          )}

          {!thereIsNewOffer && parseFloat(counterOffer) > 0 && (
            <div className="computation-item-container">
              <Typography variant="label" color="shade9">
                The seller is reviewing your offer.
              </Typography>
            </div>
          )}
        </>
      )}
    </div>
  );

  const renderLabel = (label: string, style?: any) => (
    <Typography variant="overline" color="shade10" weight="900" style={style}>
      {label}
    </Typography>
  );

  const renderLabelValue = (value: string | undefined) => (
    <>
      <DetailsValueContainer>
        <StyledTypography weight="700" variant="label">
          {value}
        </StyledTypography>
      </DetailsValueContainer>
    </>
  );

  const sizeValue = sizeToString(
    negotiation?.metric || negotiation?.active_size_unit || '',
    negotiation?.size_from,
    negotiation?.size_to
  );

  // const latestOfferPrice = newOffer !== '' ? newOffer : selectedOffer.price;

  // const quantityValue =
  //   selectedOffer?.weight + ' ' + selectedOffer?.measurementUnit;

  const quantityValue =
    negotiation?.desired_quantity + ' ' + negotiation?.measurement_unit;

  // const pricePerUnit = `${toPrice(
  //   latestOfferPrice
  // )} / ${formatUnitToPricePerUnit(selectedOffer.measurementUnit)}`;

  const negotiationOffer = pathOr(
    {},
    ['negotiation_offer'],
    negotiation
  ) as GetNegotiationByIdRequestResponseItem['negotiation_offer'];

  const price =
    negotiationOffer?.counter_offer || negotiation?.counter_offer || '0.00';

  const pricePerUnit = `${toPrice(price)} per ${formatUnitToPricePerUnit(
    negotiation?.measurement_unit
  )}`;

  // const mrStatusProps = transformMarketRequestStatusText(
  //   theme,
  //   selectedOffer.statusText,
  //   false,
  //   [`${formatOrderReferenceNumber(selectedOffer.orderRefNumber)}`]
  // );

  const AlertContent = (props: { text: string; description: string }) => {
    if (props.text === 'Finalised') {
      return (
        <span
          onClick={() => history.replace(BUYER_ROUTES.ORDERS)}
          style={{ cursor: 'pointer' }}
        >
          {props.description}
        </span>
      );
    }
    // if (props.text === 'Payment Required') {
    //   return (
    //     <>
    //       {props.description}
    //       <PaymentTimeLeft timeLeft={selectedOffer.expiryDate} />
    //     </>
    //   );
    // }
    return <>{props.description}</>;
  };

  const reworkDisplayStatus = (displayStatus: string) => {
    let modifiedDisplayStatus = displayStatus;

    if (displayStatus === 'PARTIAL') {
      modifiedDisplayStatus = 'Payment Required';
    }

    if (displayStatus === 'END') {
      modifiedDisplayStatus = 'Declined';
    }

    return modifiedDisplayStatus;
  };

  const identifyTimeLimit = () => {
    const isFresh = negotiation.specifications.filter(
      (spec) => spec.name.toLowerCase() === 'fresh'
    );

    const timeLimit = isFresh || negotiation.is_pre_auction ? '3' : '24';

    return timeLimit;
  };

  const getAlertProps = (): AlertProps => {
    // switch (
    //   reworkDisplayStatus(negotiation?.display_status?.toLowerCase() || '')
    // )
    switch (reworkDisplayStatus('Payment Missed'.toLowerCase())) {
      case 'end':
        return {
          title: 'Negotiation Declined',
          alertColor: 'error',
          description: (
            <Typography variant="body" color="shade6" weight="400">
              Your negotiation was declined by the Seller.
            </Typography>
          ),
        };
      case 'payment required':
        return {
          title: 'Payment Required',
          alertColor: 'primary',
          description: (
            <>
              <Typography variant="body" color="shade6" weight="400">
                Please process the payment within {identifyTimeLimit()} hours.
              </Typography>
              <Typography variant="body" color="shade6" weight="400">
                This negotiation will automatically close if payment is not
                received.
              </Typography>
            </>
          ),
        };
      case 'payment missed':
        return {
          title: 'Payment Missed',
          alertColor: 'error',
          description: (
            <>
              <Typography variant="body" color="shade6" weight="400">
                The offer has automatically closed due to missed payment.
              </Typography>
            </>
          ),
        };

      case 'awaiting seller':
        return {
          title: 'Awaiting Seller',
          alertColor: 'alert',
          description: (
            <Typography variant="body" color="shade6" weight="400">
              Your negotiation is being reviewed by the Seller
            </Typography>
          ),
        };

      case '':
        if (negotiation?.status === 'END') {
          return {
            title: 'Negotiation Finalised',
            alertColor: 'success',
            description: (
              <Typography variant="body" color="shade6" weight="400">
                The Negotiation is now Order #0000-XXXX and can be found in your
                sold tab{' '}
                <span
                  style={{
                    color: theme.brand.primary,
                    textDecoration: 'underline',
                  }}
                  // onClick={() => history.push(SOLD_)}
                >
                  here
                </span>
                .
              </Typography>
            ),
          };
        } else {
          return {
            title: '',
            alertColor: 'primary',
            description: <></>,
          };
        }
      case 'finalised':
        return {
          title: 'Negotiation Finalised',
          alertColor: 'success',
          description: (
            <Typography variant="body" color="shade6" weight="400">
              The Negotiation is now Order #0000-XXXX and can be found in your
              sold tab{' '}
              <span
                style={{
                  color: theme.brand.primary,
                  textDecoration: 'underline',
                }}
                // onClick={() => history.push(SOLD_)}
              >
                here
              </span>
              .
            </Typography>
          ),
        };

      case 'new negotiation':
        return {
          title: 'New Negotiation',
          alertColor: 'alert',
          description: (
            <Typography variant="body" color="shade6" weight="400">
              A buyer has sent you a negotiation for{' '}
              {/* <NewNegoTypeWrapper>{negotiation?.name}</NewNegoTypeWrapper> */}
            </Typography>
          ),
        };

      case 'awaiting buyer':
        return {
          title: 'Awaiting Buyer',
          alertColor: 'alert',
          description: (
            <Typography variant="body" color="shade6" weight="400">
              The buyer will respond to your offer soon.
            </Typography>
          ),
        };

      case 'awaiting payment':
        return {
          title: 'Negotiation Accepted-Pending Payment',
          alertColor: 'primary',
          description: (
            <Typography variant="body" color="shade6" weight="400">
              The sale will be finalised once the Buyer processes your payment
              within 24 hours. You will be notified when this occurs.
            </Typography>
          ),
        };

      // case 'lost':
      //   return {
      //     title: 'New Negotiation',
      //     alertColor: 'noshade',
      //     description: (
      //      Buyer has sent you a negotiation for ${productTypeName}`,
      //   };

      // case 'declined':
      //   return {
      //     title: 'Negotiation Declined',
      //     alertColor: 'error',
      //     description: (
      //       <Typography variant="body" color="shade6" weight="400">
      //         The Buyer declined your counter-offer for{' '}
      //         <NewNegoTypeWrapper>{negotiation?.name}</NewNegoTypeWrapper>
      //       </Typography>
      //     ),
      //   };

      default:
        return {
          title: '',
          alertColor: 'primary',
          description: <></>,
        };
    }
  };

  // const negotiatedPrice =
  //   sortedNegotiations.length === 0
  //     ? selectedOffer?.price
  //     : lastNegotiationsOffers[lastNegotiationsOffers.length - 1]?.price;
  const renderLeftComponent = () => (
    <Col sm={12} md={12} xl={8}>
      {negotiation && (
        <AlertsContainer>
          <BuyerNegotiationAlert
            content={getAlertProps().description}
            header={getAlertProps().title}
            variant={getAlertProps().alertColor}
            status={negotiation?.display_status?.toLowerCase() || ''}
            fullWidth
          />
        </AlertsContainer>
      )}
      {/* {mrStatusProps.text && (
        <AlertsContainer>
          <Alert
            content={
              <AlertContent
                text={mrStatusProps.text}
                description={mrStatusProps.description}
              />
            }
            header={mrStatusProps.alertTitle}
            variant={mrStatusProps.variantColor || 'info'}
            color={mrStatusProps.tagColor}
            fullWidth
          />
        </AlertsContainer>
      )} */}

      <FullOfferDetailsContainer>
        <Row>
          <Col>
            {renderLabel('SPECIFICATION')}
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {negotiation?.specifications?.map((spec) => (
                <div key={spec.id} style={{ marginRight: 8 }}>
                  {renderLabelValue(spec.name)}
                </div>
              ))}
            </div>

            {renderLabel('SIZE', { marginTop: '24px' })}
            {renderLabelValue(sizeValue)}

            {renderLabel('QUANTITY', { marginTop: '24px' })}
            {renderLabelValue(quantityValue.toLowerCase())}

            {renderLabel('PRICE', { marginTop: '24px' })}
            {renderLabelValue(pricePerUnit.toLowerCase())}

            {renderLabel('Delivery Address', { marginTop: '24px' })}
            {renderLabelValue(
              // eslint-disable-next-line react/prop-types
              // getShippingAddress(offerMR.shippingTo as ShippingAddress)
              'negotiation.shippingTo'
            )}
          </Col>
        </Row>
        <Hidden xs sm>
          {/* {negotiation?.status !== 'ACCEPTED' &&
            negotiation?.status !== 'PARTIAL' && (
              <DefaultCTAContainer>
                <DefaultStyledNegotiateButtonContainer>
                  <DefaultStyledNegotiateButton
                    onClick={() => handleStartNegotiate()}
                    variant="outline"
                    text="NEGOTIATE"
                    icon={<Refresh />}
                    disabled={!thereIsNewOffer && parseFloat(counterOffer) > 0}
                  />
                </DefaultStyledNegotiateButtonContainer>
                <div style={{ width: '124px' }}>
                  <DefaultStyledAcceptButton
                    text="ACCEPT"
                    icon={<Check width={10} height={9} />}
                    onClick={() => handleConfirmOffer()}
                    disabled={!thereIsNewOffer && parseFloat(counterOffer) > 0}
                  />
                </div>
              </DefaultCTAContainer>
            )} */}

          {negotiation?.status !== 'ACCEPTED' &&
            negotiation?.status !== 'PARTIAL' &&
            negotiation?.status !== 'DECLINED' &&
            negotiation?.status !== 'LOST' && (
              <CTAContainer>
                <div style={{ display: 'flex' }}>
                  <Button
                    onClick={() => handleDeclineClick(true)}
                    variant="outline"
                    text={
                      <Typography color="primary" style={{ marginRight: 5 }}>
                        Decline
                      </Typography>
                    }
                    icon={<Close fill={theme.brand.primary} />}
                    style={{ width: '100%', marginRight: 10 }}
                  />
                  <Button
                    text={
                      <Typography color="noshade" style={{ marginRight: 5 }}>
                        Negotiate
                      </Typography>
                    }
                    icon={<Refresh fill={theme.grey.noshade} />}
                    onClick={handleNegoBtnClick2}
                    disabled={negotiation?.display_status !== 'Counter Offer'}
                    style={{ marginRight: 10, width: '100%' }}
                  />
                </div>
                <div style={{ width: '124px' }}>
                  <StyledAcceptButton
                    text={
                      <Typography color="noshade" style={{ marginRight: 5 }}>
                        Accept
                      </Typography>
                    }
                    icon={<Check width={10} height={9} />}
                    onClick={() => handleAcceptClick(true)}
                    disabled={negotiation?.display_status !== 'Counter Offer'}
                  />
                </div>
              </CTAContainer>
            )}

          {negotiation?.status === 'PARTIAL' && (
            <CTAContainer
            // onClick={() =>
            //   history.push(
            //     BUYER_ROUTES.NEGOTIATION_CHECKOUT(negotiation?.id || '')
            //   )
            // }
            >
              <div style={{ width: 'fit-content' }}>
                <StyledAcceptButton
                  text={
                    <Typography
                      variant="label"
                      weight="700"
                      color="noshade"
                      style={{ fontFamily: 'Basis Grotesque Pro' }}
                      disabled={true}
                    >
                      Proceed To Checkout (WAITING FOR BE)
                    </Typography>
                  }
                  // icon={<Check width={10} height={9} />}
                  // onClick={handleProceedToCheckoutClick}
                />
              </div>
            </CTAContainer>
          )}
        </Hidden>
      </FullOfferDetailsContainer>
    </Col>
  );

  if (isLoadingAcceptOffer || isLoadingOffer || isLoadingNegotiate) {
    return <Loading />;
  }

  return (
    <Container>
      <ConfirmationModal
        isOpen={clickAccept}
        onClickClose={() => handleAcceptClick(false)}
        title={
          <Typography
            variant="title4"
            color="shade8"
            weight="900"
            style={{ fontFamily: 'Canela' }}
          >
            Accept Negotiation
          </Typography>
        }
        action={handleAcceptConfirm}
        actionText="Accept"
        hideCancel={true}
        disableActionText={isAcceptNegotiationPending}
        description={
          <div style={{ marginTop: 20 }}>
            <AcceptNegoDetailContainer>
              <Typography color="shade6" variant="label">
                Seller&apos;s Negotiated Price
              </Typography>
              <Typography color="shade8" variant="label">
                {pricePerUnit}
              </Typography>
            </AcceptNegoDetailContainer>
            <AcceptNegoDetailContainer>
              <Typography color="shade6" variant="label">
                Quantity
              </Typography>
              <Typography color="shade8" variant="label">
                {quantityValue.toLowerCase()}
              </Typography>
            </AcceptNegoDetailContainer>
            <AcceptNegoDetailContainer>
              <Typography color="shade6" variant="label">
                Total Product Value
              </Typography>
              <Typography
                color="shade8"
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  fontFamily: 'Basis Grotesque Pro',
                }}
              >
                {/* {toPrice(
                  Number(negotiation?.desired_quantity || '0.00') *
                    Number(negotiation?.counter_offer || '0.00')
                )} */}
                {toPrice(
                  Number(negotiation?.desired_quantity || '0.00') *
                    Number(price)
                )}
              </Typography>
            </AcceptNegoDetailContainer>
          </div>
        }
      />
      <ConfirmationModal
        isOpen={showDeclineModal}
        onClickClose={handleDeclineModalCloseBtnClick}
        title={
          <Typography
            variant="title4"
            color="shade8"
            weight="900"
            style={{ fontFamily: 'Canela' }}
          >
            Decline Confirmation
          </Typography>
        }
        action={handleDeclineModalConfirmBtnClick}
        actionText="Confirm"
        cancelText="Cancel"
        disableActionText={isDeclineNegotiationPending}
        description={
          <div style={{ marginTop: 15 }}>
            <Typography color="shade6" variant="body">
              Are you sure you want to decline this negotiation?
            </Typography>
            <Typography color="shade6" variant="body" style={{ marginTop: 10 }}>
              The negotiation will automatically close and you will not be
              refunded any negotiation credits
            </Typography>
          </div>
        }
        style={{ maxWidth: 686 }}
      />
      <ConfirmationModal
        isOpen={props.showOfferSentModal}
        onClickClose={() => props.onConfirmSentOffer()}
        title="Offer submitted"
        action={() => props.onConfirmSentOffer()}
        actionText="View offers"
        hideCancel={true}
        description={
          <>
            <Typography color="shade8" variant="body">
              The seller will review your offer.{' '}
            </Typography>
            <Typography color="shade8" variant="body">
              Please ensure you have notifications turned on so that you stay up
              to date on this offer.
            </Typography>
          </>
        }
      />
      <ConfirmationModal
        isOpen={props.showConfirmOfferSentModal}
        onClickClose={() => props.onCloseAcceptSentModal()}
        title="Offer accepted"
        action={() => props.onPayNow()}
        actionText="Pay now"
        hideCancel={true}
        description={
          <>
            <Typography color="shade8" variant="body">
              Please finalise your payment within 24 hours to confirm the sale.
            </Typography>
          </>
        }
      />
      <ConfirmationModal
        isOpen={showDelete}
        title="Delete Market Request"
        description="Are you sure you want to delete this market request?"
        action={() => {
          onClickDelete && onClickDelete();
        }}
        actionText="DELETE"
        onClickClose={() => setShowDelete(false)}
      />
      <NegotiationBuyerModal
        isOpen={showBuyerCounterNegoModal}
        onClickClose={handleNegoBtnClick2}
        onSubmitClick={handleNegoModalNegoBtnClick}
        negotiation={negotiation}
        isCreateBuyerCounterNegotiationPending={
          isCreateBuyerCounterNegotiationPending
        }
      />
      {/* <NegotiateBuyerModal
        closeOnAccept={closeOnAccept}
        setCloseOnAccept={setCloseOnAccept}
        onSubmit={submitNegotiation}
        originalOffer={Number(negotiation?.counter_offer || '0.00')}
        counterOffer={counterOffer}
        newOffer={newOffer}
        weight={{
          unit: negotiation?.measurement_unit || '',
          value: Number(negotiation?.desired_quantity || '0'),
        }}
        isOpen={negotiating}
        onClickClose={() => {
          setNegotiating(false);
        }}
        sortedNegotiations={sortedNegotiations}
        modalLastNegotiationsArray={lastNegotiationsOffers}
        // negotiation={negotiation}
      /> */}
      <Hidden xs sm>
        <HeaderContainer>
          <div>
            <Breadcrumbs sections={breadCrumb} />
          </div>
        </HeaderContainer>
      </Hidden>
      <Row>
        <Col>
          <Typography color="shade9" font-weight="700" altFont variant="title5">
            {negotiation?.name}
          </Typography>
          <Typography
            color="shade9"
            font-weight="700"
            style={{
              fontFamily: 'Basis Grotesque Pro',
              margin: '12px 0 32px 0',
            }}
          >
            Below are the details of the negotiation.
          </Typography>
        </Col>
      </Row>
      <Row gutterWidth={30}>
        <Hidden xs sm md lg>
          {renderLeftComponent()}
          <Col sm={12} md={12} xl={4}>
            {renderTotalPriceContainer()}
          </Col>
        </Hidden>
        <Visible xs sm md lg>
          <Col sm={12} md={12} xl={4}>
            {renderTotalPriceContainer()}
          </Col>
          {/* {renderRightComponent()} */}
          {renderLeftComponent()}
        </Visible>
      </Row>

      <Visible xs sm>
        <Row>
          <Col>{renderTotalPriceContainer()}</Col>
        </Row>

        {/* {selectedOffer?.status !== 'ACCEPTED' &&
          selectedOffer?.status !== 'PARTIAL' &&
          selectedOffer?.status !== 'DECLINED' && (
            <>
              <Row>
                <Col>{renderOfferSeenTextContainer()}</Col>
              </Row>
              <Row style={{ marginTop: '40px' }}>
                <Col style={{ paddingRight: '5px' }}>
                  <StyledNegotiateButton
                    onClick={() => handleStartNegotiate()}
                    variant="outline"
                    text="NEGOTIATE"
                    icon={<Refresh />}
                    disabled={!thereIsNewOffer && parseFloat(counterOffer) > 0}
                  />
                </Col>
                <Col style={{ paddingLeft: '5px' }}>
                  <StyledAcceptButton
                    text="ACCEPT"
                    icon={<Check width={10} height={9} />}
                    onClick={() => handleConfirmOffer()}
                    loading={isLoadingConfirmOffer}
                    disabled={!thereIsNewOffer && parseFloat(counterOffer) > 0}
                  />
                </Col>
              </Row>
            </>
          )}
        {selectedOffer?.status === 'PARTIAL' && (
          <CTAContainer>
            <div style={{ width: '124px' }}>
              <StyledAcceptButton
                text="Pay Now"
                icon={<Check width={10} height={9} />}
                onClick={() => handlePayNow()}
                // onClick={() => handleAcceptOffer()}
                disabled={!thereIsNewOffer && parseFloat(counterOffer) > 0}
              />
            </div>
          </CTAContainer>
        )}

        {selectedOffer?.status !== 'ACCEPTED' &&
          selectedOffer?.status !== 'PARTIAL' &&
          selectedOffer?.status !== 'DECLINED' && 
          negotiation?.status !== 'LOST' && (
            <>
              <Row>
                <Col>{renderOfferSeenTextContainer()}</Col>
              </Row>
              <Row style={{ marginTop: '40px' }}>
                <Col style={{ paddingRight: 5, marginTop: 5 }}>
                  <Button
                    onClick={() => handleDeclineClick(true)}
                    variant="outline"
                    text={
                      <Typography color="primary" style={{ marginRight: 5 }}>
                        Decline
                      </Typography>
                    }
                    icon={<Close fill={theme.brand.primary} />}
                    style={{ width: '100%', padding: '15px 28px' }}
                  />
                </Col>
                <Col style={{ paddingRight: 5, marginTop: 5 }}>
                  <StyledNegotiateButton
                    onClick={handleNegoBtnClick2}
                    variant="outline"
                    text={
                      <Typography color="noshade" style={{ marginRight: 5 }}>
                        Negotiate
                      </Typography>
                    }
                    icon={<Refresh fill={theme.grey.noshade} />}
                    disabled={negotiation?.display_status !== 'Counter Offer'}
                    style={{ backgroundColor: theme.brand.primary }}
                  />
                </Col>
                <Col style={{ paddingRight: 5, marginTop: 5 }}>
                  <StyledAcceptButton
                    text={
                      <Typography color="noshade" style={{ marginRight: 5 }}>
                        Accept
                      </Typography>
                    }
                    icon={<Check width={10} height={9} />}
                    onClick={() => handleAcceptClick(true)}
                    loading={isLoadingConfirmOffer}
                    disabled={negotiation?.display_status !== 'Counter Offer'}
                  />
                </Col>
              </Row>
            </>
          )} */}
      </Visible>
    </Container>
  );
};

export default NegotiationDetailsView;
