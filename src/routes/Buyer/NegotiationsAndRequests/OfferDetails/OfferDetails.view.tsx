import React from 'react';

import Alert from 'components/base/Alert';
import Breadcrumbs from 'components/base/Breadcrumbs';
import Button from 'components/base/Button';
import StarRating from 'components/base/StarRating';
import { PlaceholderProfile, Close } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import ConfirmationModal from 'components/module/ConfirmationModal';
import Loading from 'components/module/Loading';
import MarketRequestDetailPill from 'components/module/MarketRequestDetailPill';
import MarketRequestSummary from 'components/module/MarketRequestSummary';
import NegotiateBuyerModal from 'components/module/NegotiateBuyerModal';
import PaymentTimeLeft from 'components/module/PaymentTimeLeft';
import { AvatarPlaceholder } from 'components/module/ProductSellerCard/ProductSellerCard.style';
import { BUYER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import moment from 'moment';
import { Row, Col, Hidden, Visible } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { getShippingAddress } from 'routes/Seller/MarketBoard/Landing/Landing.transform';
import { ShippingAddress } from 'types/store/GetActiveOffersState';
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
import { OfferDetailsProps } from './OfferDetails.props';
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
} from './OfferDetails.style';

const OfferDetailsView = (props: OfferDetailsProps) => {
  const {
    handleNegoBtnClick,
    handleAcceptClick,
    handleConfirmOffer,
    isAccepted,
    thereIsNewOffer,
    counterOffer,
    newOffer,
    selectedOffer,
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
    marketRequest,
    countAcceptedWeight,
    onClickDelete,
    showDelete,
    setShowDelete,
    isLoadingAcceptOffer,
    isLoadingOffer,
    isLoadingConfirmOffer,
    isLoadingNegotiate,
    offerMR,
    canNegotiate,
    clickAccept,
    handleDeclineClick,
    clickDecline,
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
        <sup className="sup-text-2">$</sup>
        {toPrice(
          (selectedOffer?.weight || 0) *
            (nego?.price || selectedOffer?.price || 0)
        ).replace('$', '')}
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
    <DetailsValueContainer>
      <StyledTypography weight="900" variant="overline">
        {value}
      </StyledTypography>
    </DetailsValueContainer>
  );

  const sizeValue = sizeToString(
    selectedOffer?.metric || '',
    selectedOffer?.size?.from,
    selectedOffer?.size?.to
  ).toUpperCase();

  const latestOfferPrice = newOffer !== '' ? newOffer : selectedOffer.price;

  const quantityValue =
    selectedOffer?.weight + ' ' + selectedOffer?.measurementUnit;
  const pricePerUnit = `${toPrice(
    latestOfferPrice
  )} / ${formatUnitToPricePerUnit(selectedOffer.measurementUnit)}`;

  const mrStatusProps = transformMarketRequestStatusText(
    theme,
    selectedOffer.statusText,
    false,
    [`${formatOrderReferenceNumber(selectedOffer.orderRefNumber)}`]
  );

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
    if (props.text === 'Payment Required') {
      return (
        <>
          {props.description}
          <PaymentTimeLeft timeLeft={selectedOffer.expiryDate} />
        </>
      );
    }
    return <>{props.description}</>;
  };

  const negotiatedPrice =
    sortedNegotiations.length === 0
      ? selectedOffer?.price
      : lastNegotiationsOffers[lastNegotiationsOffers.length - 1]?.price;
  const renderLeftComponent = () => (
    <Col sm={12} md={12} xl={8}>
      {mrStatusProps.text && (
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
      )}

      <FullOfferDetailsContainer>
        <Row>
          <Col>
            {renderLabel('SPECIFICATION')}
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {selectedOffer?.specifications?.map((spec) => (
                <div key={spec} style={{ marginRight: 8 }}>
                  {renderLabelValue(spec)}
                </div>
              ))}
            </div>

            {renderLabel('SIZE', { marginTop: '24px' })}
            {renderLabelValue(sizeValue)}

            {renderLabel('QUANTITY', { marginTop: '24px' })}
            {renderLabelValue(quantityValue)}

            {renderLabel('PRICE', { marginTop: '24px' })}
            {renderLabelValue(pricePerUnit)}

            {renderLabel(
              isMobile ? 'Est. Delivery Date' : 'Estimated Delivery Date',
              { marginTop: '24px' }
            )}
            {renderLabelValue(
              moment(selectedOffer?.deliveryDate).format('MMMM DD, YYYY')
            )}

            {renderLabel('Delivery Address', { marginTop: '24px' })}
            {renderLabelValue(
              // eslint-disable-next-line react/prop-types
              getShippingAddress(offerMR.shippingTo as ShippingAddress)
            )}
          </Col>
          <CompanyInfoCol xl={3}>
            <div style={{ display: 'flex' }}>
              {seller?.image ? (
                <StyledImage src={parseImageUrl(seller?.image || '')} />
              ) : (
                <AvatarPlaceholder
                  width="48px"
                  height="48px"
                  borderRadius="8px"
                >
                  <PlaceholderProfile width={48} height={48} />
                </AvatarPlaceholder>
              )}

              <StyledTypography2 weight="400" variant="label" color="shade9">
                {seller?.name || ''}
              </StyledTypography2>
            </div>

            {/* <StarContainer>
              <StyledNumberRating variant="caption" color="shade7">
                {seller?.rating || 0}
              </StyledNumberRating>
              <StarRating
                rating={seller?.rating || 0}
                spacing={3}
                starSize={13}
                unfilledColor={theme.brand.alert}
              />
            </StarContainer> */}

            <Typography
              variant="caption"
              color="shade7"
              style={{ marginTop: '4px' }}
            >
              {Object.values(seller?.address || {}).join(', ')}
            </Typography>
          </CompanyInfoCol>
        </Row>
        <Hidden xs sm>
          {selectedOffer?.status !== 'ACCEPTED' &&
            selectedOffer?.status !== 'PARTIAL' &&
            selectedOffer?.status !== 'DECLINED' && (
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
                    onClick={() => handleNegoBtnClick(true)}
                    disabled={!thereIsNewOffer && parseFloat(counterOffer) > 0}
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
                    disabled={!thereIsNewOffer && parseFloat(counterOffer) > 0}
                  />
                </div>
              </CTAContainer>
            )}
          {selectedOffer?.status === 'PARTIAL' && (
            <CTAContainer>
              <div style={{ width: '124px' }}>
                <StyledAcceptButton
                  text="Pay Now"
                  icon={<Check width={10} height={9} />}
                  onClick={() => handlePayNow()}
                  disabled={!thereIsNewOffer && parseFloat(counterOffer) > 0}
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
        isOpen={false}
        onClickClose={() => {
          console.log('');
        }}
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
        action={() => {
          console.log('');
        }}
        actionText="Accept"
        hideCancel={true}
        description={
          <div style={{ marginTop: 20 }}>
            <AcceptNegoDetailContainer>
              <Typography color="shade6" variant="label">
                Seller&apos;s Negotiated Price:
              </Typography>
              <Typography color="shade6" variant="label">
                {toPrice(negotiatedPrice)}/
                {formatUnitToPricePerUnit(selectedOffer.measurementUnit)}
              </Typography>
            </AcceptNegoDetailContainer>
            <AcceptNegoDetailContainer>
              <Typography color="shade6" variant="label">
                Quantity:
              </Typography>
              <Typography color="shade8" variant="label">
                {quantityValue.toLowerCase()}
              </Typography>
            </AcceptNegoDetailContainer>
            <AcceptNegoDetailContainer>
              <Typography color="shade6" variant="label">
                Total Product Value:
              </Typography>
              <Typography
                color="shade8"
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  fontFamily: 'Basis Grotesque Pro',
                }}
              >
                {toPrice(selectedOffer?.weight * negotiatedPrice)}
              </Typography>
            </AcceptNegoDetailContainer>
          </div>
        }
      />
      <ConfirmationModal
        isOpen={false}
        onClickClose={() => {
          console.log('');
        }}
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
        action={() => {
          console.log('');
        }}
        actionText="Confirm"
        cancelText="Cancel"
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
      <NegotiateBuyerModal
        closeOnAccept={closeOnAccept}
        setCloseOnAccept={setCloseOnAccept}
        onSubmit={submitNegotiation}
        originalOffer={selectedOffer?.price}
        counterOffer={counterOffer}
        newOffer={newOffer}
        weight={{
          unit: selectedOffer?.measurementUnit,
          value: selectedOffer?.weight,
        }}
        isOpen={negotiating}
        onClickClose={() => {
          setNegotiating(false);
        }}
        sortedNegotiations={sortedNegotiations}
        modalLastNegotiationsArray={lastNegotiationsOffers}
      />
      <Hidden xs sm>
        <HeaderContainer>
          <div>
            <Breadcrumbs sections={breadCrumb} />
          </div>
        </HeaderContainer>
      </Hidden>
      <Row>
        {' '}
        <Col>
          <Typography color="shade9" font-weight="700" altFont variant="title5">
            {marketRequest.type}
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
        {selectedOffer?.status !== 'ACCEPTED' &&
          selectedOffer?.status !== 'PARTIAL' &&
          selectedOffer?.status !== 'DECLINED' && (
            <>
              <Row>
                <Col>{renderOfferSeenTextContainer()}</Col>
              </Row>
              <Row style={{ marginTop: '40px' }}>
                <Col style={{ paddingRight: 5, marginTop: 5 }}>
                  <Button
                    onClick={() => {
                      console.log('');
                    }}
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
                    onClick={() => handleNegoBtnClick(true)}
                    variant="outline"
                    text={
                      <Typography color="noshade" style={{ marginRight: 5 }}>
                        Negotiate
                      </Typography>
                    }
                    icon={<Refresh fill={theme.grey.noshade} />}
                    disabled={!thereIsNewOffer && parseFloat(counterOffer) > 0}
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
                onClick={() => handleConfirmOffer()}
                disabled={!thereIsNewOffer && parseFloat(counterOffer) > 0}
              />
            </div>
          </CTAContainer>
        )}
      </Visible>
    </Container>
  );
};

export default OfferDetailsView;
