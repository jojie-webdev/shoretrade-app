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
import Typography from 'components/base/Typography';
import ConfirmationModal from 'components/module/ConfirmationModal';
import DialogModal from 'components/module/DialogModal';
import EmptyStateView from 'components/module/EmptyState';
import Loading from 'components/module/Loading';
import MarketRequestOfferFilterModalView from 'components/module/MarketRequestOfferFilterModal';
import NegotiateBuyerModal from 'components/module/NegotiateBuyerModal';
import Search from 'components/module/Search';
import { BUYER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import moment from 'moment';
import sortBy from 'ramda/es/sortBy';
import { Row, Col, Visible, Hidden } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { MarketRequestDetailProps } from 'routes/Buyer/MarketRequests/RequestDetails/RequestDetails.props';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { formatRunningDateDifference } from 'utils/MarketRequest';
import { parseImageUrl } from 'utils/parseImageURL';
import theme from 'utils/Theme';

import { MarketRequestItem } from '../Landing/Landing.view';
import OfferDetailView from './OfferDetail/OfferDetail.view';
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
  FilterButton,
} from './RequestDetails.style';

const sortByDate = sortBy((data: { created_at: string }) => data.created_at);

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
        {image ? <img src={parseImageUrl(image)} /> : <PlaceholderProfile />}
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
  deliveryDate: string;
}) => {
  const {
    weight,
    price,
    tags,
    weightUnit,
    averagePrice,
    status,
    isUnderNegotiations = false,
    deliveryDate,
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
          <div className="weight-price">
            <Typography
              color="shade5"
              variant="caption"
              style={{ marginRight: 4 }}
            >
              Estimated Delivery:
            </Typography>
            <TypographyView variant="label">
              {moment(deliveryDate).format('MMMM DD, YY')}
            </TypographyView>
          </div>
        </div>
        <div className="tags">
          {(tags || []).length > 0 ? (
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
    isAccepted,
    showDelete,
    setShowDelete,
    onClickDelete,
    disableAccept,
    marketRequestId,
    sortedNegotiations,
    lastNegotiationsOffers,
    totalOffers,
    measurementUnit,
    isLoading,
    showNotEnoughCreditAlert,
    setShowNotEnoughCreditAlert,
  } = props;

  const handleStartNegotiate = () => {
    setNegotiating(true);
  };

  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  return (
    <RequestDetailsContainer>
      <NegotiateBuyerModal
        closeOnAccept={closeOnAccept}
        setCloseOnAccept={setCloseOnAccept}
        onSubmit={(v: number) => submitNegotiation(v)}
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
      <MarketRequestOfferFilterModalView {...props.filterModalProps} />
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
      <DialogModal
        title="Not Enough Credit."
        // overline="Please top up your Account Credit to accept this order."
        isOpen={showNotEnoughCreditAlert}
        onClickClose={() => setShowNotEnoughCreditAlert(false)}
        backgroundColor={theme.grey.shade8}
      >
        <Typography
          color="alert"
          weight="400"
          align={isMobile ? 'center' : 'left'}
        >
          Please top up your Account Credit to accept this order.
        </Typography>
      </DialogModal>

      <HeaderContainer>
        <div>
          <Breadcrumbs sections={breadCrumbSections} />
        </div>
      </HeaderContainer>
      {isLoading ? (
        <Loading />
      ) : (
        <Row gutterWidth={30}>
          <Col md={12} sm={12} xl={4}>
            <RequestDetailsCardContainer type={'none'}>
              {data && data.name ? (
                <MarketRequestItem
                  inDetail={true}
                  type={data.name}
                  expiry={
                    moment(data.createdAt).add(7, 'd').isBefore()
                      ? 'Expired'
                      : formatRunningDateDifference(
                          moment(data.createdAt).add(7, 'd').format()
                        )
                  }
                  offers={totalOffers}
                  image={data.image}
                  measurementUnit={measurementUnit}
                  weight={data.weight}
                />
              ) : (
                <></>
              )}
            </RequestDetailsCardContainer>
            <Row style={{ marginBottom: '1rem' }} gutterWidth={15}>
              <Col xs={12}>
                <Hidden xs>
                  {data.status !== 'DELETED' && (
                    <Button
                      text="Delete"
                      size="sm"
                      onClick={() => setShowDelete(true)}
                      variant="primary"
                    />
                  )}
                </Hidden>
              </Col>
            </Row>
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
                      <span className="value">{totalOffers} &nbsp;</span>
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
                  <Row
                    nogutter
                    className="search-row"
                    align="center"
                    justify="between"
                  >
                    <FilterButton onClick={props.onClickFilterButton}>
                      <TypographyView
                        variant="label"
                        color="shade9"
                        weight="500"
                        className="btn-text"
                      >
                        Sort
                      </TypographyView>

                      <Filter />
                    </FilterButton>
                  </Row>
                  {/* NUMBERS CONTAINER END */}
                  {totalOffers < 1 || sellerOffers === undefined ? (
                    <EmptyStateView
                      title="There are currently no offers for this request."
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
                        {seller.offers.map((item) => {
                          const negotiations = sortByDate(
                            item.negotiations || []
                          );

                          const newOfferArr = negotiations.filter(
                            (i: any) => i.type === 'NEW_OFFER'
                          );

                          const latestOffer = newOfferArr.slice(-1)[0];
                          const standingPrice =
                            latestOffer?.price || item.price;

                          return (
                            <RequestOfferItemInteraction
                              key={item.id}
                              onClick={() => onClickItem(item, seller.company)}
                              leftComponent={
                                <SellerOfferInteractionContent
                                  averagePrice={
                                    seller.marketRequest.averagePrice
                                  }
                                  price={standingPrice}
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
                                  deliveryDate={item.deliveryDate}
                                />
                              }
                            />
                          );
                        })}
                      </RequestOffersAccordion>
                    ))
                  )}
                </OffersContainer>
              </Route>
              <Route
                path={BUYER_ROUTES.MARKET_REQUEST_DETAILS_OFFER(
                  marketRequestId,
                  currentOfferId
                )}
              >
                <OfferDetailView
                  handleAcceptOffer={handleAcceptOffer}
                  company={selectedCompany}
                  selectedOffer={selectedOffer}
                  deliveryTotal={deliveryTotal}
                  handleStartNegotiate={handleStartNegotiate}
                  hideNegotiate={hideNegotiate}
                  counterOffer={counterOffer}
                  discountPercentage={discountPercentage}
                  discountValue={discountValue}
                  newOffer={newOffer}
                  thereIsNewOffer={thereIsNewOffer}
                  disableAccept={disableAccept}
                  isAccepted={isAccepted}
                  sortedNegotiations={sortedNegotiations}
                  lastNegotiationsOffers={lastNegotiationsOffers}
                />
              </Route>
            </Switch>
          </Col>
        </Row>
      )}
    </RequestDetailsContainer>
  );
};

export default MarketRequestDetailView;
