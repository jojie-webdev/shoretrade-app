import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import Badge from 'components/base/Badge';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import Select from 'components/base/Select';
import Spinner from 'components/base/Spinner';
import {
  DollarSign,
  Filter,
  Star,
  StarFilled,
  Weight,
} from 'components/base/SVG';
import TypographyView from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import Card from 'components/module/CategoryCards/Landing';
import NegotiateModalView from 'components/module/NegotiateModal';
import Search from 'components/module/Search';
import SearchAddressView from 'components/module/SearchAddress';
import { BUYER_ROUTES } from 'consts';
import { Row, Col, Container } from 'react-grid-system';
import { Link, Route, Switch } from 'react-router-dom';
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
  sellerRating: string;
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
        <TypographyView variant="body">{sellerName}</TypographyView>
        <div className="location-container">
          <TypographyView color={'shade5'} variant="overline">
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
  weight: string;
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
          <div className="weight">
            <Weight fill={theme.grey.shade5} /> {weight} {weightUnit}
          </div>
          <div className="price">
            <DollarSign fill={theme.grey.shade5} /> {price}
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
  } = props;

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
                offersTotal={data.offersTotal}
                image={data.image}
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
                      <span className="value">{data.offersTotal} &nbsp;</span>
                      <span className="label">Offers</span>
                    </div>
                    <span className="divider">,</span>
                    <div className="item">
                      <span className="value">{data.offersTotal} &nbsp;</span>
                      <span className="label">Sellers</span>
                    </div>
                  </div>
                  {/* NUMBERS CONTAINER END */}
                  <FilterContainer>
                    <div className="filter-search-container">
                      <Search
                        className="filter-search"
                        value={props.searchTerm}
                        onChange={(event: any) =>
                          props.setSearchTerm(event.currentTarget.value)
                        }
                        resetValue={() => props.setSearchTerm('')}
                        placeholder="Search for an offer..."
                        rounded
                      />
                    </div>
                    <div>
                      <Select
                        className="filter-sort"
                        grey
                        options={[]}
                        placeholder="Sort"
                      />
                    </div>
                  </FilterContainer>
                  <div>
                    <RequestOffersAccordion
                      title="Manila"
                      noBg={true}
                      padding={'16px'}
                      withBackground={false}
                      border={`1px solid ${theme.grey.shade3}`}
                      background={theme.grey.shade1}
                      marginBottom={'12px'}
                      leftComponent={
                        <OffersSellerAccordionContent
                          image={'http://placekitten.com/64/64'}
                          sellerLocation="Manila"
                          sellerName="Manny Pacquiao"
                          sellerRating="4"
                          sellerId="001"
                        />
                      }
                      iconColor={theme.brand.primary}
                    >
                      <RequestOfferItemInteraction
                        onClick={() => onClickItem({ id: '001' })}
                        leftComponent={
                          <SellerOfferInteractionContent
                            price={100}
                            status="Negotiation"
                            weight="180"
                            tags={['Fresh', 'Frozen']}
                            weightUnit="kg"
                          />
                        }
                      />
                      <RequestOfferItemInteraction
                        onClick={() => onClickItem({ id: '001' })}
                        leftComponent={
                          <SellerOfferInteractionContent
                            price={100}
                            status="Negotiation"
                            weight="180"
                            tags={['Fresh', 'Frozen']}
                            weightUnit="kg"
                          />
                        }
                      />
                      <RequestOfferItemInteraction
                        onClick={() => onClickItem({ id: '001' })}
                        leftComponent={
                          <SellerOfferInteractionContent
                            price={100}
                            status="Negotiation"
                            weight="180"
                            tags={['Fresh', 'Frozen']}
                            weightUnit="kg"
                          />
                        }
                      />
                    </RequestOffersAccordion>
                    <RequestOffersAccordion
                      title="Manila"
                      padding={'16px'}
                      noBg={true}
                      withBackground={false}
                      border={`1px solid ${theme.grey.shade3}`}
                      marginBottom={'12px'}
                      background={theme.grey.shade1}
                      leftComponent={
                        <OffersSellerAccordionContent
                          image={'http://placekitten.com/64/64'}
                          sellerLocation="Manila"
                          sellerName="Manny Pacquiao"
                          sellerRating="4.5"
                          sellerId="001"
                        />
                      }
                      iconColor={theme.brand.primary}
                    >
                      <RequestOfferItemInteraction
                        onClick={() => onClickItem({ id: '001' })}
                        leftComponent={
                          <SellerOfferInteractionContent
                            price={100}
                            status="Negotiation"
                            weight="180"
                            tags={['Fresh', 'Frozen']}
                            weightUnit="kg"
                          />
                        }
                      />
                      <RequestOfferItemInteraction
                        onClick={() => onClickItem({ id: '001' })}
                        leftComponent={
                          <SellerOfferInteractionContent
                            price={100}
                            status="Negotiation"
                            weight="180"
                            tags={['Fresh', 'Frozen']}
                            weightUnit="kg"
                          />
                        }
                      />
                      <RequestOfferItemInteraction
                        onClick={() => onClickItem({ id: '001' })}
                        leftComponent={
                          <SellerOfferInteractionContent
                            price={100}
                            status="Negotiation"
                            weight="180"
                            tags={['Fresh', 'Frozen']}
                            weightUnit="kg"
                          />
                        }
                      />
                    </RequestOffersAccordion>
                  </div>
                </OffersContainer>
              </Route>
              <Route path={BUYER_ROUTES.MARKET_REQUEST_DETAILS_OFFER(data.id)}>
                <OfferDetailView
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
