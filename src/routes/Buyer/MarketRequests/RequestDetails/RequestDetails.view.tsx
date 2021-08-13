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
  Octopus,
  DropdownArrow
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
import { Route, Switch, useParams, useRouteMatch, useLocation } from 'react-router-dom';
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
  RequestDetailsMobileContainer,
  RequestDetailsParentContainer,
  SummaryContainer,
  DeleteButtonContainer,
  CounterContainer,
  CounterCol,
  Sorter
} from './RequestDetails.style';
import Offer from './Offer/Offer.view';
import Select from 'components/base/Select/Select.view';
import { ProgressContainer } from './../../../../components/layout/AuthContainer/AuthContainer.style';
import { Progress } from './../../../Seller/Selling/ListingDetails/ListingDetails.style';
import { DetailsContentContainer, DetailsDataContainer, DetailsHeaderContainer } from '../Create/Create.style';
import Button from './../../../../components/base/Button/Button.view';
import TrashCan from './../../../../components/base/SVG/TrashCan';
import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';
import { useSelector, useDispatch } from 'react-redux';
import { Store } from './../../../../types/store/Store';
import { getAllMarketRequestActions } from 'store/actions';
import Cross7 from './../../../../components/base/SVG/Cross7';
import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';
import FullOfferDetails from './OfferFullDetails/FullOfferDetails.view';

const sortByDate = sortBy((data: { created_at: string }) => data.created_at);

