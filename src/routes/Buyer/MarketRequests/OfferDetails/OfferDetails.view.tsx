import React from 'react';

import Alert from 'components/base/Alert';
import Breadcrumbs from 'components/base/Breadcrumbs';
import StarRating from 'components/base/StarRating';
import { PlaceholderProfile } from 'components/base/SVG';
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
} from './OfferDetails.style';

const OfferDetailsView = (props: OfferDetailsProps) => {
  const {
    handleStartNegotiate,
    handleAcceptOffer,
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
  } = props;

  const history = useHistory();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const renderTotalPriceContainer = () => (
    <TotalPriceContainer>
      <Typography variant="label" color="shade7" weight="900">
        TOTAL VALUE
      </Typography>
      <Typography variant="label" color="shade6">
        Incl. Delivery
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
    [`${selectedOffer.orderRefNumber}`]
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
          <Row>
            <Col>{renderTotalPriceContainer()}</Col>
          </Row>

          {selectedOffer?.status !== 'ACCEPTED' &&
            selectedOffer?.status !== 'PARTIAL' &&
            selectedOffer?.status !== 'DECLINED' && (
              <CTAContainer>
                <StyledNegotiateButtonContainer>
                  <StyledNegotiateButton
                    onClick={() => handleStartNegotiate()}
                    variant="outline"
                    text="NEGOTIATE"
                    icon={<Refresh />}
                    disabled={!thereIsNewOffer && parseFloat(counterOffer) > 0}
                  />
                </StyledNegotiateButtonContainer>
                <div style={{ width: '124px' }}>
                  <StyledAcceptButton
                    text="ACCEPT"
                    icon={<Check width={10} height={9} />}
                    onClick={() => handleConfirmOffer()}
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
            <MarketRequestDetailPill
              countAcceptedWeight={countAcceptedWeight}
              imgUrl={marketRequest?.image || ''}
              measurementUnit={marketRequest?.measurementUnit || ''}
              onClickDelete={() => setShowDelete(true)}
              weight={marketRequest?.weight}
              expiry={createdAtToExpiry(marketRequest?.createdAt)}
            />
            <MarketRequestSummary
              measurementUnit={marketRequest?.measurementUnit || ''}
              metric={marketRequest?.metric || ''}
              sizeOptions={marketRequest?.size.options || []}
              sizeUngraded={marketRequest?.sizeUngraded || false}
              sizeFrom={marketRequest?.size.from}
              sizeTo={marketRequest?.size.to}
              specs={marketRequest?.specs}
              weight={marketRequest?.weight}
            />
          </Col>
        </Hidden>
        <Visible xs sm md lg>
          <Col sm={12} md={12} xl={4}>
            <MarketRequestDetailPill
              countAcceptedWeight={countAcceptedWeight}
              imgUrl={marketRequest?.image || ''}
              measurementUnit={marketRequest?.measurementUnit || ''}
              onClickDelete={() => setShowDelete(true)}
              weight={marketRequest?.weight}
              expiry={createdAtToExpiry(marketRequest?.createdAt)}
            />
          </Col>
          {/* {renderRightComponent()} */}
          {renderLeftComponent()}
        </Visible>
        <Visible md lg>
          <Col>
            <MarketRequestSummary
              measurementUnit={marketRequest?.measurementUnit || ''}
              metric={marketRequest?.metric || ''}
              sizeOptions={marketRequest?.size.options || []}
              sizeUngraded={marketRequest?.sizeUngraded || false}
              sizeFrom={marketRequest?.size.from}
              sizeTo={marketRequest?.size.to}
              specs={marketRequest?.specs}
              weight={marketRequest?.weight}
            />
          </Col>
        </Visible>
      </Row>

      <Visible xs sm>
        <Row>
          <Col>{renderTotalPriceContainer()}</Col>
        </Row>

        {selectedOffer?.status !== 'ACCEPTED' &&
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
                onClick={() => handleAcceptOffer()}
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
