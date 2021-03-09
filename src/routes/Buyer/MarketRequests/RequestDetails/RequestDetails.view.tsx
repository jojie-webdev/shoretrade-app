import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import Badge from 'components/base/Badge';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import Select from 'components/base/Select';
import Spinner from 'components/base/Spinner';
import {
  Crab,
  DollarSign,
  Filter,
  Star,
  StarFilled,
  Weight,
} from 'components/base/SVG';
import TypographyView from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import Card from 'components/module/CategoryCards/Landing';
import EmptyStateView from 'components/module/EmptyState';
import NegotiateModalView from 'components/module/NegotiateModal';
import Search from 'components/module/Search';
import SearchAddressView from 'components/module/SearchAddress';
import { BUYER_ROUTES } from 'consts';
import { Row, Col, Container } from 'react-grid-system';
import { Link, Route, Switch } from 'react-router-dom';
import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';
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
  FilterContainer,
  SellerOfferInteractionContentContainer,
} from './RequestDetails.style';

export const OffersSellerAccordionContent = (props: {
  sellerId: string;
  sellerName: string;
  sellerLocation: string;
  sellerRating: number;
  image: string;
}) => {
  const { sellerId, sellerName, sellerLocation, sellerRating, image } = props;
  const starHeight = 16;
  const starWidth = 16;

  return (
    <OffersSellerAccordionContentContainer>
      <div className="thumbnail-container">
        <img src={image} />
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
            {[...Array(5).keys()].map((r) =>
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
            )}
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
}) => {
  const { status, weight, price, tags, weightUnit } = props;

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
          <Badge className="offers-badge" badgeColor={theme.grey.shade3}>
            <StatusBadgeText color="shade8" weight="bold" variant="overline">
              {status}
            </StatusBadgeText>
          </Badge>
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
    searchTerm,
    setSearchTerm,
    currentOfferId,
    selectedOffer,
    selectedCompany,
  } = props;

  if (!sellerOffers) {
    return <></>;
  }

  const handleStartNegotiotiate = () => {
    setNegotiating(true);
  };

  return (
    <RequestDetailsContainer>
      <NegotiateModalView
        onSubmit={() => console.log('submit')}
        offerId={'1'}
        originalOffer={50}
        negotiationId={'0'}
        weight={{ unit: 'kg', value: 100 }}
        isOpen={negotiating}
        onClickClose={() => {
          setNegotiating(false);
        }}
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
                        key={seller.company.id}
                        title="Manila"
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
                                price={item.price}
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
                  company={selectedCompany}
                  selectedOffer={selectedOffer}
                  handleStartNegotiotiate={handleStartNegotiotiate}
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