export const OffersSellerAccordionContent = (props: {
  sellerId: string;
  sellerName: string;
  sellerLocation: string;
  sellerRating: number;
  image: string;
}) => {
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const { sellerName, sellerLocation, sellerRating, image } = props;
  const starHeight = 16;
  const starWidth = 16;

  const displayForNonMobile = () => (
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
  )

  const displayForMobile = () => (
    <TypographyView variant="copy" color="shade8">
      {sellerName}
    </TypographyView>
  )

  return (
    isMobile ?
      displayForMobile() :
      displayForNonMobile()
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
    onOfferDelete
  } = props;

  const location = useLocation()

  const splits = location.pathname.split("/")
  const offerId = splits[splits.length - 1]

  const handleStartNegotiate = () => {
    setNegotiating(true);
  };

  const deleteMarketRequest = useSelector(
    (store: Store) => store.deleteMarketRequest
  );
  const buyerRequests = useSelector(
    (store: Store) => store.getAllMarketRequest
  );
  const buyerRequestsFilters = useSelector(
    (store: Store) => store.getMarketRequestBuyerFilters.data?.data
  );

  const dispatch = useDispatch()

  const [searchTerm, setSearchTerm] = useState("")
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const [sellerOffersCopy, setSellerOffersCopy] = useState<GetActiveOffersRequestResponseItem[]>([])
  const [itemToDelete, setItemToDelete] = useState<{ value: null | string }>({
    value: null,
  });
  const [selectedItem, setSelectedItem] = useState<any>({})

  useEffect(() => {
    if (!searchTerm) {
      setSellerOffersCopy(sellerOffers)

      return
    }

    const _sellerOffers = sellerOffers.filter(sellerOffer => sellerOffer.company.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setSellerOffersCopy(_sellerOffers)
  }, [searchTerm, sellerOffers])

  useEffect(() => {
    if (deleteMarketRequest.pending) {
      setItemToDelete({ value: null });
    } else {
      dispatch(getAllMarketRequestActions.request({}));
    }
  }, [deleteMarketRequest]);

  useEffect(() => {
    sellerOffers.forEach(marketOffer =>
      marketOffer.offers.forEach(offer => {
        if (offer.id === offerId) {
          setSelectedItem(offer)
          return
        }
      })
    )
  }, [offerId, sellerOffers])

  const countAllOffers = () => {
    let offersCount = 0
    sellerOffersCopy.forEach(sellerOffer => {
      offersCount += sellerOffer.offers.length
    })

    return offersCount;
  }

  const isFiltered = () => {
    const _isFilterd = (Array.isArray(props.filterModalProps.selectedFilters) &&
      props.filterModalProps.selectedFilters.length > 0)

    return _isFilterd
  }

  const renderCounter = () => (
    <CounterCol>
      <CounterContainer>
        <Typography
          color="shade6"
          variant="label"
          style={{ marginRight: "16px" }}
        >
          <span style={{ color: "#09131D" }}>{countAllOffers()}</span>
          <span>{' '}Results</span>
        </Typography>

        <Sorter onClick={() => props.onClickFilterButton()}>
          <Typography color="shade9" variant="label" style={{ marginRight: "15px" }}>Sort by</Typography>
          <DropdownArrow fill={theme.grey.shade6} />
        </Sorter>

      </CounterContainer>
    </CounterCol>
  )

  const renderSearch = () => (
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
  )

  const renderLeftComponent = () => (
    <Col sm={12} md={12} xl={8}  >
      <Row style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {
          isFiltered() ?
            <Hidden xs sm md lg>
              {renderSearch()}
            </Hidden>
            :
            (sellerOffers.length > 0 && !location.pathname.includes("/offer/")) &&
            <Hidden xs sm md lg>
              {renderSearch()}
            </Hidden>
        }

        {
          isFiltered() ?
            <Hidden xs sm md lg>
              {renderCounter()}
            </Hidden>
            :
            (sellerOffers.length > 0 && !location.pathname.includes("/offer/")) &&
            <Hidden xs sm md lg>
              {renderCounter()}
            </Hidden>
        }
      </Row>

      <Switch>
        <Route path={BUYER_ROUTES.MARKET_REQUEST_DETAILS_OFFER_LIST(marketRequestId)}>
          {
            sellerOffersCopy.length > 0 ?
              sellerOffersCopy.map(sellerOffer =>
                <Offer sellerOffer={sellerOffer} onOfferDelete={onOfferDelete} />
              ) :
              <>
                {
                  isFiltered() ?
                    null :
                    <>
                      <EmptyStateView
                        title=""
                        Svg={Octopus}
                        height={240}
                        width={249}
                        fluid
                      />
                      <div style={{ display: "flex", alignItems: "center", flexFlow: "column" }}>
                        <Typography weight="700" color="shade8" variant="title6" style={{ fontFamily: "Media Sans" }}>
                          There are no offers yet
                        </Typography>
                        <Typography weight="400" color="shade6" variant="caption" style={{ marginTop: "4px", fontFamily: "Basis Grotesque Pro" }}>
                          Enable your push notifications
                        </Typography>
                      </div>
                    </>
                }
              </>
          }
        </Route>

        <Route
          path={BUYER_ROUTES.MARKET_REQUEST_DETAILS_OFFER(
            marketRequestId,
            currentOfferId
          )}
        >
          <div style={{ marginTop: "16px" }}>
            <FullOfferDetails
              handleStartNegotiate={handleStartNegotiate}
              handleAcceptOffer={handleAcceptOffer}
              isAccepted={isAccepted}
              thereIsNewOffer={thereIsNewOffer}
              counterOffer={counterOffer}
              newOffer={newOffer}
            />
          </div>
        </Route>
      </Switch>
    </Col >
  )

  const countAcceptedWeight = () => {
    let acceptedWeights = 0

    sellerOffers.forEach(sellerOffer => {
      sellerOffer.offers.forEach(offer => {
        if (offer.status === "ACCEPTED") {
          acceptedWeights += offer.weight
        }
      })
    })

    return acceptedWeights
  }

  const filteredMarketRequest = (): GetAllMarketRequestResponseItem => {
    const _marketRequests = buyerRequests.data?.data.marketRequests.filter(marketRequest => marketRequest.id === marketRequestId)

    if (_marketRequests && _marketRequests.length > 0) {
      return _marketRequests[0]
    }

    return null as any
  }

  const convertCreatedToExpiryDate = (createdAt?: string) => {
    const expiry = moment(createdAt).add(7, 'd').isBefore()
      ? 'Expired'
      : formatRunningDateDifference(
        moment(createdAt).add(7, 'd').format()
      )

    return expiry;
  }

  const renderSpecs = () => (
    buyerRequests.data?.data?.marketRequests[0]?.specs &&
    <DetailsContentContainer>
      <Typography
        color="shade6"
        variant="label"
        style={{
          marginBottom: 16,
          fontFamily: 'Wilderness',
          fontSize: 24,
        }}
      >
        Specs:
      </Typography>
      <DetailsDataContainer>
        <Cross7 />
        <Typography
          color="shade9"
          variant="label"
          style={{
            fontFamily: 'Wilderness',
            fontSize: 38,
            marginLeft: 8.5,
            marginTop: -8,
          }}
        >
          {buyerRequests.data?.data.marketRequests[0].specs?.toString().split(",").join(", ")}
        </Typography>
      </DetailsDataContainer>
    </DetailsContentContainer>
  )

  const renderSize = () => {
    const sizeOptions = buyerRequests.data?.data?.marketRequests[0]?.sizeOptions

    if (sizeOptions && Array.isArray(sizeOptions) && sizeOptions.length > 0) {
      return <DetailsContentContainer>
        <Typography
          color="shade6"
          variant="label"
          style={{
            marginBottom: 16,
            fontFamily: 'Wilderness',
            fontSize: 24,
          }}
        >
          Size:
        </Typography>
        <DetailsDataContainer>
          <Cross7 />
          <Typography
            color="shade9"
            variant="label"
            style={{
              fontFamily: 'Wilderness',
              fontSize: 38,
              marginLeft: 8.5,
              marginTop: -8,
            }}
          >
            {Array.isArray(sizeOptions) ? sizeOptions?.join(', ') : ''}
          </Typography>
        </DetailsDataContainer>
      </DetailsContentContainer>
    }

    return null
  }

  const renderQuantity = () => {
    return <DetailsContentContainer>
      <Typography
        color="shade6"
        variant="label"
        style={{
          marginBottom: 16,
          fontFamily: 'Wilderness',
          fontSize: 24,
        }}
      >
        Quantity:
      </Typography>
      <DetailsDataContainer>
        <Cross7 />
        <Typography
          color="shade9"
          variant="label"
          style={{
            fontFamily: 'Wilderness',
            fontSize: 38,
            marginLeft: 8.5,
            marginTop: -8,
          }}
        >
          {filteredMarketRequest()?.weight?.from}{" "}{filteredMarketRequest()?.measurementUnit.toLowerCase()} - {filteredMarketRequest()?.weight?.to}{" "}{filteredMarketRequest()?.measurementUnit.toLowerCase()}
        </Typography>
      </DetailsDataContainer>
    </DetailsContentContainer>
  }

  const calculatePercentage = () => {
    const percentage = ((100 * countAcceptedWeight()) / (filteredMarketRequest()?.weight?.to || 0)) || 0

    return percentage
  }

  const renderSummary = () => (
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

      {renderSpecs()}
      <div style={{ marginTop: "25px" }}></div>
      {renderSize()}
      <div style={{ marginTop: "25px" }}></div>
      {renderQuantity()}
    </SummaryContainer>
  )

  const renderRightComponent = () => (
    <Col sm={12} md={12} xl={4}  >
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
              {countAcceptedWeight()}
              <span style={{ color: theme.grey.shade5 }}>/{filteredMarketRequest()?.weight?.to}{" "}{filteredMarketRequest()?.measurementUnit.toLowerCase()}</span>
            </Typography>

            <ProgressContainer>
              <Progress height="2px" percent={calculatePercentage()} />
            </ProgressContainer>

            <Typography
              margin="12px 0px 0px 0px"
              color="shade6"
              variant="caption"
            >
              {convertCreatedToExpiryDate(sellerOffers[0]?.marketRequest?.createdAt)}
            </Typography>
          </div>

          <DeleteButtonContainer>
            <Button
              iconPosition="before"
              icon={<TrashCan fill={'#FFF'} width={16} height={16} />}
              onClick={
                setItemToDelete &&
                ((e) => {
                  e.stopPropagation();
                  setItemToDelete({ value: sellerOffers[0].marketRequest.id || '' });
                  setShowDelete(true)
                })
              }
              variant="primary"
              size="sm"
              className="delete-button"
            />
          </DeleteButtonContainer>
        </RequestDetailsMobileContainer>
      </RequestDetailsParentContainer>

      <Hidden xs sm md lg>
        {renderSummary()}
      </Hidden>
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
        onSubmit={submitNegotiation}
        originalOffer={selectedOffer?.price || selectedItem?.price}
        counterOffer={counterOffer}
        newOffer={newOffer}
        weight={{
          unit: selectedOffer?.measurementUnit || selectedItem?.measurementUnit,
          value: selectedOffer?.weight || selectedItem?.weight,
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

      <Hidden xs sm>
        <HeaderContainer>
          <div >
            <Breadcrumbs sections={breadCrumbSections} />
          </div>
        </HeaderContainer>
      </Hidden>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Row>
            {renderItemName()}
          </Row>

          <Row gutterWidth={30} >
            <Visible xs sm md lg>
              {renderSearch()}
              {renderCounter()}
            </Visible>
            <Hidden xs sm md lg>
              {renderLeftComponent()}
              {renderRightComponent()}
            </Hidden>
            <Visible xs sm md lg>
              {renderRightComponent()}
              {renderLeftComponent()}
            </Visible>
            <Visible lg>
              <Col>
                {renderSummary()}
              </Col>
            </Visible>
          </Row>
        </>
      )}
    </RequestDetailsContainer>
  );
};

export default MarketRequestDetailView;
