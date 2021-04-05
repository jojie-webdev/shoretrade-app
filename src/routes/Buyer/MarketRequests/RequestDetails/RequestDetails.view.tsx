import React from 'react';

import Badge from 'components/base/Badge';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import {
  Crab,
  DollarSign,
  Filter,
  PlaceholderProfile,
  Star,
  StarFilled,
  Weight,
} from 'components/base/SVG';
import TypographyView from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import ConfirmationModal from 'components/module/ConfirmationModal';
import EmptyStateView from 'components/module/EmptyState';
import NegotiateModalView from 'components/module/NegotiateModal';
import { BUYER_ROUTES } from 'consts';
import { Row, Col } from 'react-grid-system';
import { Route, Switch } from 'react-router-dom';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import theme from 'utils/Theme';

import { MarketRequestItem } from '../Landing/Landing.view';
import OfferDetailView from './OfferDetail/OfferDetail.view';
import { MarketRequestDetailProps } from './RequestDetails.prop';
import {
  RequestDetailsCardContainer,
  RequestDetailsContainer,
  HeaderContainer,
  RequestOffersAccordion,
  OffersSellerAccordionContentContainer,
  OffersContainer,
  TagsContainer,
  RequestOfferItemInteraction,
  BadgeText,
  StatusBadgeText,
  SellerOfferInteractionContentContainer,
} from './RequestDetails.style';

export const OffersSellerAccordionContent = (props: {
  sellerId: string;
  sellerName: string;
  sellerLocation: string;
  sellerRating: number;
  image: string;
}) => {
  const { sellerName, sellerLocation, sellerRating, image } = props;
  const starHeight = 16;
  const starWidth = 16;

  return (
    <OffersSellerAccordionContentContainer>
      <div className="thumbnail-container">
        {image ? <img src={image} /> : <PlaceholderProfile />}
      </div>
      <div className="info-container">
        <TypographyView variant="copy" color="shade8">
          {sellerName}
        </TypographyView>
        <div className="location-container">
          <TypographyView color={'shade5'} variant="overlineSmall">
            {sellerLocation}
          </TypographyView>
        </div>
        <div className="ratings-container">
          <div>
            <span className="value">{sellerRating}</span>
          </div>
          <div>
            {sellerRating
              ? [...Array(5).keys()].map((r) =>
                  Number(sellerRating || 0) > r ? (
                    <StarFilled
                      fill={theme.brand.alert}
                      width={starWidth}
                      height={starHeight}
                    />
                  ) : (
                    <Star
                      fill={theme.brand.alert}
                      width={starWidth}
                      height={starHeight}
                    />
                  )
                )
              : ''}
          </div>
        </div>
      </div>
    </OffersSellerAccordionContentContainer>
  );
};

