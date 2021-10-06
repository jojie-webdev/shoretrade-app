import React, { ReactNode, useEffect, useState } from 'react';

import Alert from 'components/base/Alert';
import { AlertProps } from 'components/base/Alert/Alert.props';
import Badge from 'components/base/Badge/Badge.view';
import Breadcrumbs from 'components/base/Breadcrumbs';
import { PlaceholderProfile, Star, StarFilled } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import ConfirmationModal from 'components/module/ConfirmationModal';
import MarketRequestDetailPill from 'components/module/MarketRequestDetailPill';
import MarketRequestSummary from 'components/module/MarketRequestSummary';
import NegotiateBuyerModal from 'components/module/NegotiateBuyerModal';
import { AvatarPlaceholder } from 'components/module/ProductSellerCard/ProductSellerCard.style';
import { BUYER_ROUTES } from 'consts';
import moment from 'moment';
import { prop, sortBy } from 'ramda';
import { Row, Col, Hidden, Visible } from 'react-grid-system';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getShippingAddress } from 'routes/Seller/MarketBoard/Landing/Landing.transform';
import { Offer } from 'types/store/GetActiveOffersState';
import { sizeToString } from 'utils/Listing';
import { createdAtToExpiry } from 'utils/MarketRequest';
import { getOfferStatus } from 'utils/MarketRequest/offerStatus';
import { parseImageUrl } from 'utils/parseImageURL';
import theme from 'utils/Theme';

import Check from '../../../../components/base/SVG/Check';
import Refresh from '../../../../components/base/SVG/Refresh';
import { Store } from '../../../../types/store/Store';
import { StatusBadgeText } from '../RequestDetails/RequestDetails.style';
import { OfferDetailsProps } from './OfferDetails.props';
import {
  FullOfferDetailsContainer,
  CompanyInfoCol,
  TotalPriceContainer,
  DetailsValueContainer,
  StarContainer,
  StyledAcceptButton,
  StyledNegotiateButton,
  TagsContainer,
  StyledTypography,
  StyledTypography2,
  StyledImage,
  StyledNumberRating,
  CTAContainer,
  StyledNegotiateButtonContainer,
  NoActionsYetBadgesContainer,
  Container,
  HeaderContainer,
  AlertsContainer,
} from './OfferDetails.style';

