import React, { useState, useEffect } from 'react';

import Badge from 'components/base/Badge';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
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
import MarketRequestItem from '../Landing/Landing.view';
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
  RequestDetailsMobileContainer,
  RequestDetailsParentContainer,
  SummaryContainer,
  DeleteButtonContainer
} from './RequestDetails.style';
import Offer from './Offer/Offer.view';
import Select from 'components/base/Select/Select.view';
import { ProgressContainer } from './../../../../components/layout/AuthContainer/AuthContainer.style';
import { Progress } from './../../../Seller/Selling/ListingDetails/ListingDetails.style';
import { DetailsHeaderContainer } from '../Create/Create.style';
import { AnchorContainer } from './../Create/SelectSpecifications/SelectSpecification.style';
import Button from './../../../../components/base/Button/Button.view';
import TrashCan from './../../../../components/base/SVG/TrashCan';
import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';

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
              Est. Delivery:
            </Typography>
            <TypographyView variant="label">
              {moment(deliveryDate).format('MMM DD, YY')}
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

  const [searchTerm, setSearchTerm] = useState("")
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const [sellerOffersCopy, setSellerOffersCopy] = useState<GetActiveOffersRequestResponseItem[]>([])

  useEffect(() => {
    if (!searchTerm) {
      setSellerOffersCopy(sellerOffers)

      return
    }

    const _sellerOffers = sellerOffers.filter(sellerOffer => sellerOffer.company.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setSellerOffersCopy(_sellerOffers)
  }, [searchTerm, sellerOffers])

  const countAllOffers = () => {
    let offersCount = 0
    sellerOffersCopy.forEach(sellerOffer => {
      offersCount += sellerOffer.offers.length
    })

    return offersCount;
  }

  const renderLeftComponent = () => (
    <Col md={12} sm={12} xl={8}>
      <Row style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Col xl={6}>
          <div style={{ marginTop: "16px" }}>
            <Search
              className="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.currentTarget.value)}
              resetValue={() => setSearchTerm('')}
              placeholder="Search"
              style={{ borderRadius: "12px", height: "40px" }}
            />
          </div>
        </Col>

        <Col style={{ display: "flex" }}>
          <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
            <Typography
              color="shade6"
              variant="label"
              style={{ marginRight: "16px" }}
            >
              <span style={{ color: "#09131D" }}>{countAllOffers()}</span>
              <span>{' '}Results</span>
            </Typography>

            <div style={{ marginLeft: "16px", width: "94px", cursor: "pointer" }} onClick={props.onClickFilterButton}>
              <Select
                label=""
                options={[]}
                size="small"
                placeholder="Sort by"
                disabled
              // onChange={(e) => setSortField(e?.value)}
              />
            </div>
          </div>
        </Col>
      </Row>

      {
        sellerOffersCopy.map(sellerOffer =>
          <Offer sellerOffer={sellerOffer} />
        )
      }

      {/* <RequestDetailsCardContainer type={'none'}>
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
      </RequestDetailsCardContainer> */}
      {/* <Row style={{ marginBottom: '1rem' }} gutterWidth={15}>
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
      </Row> */}
    </Col>
  )

  const renderRightComponent = () => (
    <Col md={12} sm={12} xl={4}>
      <Switch>
        <Route
          path={`${BUYER_ROUTES.MARKET_REQUEST_DETAILS_OFFER_LIST(
            data.id
          )}`}
        >
          <RequestDetailsParentContainer>
            <RequestDetailsMobileContainer>
              <div className="thumbnail-container">
                <img src={parseImageUrl(data.image || '')} />
              </div>
              <div style={{ width: "100%", margin: "auto" }}>
                <Typography
                  variant="body"
                  weight="400"
                  color="shade9"
                  style={{ fontFamily: "Basis Grotesque Pro", marginBottom: "3px" }}
                >
                  {sellerOffers[0]?.marketRequest?.weight.from}
                  <span style={{ color: theme.grey.shade5 }}>/{sellerOffers[0]?.marketRequest?.weight.to} kg</span>
                </Typography>

                {/* TODO: storybook */}
                <ProgressContainer>
                  <Progress height="2px" percent={70} />
                </ProgressContainer>
                <Typography
                  margin="12px 0px 0px 0px"
                  color="shade6"
                  variant="caption"
                >
                  1 Day, 16 Hours, 5 Min
                </Typography>
              </div>
              <DeleteButtonContainer>
                <Button
                  iconPosition="before"
                  icon={<TrashCan fill={'#FFF'} width={16} height={16} />}
                  // onClick={
                  //   setItemToDelete &&
                  //   ((e) => {
                  //     e.stopPropagation();
                  //     setItemToDelete({ value: mr.id || '' });
                  //   })
                  // }
                  variant="primary"
                  size="sm"
                  className="delete-button"
                />
              </DeleteButtonContainer>
            </RequestDetailsMobileContainer>
          </RequestDetailsParentContainer>

          <SummaryContainer margin="16px 0px">
            <DetailsHeaderContainer>
              <Typography
                style={{
                  marginBottom: 8,
                  fontFamily: 'Wilderness',
                  fontSize: 24,
                }}
              >
                Summary
              </Typography>
            </DetailsHeaderContainer>
            <AnchorContainer>

            </AnchorContainer>
          </SummaryContainer>

          {/* <OffersContainer>
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
          </OffersContainer> */}
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
  )

  const renderItemName = () => (
    <Col>
      <Typography
        color="shade9"
        font-weight="700"
        style={{ fontFamily: "Media Sans" }}
        variant="title6"
      >
        {data.name}
      </Typography>
    </Col>
  )

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
        <>
          <Row>
            {renderItemName()}
          </Row>

          <Row gutterWidth={30}>
            {renderLeftComponent()}
            {renderRightComponent()}
          </Row>
        </>
      )}
    </RequestDetailsContainer>
  );
};

export default MarketRequestDetailView;