const SellerOfferInteractionContent = (props: {
  status: string;
  weight: number;
  weightUnit: string;
  price: number;
  tags: string[];
  averagePrice: number;
  isUnderNegotiations: boolean;
}) => {
  const {
    weight,
    price,
    tags,
    weightUnit,
    averagePrice,
    status,
    isUnderNegotiations = false,
  } = props;
  const OfferTags = (props: { tags: string[] }) => {
    const { tags } = props;
    const tagsMarkup = tags.map((tag) => (
      <Badge
        key={tag}
        className="offers-state-badge"
        badgeColor={theme.grey.shade3}
      >
        <BadgeText color="shade8" weight="bold" variant="overline">
          {tag}
        </BadgeText>
      </Badge>
    ));

    return <TagsContainer>{tagsMarkup}</TagsContainer>;
  };

  return (
    <SellerOfferInteractionContentContainer>
      <div className="info-container">
        <div className="status">
          {status === 'DECLINED' || status === 'ACCEPTED' ? (
            <Badge
              className="offers-badge"
              badgeColor={
                status === 'ACCEPTED' ? theme.brand.success : theme.brand.error
              }
            >
              <StatusBadgeText color="shade1" weight="bold" variant="overline">
                {status === 'DECLINED' ? 'LOST' : status}
              </StatusBadgeText>
            </Badge>
          ) : (
            <>
              {price < averagePrice && (
                <Badge
                  className="offers-badge"
                  badgeColor={theme.brand.success}
                >
                  <StatusBadgeText
                    color="shade1"
                    weight="bold"
                    variant="overline"
                  >
                    Great Value
                  </StatusBadgeText>
                </Badge>
              )}
              {price > averagePrice && (
                <Badge className="offers-badge" badgeColor={theme.brand.error}>
                  <StatusBadgeText
                    color="shade1"
                    weight="bold"
                    variant="overline"
                  >
                    Above Market
                  </StatusBadgeText>
                </Badge>
              )}
              {isUnderNegotiations && (
                <Badge className="offers-badge" badgeColor={theme.brand.alert}>
                  <StatusBadgeText weight="bold" variant="overline">
                    Negotiation
                  </StatusBadgeText>
                </Badge>
              )}
            </>
          )}
        </div>
        <div className="weight-price-container">
          <div className="weight-price">
            <Weight fill={theme.grey.shade5} />
            <TypographyView variant="label">
              {weight} {weightUnit}
            </TypographyView>
          </div>
          <div className="weight-price">
            <DollarSign fill={theme.grey.shade5} />
            <TypographyView variant="label">{price}</TypographyView>
          </div>
        </div>
        <div className="tags">
          {tags.length > 0 ? (
            <>
              <OfferTags tags={tags} />
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </SellerOfferInteractionContentContainer>
  );
};

const MarketRequestDetailView = (props: MarketRequestDetailProps) => {
  const {
    data,
    onClickItem,
    breadCrumbSections,
    negotiating,
    setNegotiating,
    sellerOffers,
    currentOfferId,
    selectedOffer,
    selectedCompany,
    handleAcceptOffer,
    price,
    setPrice,
    counterOffer,
    deliveryTotal,
    submitNegotiation,
    hideNegotiate,
    closeOnAccept,
    setCloseOnAccept,
    discountPercentage,
    discountValue,
    thereIsNewOffer,
    newOffer,
    disableAccept,
    isAccepted,
    showDelete,
    setShowDelete,
    onClickDelete,
  } = props;

  if (!sellerOffers) {
    return <></>;
  }

  const handleStartNegotiate = () => {
    setNegotiating(true);
  };

  return (
    <RequestDetailsContainer>
      <NegotiateModalView
        closeOnAccept={closeOnAccept}
        setCloseOnAccept={setCloseOnAccept}
        onSubmit={(v: number) => submitNegotiation(v)}
        originalOffer={selectedOffer?.price}
        counterOffer={parseFloat(counterOffer)}
        weight={{
          unit: selectedOffer?.measurementUnit,
          value: selectedOffer?.weight,
        }}
        isOpen={negotiating}
        onClickClose={() => {
          setNegotiating(false);
        }}
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
      <BoxContainer>
        <HeaderContainer>
          <div>
            <Breadcrumbs sections={breadCrumbSections} />
          </div>
        </HeaderContainer>
        <Row gutterWidth={30}>
          <Col md={12} sm={12} xl={4}>
            <RequestDetailsCardContainer type={'none'}>
              <MarketRequestItem
                inDetail={true}
                type={data.type}
                expiry={data.expiry}
                offers={data.offers}
                image={data.image}
                measurementUnit={data.measurementUnit}
                weight={data.weight}
              />
            </RequestDetailsCardContainer>
            {data.status !== 'DELETED' && (
              <Button
                text="Delete"
                onClick={() => setShowDelete(true)}
                variant="primary"
              />
            )}
          </Col>
          <Col md={12} sm={12} xl={8}>
            <Switch>
              <Route
                path={`${BUYER_ROUTES.MARKET_REQUEST_DETAILS_OFFER_LIST(
                  data.id
                )}`}
              >
                <OffersContainer>
                  {/* NUMBERS CONTAINER START */}
                  <div className="numbers-container">
                    <div className="item">
                      <span className="value">{data.offers} &nbsp;</span>
                      <span className="label">Offers</span>
                    </div>
                    <span className="divider">,</span>
                    <div className="item">
                      <span className="value">
                        {sellerOffers.length} &nbsp;
                      </span>
                      <span className="label">Sellers</span>
                    </div>
                  </div>
                  {/* NUMBERS CONTAINER END */}
                  {data.offers < 1 || sellerOffers === undefined ? (
                    <EmptyStateView
                      title="There are currently no offers for this request."
                      // circleHeight={280}
                      // circleWidth={280}
                      Svg={Crab}
                      height={240}
                      width={249}
                      fluid
                    />
                  ) : (
                    sellerOffers.map((seller) => (
                      <RequestOffersAccordion
                        key={seller.company.name}
                        title=""
                        noBg={true}
                        padding={'16px'}
                        withBackground={false}
                        border={`1px solid ${theme.grey.shade3}`}
                        background={theme.grey.shade1}
                        marginBottom={'12px'}
                        leftComponent={
                          <OffersSellerAccordionContent
                            image={seller.company.image}
                            sellerLocation={seller.company.address.countryCode}
                            sellerName={seller.company.name}
                            sellerRating={seller.company.rating}
                            sellerId={seller.company.id}
                          />
                        }
                        iconColor={theme.brand.primary}
                      >
                        {seller.offers.map((item) => (
                          <RequestOfferItemInteraction
                            key={item.id}
                            onClick={() => onClickItem(item, seller.company)}
                            leftComponent={
                              <SellerOfferInteractionContent
                                averagePrice={seller.marketRequest.averagePrice}
                                price={item.price}
                                isUnderNegotiations={
                                  !item.negotiations?.find(
                                    (i) => i.is_accepted === true
                                  )
                                }
                                status={item.status}
                                weight={item.weight}
                                tags={item.specifications}
                                weightUnit={formatMeasurementUnit(
                                  item.measurementUnit
                                )}
                              />
                            }
                          />
                        ))}
                      </RequestOffersAccordion>
                    ))
                  )}
                </OffersContainer>
              </Route>
              <Route
                path={BUYER_ROUTES.MARKET_REQUEST_DETAILS_OFFER(currentOfferId)}
              >
                <OfferDetailView
                  price={price}
                  handleAcceptOffer={handleAcceptOffer}
                  company={selectedCompany}
                  selectedOffer={selectedOffer}
                  deliveryTotal={deliveryTotal}
                  handleStartNegotiate={handleStartNegotiate}
                  hideNegotiate={hideNegotiate}
                  originalOffer={selectedOffer?.price}
                  counterOffer={parseFloat(counterOffer)}
                  discountPercentage={discountPercentage}
                  discountValue={discountValue}
                  newOffer={parseFloat(newOffer)}
                  thereIsNewOffer={thereIsNewOffer}
                  disableAccept={disableAccept}
                  isAccepted={isAccepted}
                />
              </Route>
            </Switch>
          </Col>
        </Row>
      </BoxContainer>
    </RequestDetailsContainer>
  );
};

export default MarketRequestDetailView;
