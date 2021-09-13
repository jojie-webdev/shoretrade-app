import React, { ReactNode, useEffect, useState } from 'react';

import Alert from 'components/base/Alert';
import { AlertProps } from 'components/base/Alert/Alert.props';
import Badge from 'components/base/Badge/Badge.view';
import { PlaceholderProfile, Star, StarFilled } from 'components/base/SVG';
import Typography from 'components/base/Typography';
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
import { getOfferStatus } from 'utils/MarketRequest/offerStatus';
import { parseImageUrl } from 'utils/parseImageURL';
import theme from 'utils/Theme';

import Check from '../../../../../components/base/SVG/Check';
import Refresh from '../../../../../components/base/SVG/Refresh';
import { Store } from '../../../../../types/store/Store';
import { NoActionsYetBadgesContainer } from '../Offer/Offer.style';
import { StatusBadgeText } from '../RequestDetails.style';
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
} from './FullOfferDetails.style';

const FullOfferDetails = (props: any) => {
  const {
    handleStartNegotiate,
    handleAcceptOffer,
    isAccepted,
    thereIsNewOffer,
    counterOffer,
    newOffer,
    selectedOffer,
  } = props;

  const location = useLocation();
  const history = useHistory();
  const splits = location.pathname.split('/');
  const offerId = splits[splits.length - 1];

  const activeOffers = useSelector((store: Store) => store.getActiveOffers);
  const buyerRequests = useSelector(
    (store: Store) => store.getAllMarketRequest
  );

  const filteredBuyerRequests = buyerRequests.data?.data?.marketRequests.filter(
    (mR) => mR.status !== 'DELETED' && mR.status !== 'CLOSED'
  );

  const [offer, setOffer] = useState<Offer>({} as Offer);
  const [seller, setSeller] = useState<any>({});
  const [nego, setNego] = useState<any>({});

  useEffect(() => {
    activeOffers.data?.data.marketOffers.forEach((marketOffer) =>
      marketOffer.offers.forEach((offer) => {
        if (offer?.id === offerId) {
          setOffer(offer);
          setNego(offer?.negotiations ? offer?.negotiations[0] : {});
          return;
        }
      })
    );

    activeOffers.data?.data.marketOffers.forEach((marketOffer) => {
      marketOffer.offers.forEach((offer) => {
        if (offer?.id === offerId) {
          setSeller(marketOffer.company);
          return;
        }
      });
    });
  }, [offerId]);

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
        {((offer?.weight || 0) * (nego?.price || offer?.price || 0))?.toFixed(
          2
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

  const renderTags = () => (
    <TagsContainer>
      {offer?.status === 'DECLINED' || offer?.status === 'ACCEPTED' ? (
        <Badge
          id="status-badge"
          className="offers-badge"
          badgeColor={
            offer?.status === 'ACCEPTED' ? '#EAFFF9' : theme.brand.error
          }
        >
          <StatusBadgeText color="success" weight="bold" variant="overline">
            {offer?.status === 'DECLINED' ? 'LOST' : offer?.status}
          </StatusBadgeText>
        </Badge>
      ) : (
        <NoActionsYetBadgesContainer>
          {(offer?.price || 0) < seller.averagePrice && (
            <Badge className="offers-badge" badgeColor={theme.brand.success}>
              <StatusBadgeText color="shade1" weight="bold" variant="overline">
                Great Value
              </StatusBadgeText>
            </Badge>
          )}
          {(offer?.price || 0) > seller.averagePrice && (
            <Badge className="offers-badge" badgeColor={theme.brand.error}>
              <StatusBadgeText color="shade1" weight="bold" variant="overline">
                Above Market
              </StatusBadgeText>
            </Badge>
          )}
          {offer?.negotiations && (
            <Badge
              className="offers-badge"
              badgeColor="#FFF7F2"
              padding="5px 8px"
            >
              <StatusBadgeText weight="bold" variant="overline" color="warning">
                Negotiation
              </StatusBadgeText>
            </Badge>
          )}
        </NoActionsYetBadgesContainer>
      )}
    </TagsContainer>
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

  const specsValue = offer?.specifications
    ?.map((spec: string) => spec?.toUpperCase())
    ?.join(', ');

  const sizeValue = sizeToString(
    offer?.metric || '',
    offer?.size?.from,
    offer?.size?.to
  ).toUpperCase();

  const quantityValue = offer?.weight + ' ' + offer?.measurementUnit;

  const buildAlertProperties = () => {
    const offerStatus = getOfferStatus(offer, 'buyer');

    const contentTypo = (content: string): ReactNode => (
      <Typography variant="body" color="shade6" weight="400">
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
        content: contentTypo('Your offer is being reviewed by the Seller.'),
      };
    }
    if (offerStatus === 'PAYMENT REQUIRED') {
      alertProps = {
        variant: 'warning',
        header: 'Payment Required',
        content: contentTypo(
          'Please process the payment within the remaining time. This offer will automatically close if payment is not received.'
        ),
      };
    }
    if (offerStatus === 'PAYMENT MISSED') {
      alertProps = {
        variant: 'error',
        header: 'Payment Missed',
        content: contentTypo(
          'The offer has automatically closed due to missed payment.'
        ),
      };
    }
    if (offerStatus === 'ACCEPTED') {
      alertProps = {
        variant: 'success',
        header: 'Finalised',
        content: (
          <div
            onClick={() => {
              history.replace(BUYER_ROUTES.ORDERS);
            }}
            style={{ cursor: 'pointer' }}
          >
            {contentTypo(
              `This offer is now Order [#0000-${offer.orderRefNumber}].`
            )}
          </div>
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

  return (
    <>
      {buildAlertProperties().variant && (
        <>
          <Row>
            <Col>
              <Alert {...buildAlertProperties()} fullWidth />
            </Col>
          </Row>
          <div style={{ marginBottom: '16px' }} />
        </>
      )}

      <FullOfferDetailsContainer>
        <Row>
          <Col>
            {renderLabel('SPECIFICATION')}
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {offer?.specifications?.map((spec) => (
                <div style={{ marginRight: 8 }}>{renderLabelValue(spec)}</div>
              ))}
            </div>

            {renderLabel('SIZE', { marginTop: '24px' })}
            {renderLabelValue(sizeValue)}

            {renderLabel('QUANTITY', { marginTop: '24px' })}
            {renderLabelValue(quantityValue)}

            {renderLabel('Delivery Date', { marginTop: '24px' })}
            {renderLabelValue(
              moment(offer?.deliveryDate).format('MMMM DD, YYYY')
            )}

            {renderLabel('Delivery Address', { marginTop: '24px' })}
            {renderLabelValue(getShippingAddress(offer.shippingFrom))}
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
              {[...Array(5).keys()].map((r) =>
                Number(seller?.rating || 0) > r ? (
                  <div style={{ marginRight: '3px' }}>
                    <StarFilled
                      fill={theme.brand.alert}
                      width={13}
                      height={13}
                    />
                  </div>
                ) : (
                  <div style={{ marginRight: '3px' }}>
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

          {offer?.status !== 'ACCEPTED' &&
            getOfferStatus(offer, 'buyer') !== 'PAYMENT MISSED' && (
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

      <Visible xs sm>
        <Row>
          <Col>{renderTotalPriceContainer()}</Col>
        </Row>

        <Row>
          <Col>{renderOfferSeenTextContainer()}</Col>
        </Row>
        {offer?.status !== 'ACCEPTED' && (
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
    </>
  );
};

export default FullOfferDetails;