const OfferDetailsView = (props: OfferDetailsProps) => {
  const {
    handleStartNegotiate,
    handleAcceptOffer,
    isAccepted,
    thereIsNewOffer,
    counterOffer,
    newOffer,
    selectedOffer,
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
  } = props;

  const history = useHistory();

  const renderTotalPriceContainer = () => (
    <TotalPriceContainer>
      <Typography variant="overline" color="shade7" weight="900">
        TOTAL VALUE
      </Typography>
      <Typography
        variant="title3"
        weight="400"
        color="shade9"
        style={{ marginTop: '8px' }}
      >
        $
        {(
          (selectedOffer?.weight || 0) *
          (nego?.price || selectedOffer?.price || 0)
        )?.toFixed(2)}
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
                You have received an selectedOffer by the Seller. Either click
                accept or negotiate to proceed.
              </Typography>
            </div>
          )}

          {thereIsNewOffer && counterOffer === newOffer && (
            <div className="computation-item-container">
              <Typography variant="label" color="shade9">
                You have received an selectedOffer by the Seller. Either click
                accept or negotiate to proceed.
              </Typography>
            </div>
          )}

          {!thereIsNewOffer && parseFloat(counterOffer) > 0 && (
            <div className="computation-item-container">
              <Typography variant="label" color="shade9">
                The seller is reviewing your selectedOffer.
              </Typography>
            </div>
          )}
        </>
      )}
    </div>
  );

  const renderLabel = (label: string, style?: any) => (
    <Typography variant="overline" color="shade6" weight="900" style={style}>
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

  const specsValue = selectedOffer?.specifications
    ?.map((spec: string) => spec?.toUpperCase())
    ?.join(', ');

  const sizeValue = sizeToString(
    selectedOffer?.metric || '',
    selectedOffer?.size?.from,
    selectedOffer?.size?.to
  ).toUpperCase();

  const quantityValue =
    selectedOffer?.weight + ' ' + selectedOffer?.measurementUnit;

  const buildAlertProperties = () => {
    const offerStatus = getOfferStatus(selectedOffer, 'buyer');

    const contentTypo = (content: string): ReactNode => (
      <Typography component={'span'} variant="body" color="shade6" weight="400">
        {content}
      </Typography>
    );

    let alertProps = {} as AlertProps;

    if (
      offerStatus === 'NEGOTIATION' &&
      !thereIsNewOffer &&
      parseFloat(counterOffer) > 0
    ) {
      alertProps = {
        variant: 'infoAlert',
        header: 'In Negotiation',
        content: contentTypo(
          'Your selectedOffer is being reviewed by the Seller.'
        ),
      };
    }
    if (offerStatus === 'PAYMENT REQUIRED') {
      alertProps = {
        variant: 'warning',
        header: 'Payment Required',
        content: contentTypo(
          'Please process the payment within the remaining time. This selectedOffer will automatically close if payment is not received.'
        ),
      };
    }
    if (offerStatus === 'PAYMENT MISSED') {
      alertProps = {
        variant: 'error',
        header: 'Payment Missed',
        content: contentTypo(
          'The selectedOffer has automatically closed due to missed payment.'
        ),
      };
    }
    if (offerStatus === 'ACCEPTED') {
      alertProps = {
        variant: 'success',
        header: 'Finalised',
        content: (
          <span
            onClick={() => {
              history.replace(BUYER_ROUTES.ORDERS);
            }}
            style={{ cursor: 'pointer' }}
          >
            {contentTypo(
              `This offer is now Order [#0000-${selectedOffer.orderRefNumber}].`
            )}
          </span>
        ),
      };
    }
    if (offerStatus === 'NEW OFFER') {
      alertProps = {
        variant: 'success',
        header: 'New Offer',
        content: contentTypo(
          'Review the offer details and Negotiate or Accept the offer to proceed.'
        ),
      };
    }

    return alertProps;
  };

  const renderLeftComponent = () => (
    <Col sm={12} md={12} xl={8}>
      {buildAlertProperties().variant && (
        <AlertsContainer>
          <Row>
            <Col>
              <Alert {...buildAlertProperties()} fullWidth />
            </Col>
          </Row>
          <div style={{ marginBottom: '16px' }} />
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

            {renderLabel('Delivery Date', { marginTop: '24px' })}
            {renderLabelValue(
              moment(selectedOffer?.deliveryDate).format('MMMM DD, YYYY')
            )}

            {renderLabel('Delivery Address', { marginTop: '24px' })}
            {renderLabelValue(getShippingAddress(selectedOffer.shippingFrom))}
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

            <StarContainer>
              <StyledNumberRating variant="caption" color="shade7">
                {seller?.rating || 0}
              </StyledNumberRating>
              {[...Array(5).keys()].map((r, i) =>
                Number(seller?.rating || 0) > r ? (
                  <div key={i} style={{ marginRight: '3px' }}>
                    <StarFilled
                      fill={theme.brand.alert}
                      width={13}
                      height={13}
                    />
                  </div>
                ) : (
                  <div key={i} style={{ marginRight: '3px' }}>
                    <Star fill={theme.brand.alert} width={13} height={13} />
                  </div>
                )
              )}
            </StarContainer>

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
            getOfferStatus(selectedOffer, 'buyer') !== 'PAYMENT MISSED' && (
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
                    onClick={() => handleAcceptOffer()}
                    disabled={!thereIsNewOffer && parseFloat(counterOffer) > 0}
                  />
                </div>
              </CTAContainer>
            )}
        </Hidden>
      </FullOfferDetailsContainer>
    </Col>
  );

  return (
    <Container>
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
          <Typography
            color="shade9"
            font-weight="700"
            style={{ fontFamily: 'Media Sans' }}
            variant="title5"
          >
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
              sizeOptions={marketRequest?.sizeOptions || []}
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
              sizeOptions={marketRequest?.sizeOptions || []}
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

        <Row>
          <Col>{renderOfferSeenTextContainer()}</Col>
        </Row>
        {selectedOffer?.status !== 'ACCEPTED' && (
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
                onClick={() => handleAcceptOffer()}
                disabled={!thereIsNewOffer && parseFloat(counterOffer) > 0}
              />
            </Col>
          </Row>
        )}
      </Visible>
    </Container>
  );
};

export default OfferDetailsView;
