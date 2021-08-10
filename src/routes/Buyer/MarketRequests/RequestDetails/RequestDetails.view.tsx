import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Store } from 'types/store/Store';
import Badge from 'components/base/Badge';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import Select from 'components/base/Select';
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
import { Row, Col, Hidden } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { Route, Switch } from 'react-router-dom';
import { MarketRequestDetailProps } from 'routes/Buyer/MarketRequests/RequestDetails/RequestDetails.props';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { formatRunningDateDifference } from 'utils/MarketRequest';
import { parseImageUrl } from 'utils/parseImageURL';
import theme from 'utils/Theme';
import { MarketRequestItemNonMobile } from '../Landing/Landing.view';
import { RequestDetailsMobileContainer, ProgressContainer, OfferDetailsButtonContainer } from '../RequestDetails/RequestDetails.style';
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
import { Progress } from './../../../Seller/Selling/ListingDetails/ListingDetails.style';
import TrashCan from './../../../../components/base/SVG/TrashCan';
import ProductSellerCard from 'components/module/ProductSellerCard';
import { AvatarContainer, AvatarPlaceholder, StarContainer, RatingRow, AvatarPreview } from './../../../../components/module/ProductSellerCard/ProductSellerCard.style';
import { getAllMarketRequestActions } from 'store/actions';
import deleteMarketRequestActions from './../../../../store/actions/deleteMarketRequest';
import ChevronRight from './../../../../components/base/SVG/ChevronRight';

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
  } = props;

  const deleteMarketRequest = useSelector(
    (store: Store) => store.deleteMarketRequest
  );
  const dispatch = useDispatch();

  const [itemToDelete, setItemToDelete] = useState<{ value: null | string }>({
    value: null,
  });
  const [sellerOffersCopy, setSellerOffersCopy] = useState(sellerOffers)
  const [searchValue, setSearchValue] = useState('')

  const handleStartNegotiate = () => {
    setNegotiating(true);
  };

  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const countTotalOffers = () => {
    let count = 0

    sellerOffers.map(sellerOffer => {
      count += sellerOffer.offers.length
    })

    return count
  }

  useEffect(() => {
    if (!searchValue) {
      setSellerOffersCopy(sellerOffers)

      return
    }

    const _sellerOffersCopy = sellerOffers.filter(marketRequest => marketRequest?.company?.name.toLowerCase().includes(searchValue.toLowerCase()))

    setSellerOffersCopy(_sellerOffersCopy)
  }, [searchValue, sellerOffers])

  useEffect(() => {
    if (deleteMarketRequest.pending) {
      setItemToDelete({ value: null });
    } else {
      dispatch(getAllMarketRequestActions.request({}));
    }
  }, [deleteMarketRequest]);

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
        isOpen={itemToDelete.value !== null}
        title="Delete Market Request"
        description="Are you sure you want to delete this market request?"
        action={() => {
          onClickDelete && onClickDelete();
        }}
        actionText="DELETE"
        onClickClose={() => setItemToDelete({ value: null })}
      />
      <ConfirmationModal
        isOpen={itemToDelete.value !== null}
        title="Delete Market Request"
        description="Are you sure you want to delete this market request?"
        action={() => {
          onClickDelete && onClickDelete();
        }}
        actionText="DELETE"
        onClickClose={() => setItemToDelete({ value: null })}
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
        {
          isMobile && data.name ?
            <Typography
              variant="title5"
              weight="700"
              color="shade9"
              style={{ fontFamily: 'Media Sans' }}
            >
              {data.name}
            </Typography>
            :
            <div>
              <Breadcrumbs sections={breadCrumbSections} />
            </div>
        }
      </HeaderContainer>

      {
        isMobile && data.name &&
        <Search
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Product Name"
          style={{ borderRadius: "12px" }}
        />
      }

      {
        isMobile && data.name &&
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography
            color="shade6"
            variant="label"
          >
            <span style={{ color: "#09131D" }}>{countTotalOffers()}</span>
            <span>{' '}Results</span>
          </Typography>
          <div style={{ marginLeft: "16px", width: "94px" }}>
            <Select
              border="none"
              borderRadius="8px"
              background="#E5E8F5"
              label=""
              options={[]}
              size="small"
              placeholder="Sort by"
              disabled
            // onChange={(e) => setSortField(e?.value)}
            />
          </div>
        </div>
      }

      {
        isLoading ? (
          <Loading />
        ) : (
          <Row gutterWidth={30}>
            <Col md={12} sm={12} xl={4}>
              <RequestDetailsCardContainer type={'none'}
                leftComponent={
                  isMobile ?
                    data && data.name ? (
                      <RequestDetailsMobileContainer>
                        <div className="thumbnail-container">
                          <img src={parseImageUrl(data.image)} />
                        </div>
                        <div style={{ width: "100%" }}>
                          <Typography
                            className="typo"
                            variant="title4"
                            weight="400"
                            color="shade9"
                            style={{ fontFamily: "Basis Grotesque Pro" }}
                          >
                            {sellerOffers[0]?.marketRequest?.weight.from}
                            <span style={{ color: theme.grey.shade5 }}>/{sellerOffers[0]?.marketRequest?.weight.to} kg</span>
                          </Typography>

                          {/* TODO: storybook */}
                          <ProgressContainer>
                            <Progress percent={70} />
                          </ProgressContainer>

                          <Typography
                            className="typo"
                            margin="8px 0px 0px 0px"
                            color="shade6"
                          >
                            1 Day, 16 Hours, 5 Min
                          </Typography>
                        </div>
                      </RequestDetailsMobileContainer>
                    ) : (
                      <></>
                    )
                    :
                    data && data.name ? (
                      <MarketRequestItemNonMobile
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
                    )
                }
                rightComponent={
                  isMobile &&
                  <Button
                    iconPosition="before"
                    icon={<TrashCan fill={'#FFF'} width={16} height={16} />}
                    onClick={
                      setItemToDelete &&
                      ((e) => {
                        e.stopPropagation();
                        setItemToDelete({
                          value: sellerOffersCopy[0].marketRequest.id
                        });
                      })
                    }
                    variant="primary"
                    size="sm"
                    className="delete-button"
                  />
                }
              >

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
                    {totalOffers < 1 || sellerOffersCopy === undefined ? (
                      <EmptyStateView
                        title="There are currently no offers for this request."
                        Svg={Crab}
                        height={240}
                        width={249}
                        fluid
                      />
                    ) : (
                      isMobile ?
                        sellerOffersCopy.map(sellerOffer =>
                          <>
                            {
                              sellerOffer?.offers?.map(offer =>
                                <div style={{ padding: "12px" }}>
                                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>
                                      <div style={{ display: "flex" }}>
                                        <AvatarContainer borderRadius="20px">
                                          {(sellerOffer?.marketRequest?.image || '').length > 0 ? (
                                            <AvatarPreview
                                              src={sellerOffer?.marketRequest?.image}
                                              alt={`${sellerOffer?.marketRequest?.image}-image`}
                                            />
                                          ) : (
                                            <AvatarPlaceholder borderRadius="20px">
                                              <PlaceholderProfile width={48} height={48} />
                                            </AvatarPlaceholder>
                                          )}
                                        </AvatarContainer>

                                        <div style={{ marginLeft: "8px" }}>
                                          <Typography>{sellerOffer?.company?.name}</Typography>
                                          <RatingRow>
                                            {[...Array(5).keys()].map((r) => (
                                              <StarContainer key={r} >
                                                {Number(sellerOffer?.company?.rating || 0) > r ? (
                                                  <StarFilled fill={theme.brand.alert} />
                                                ) : (
                                                  <Star />
                                                )}
                                              </StarContainer>
                                            ))}
                                          </RatingRow>
                                        </div>

                                      </div>

                                      <div style={{ marginTop: "8px" }}>
                                        <Typography weight="700" variant="caption" color="shade9" style={{ fontFamily: "Basis Grotesque Pro" }}>
                                          {offer.weight}{offer.measurementUnit.toLowerCase()} – ${offer?.price}/kg
                                        </Typography>
                                        <Typography weight="700" variant="caption" color="shade6" style={{ fontFamily: "Basis Grotesque Pro" }}>
                                          Specs: {offer.specifications.join(", ")}
                                        </Typography>
                                        <Typography weight="700" variant="caption" color="shade6" style={{ fontFamily: "Basis Grotesque Pro" }}>
                                          Size: Baby, Medium, Large
                                        </Typography>

                                        <Button
                                          text="View Offer"
                                          iconPosition="before"
                                          textColor="success"
                                          // onClick={
                                          //   setItemToDelete &&
                                          //   ((e) => {
                                          //     e.stopPropagation();
                                          //     setItemToDelete({ value: mr.id || '' });
                                          //   })
                                          // }
                                          variant="unselected"
                                          size="sm"
                                          className="delete-button"
                                          style={{ marginTop: "10px", backgroundColor: "#EAFFF9", borderRadius: "8px" }}
                                        />
                                      </div>
                                    </div>
                                    <div style={{ display: "flex", flexFlow: "wrap", alignContent: "space-between", justifyContent: "center", width: "30px" }}>
                                      <div>
                                        <ChevronRight width={8} height={12} />
                                      </div>
                                      <OfferDetailsButtonContainer>
                                        <Button
                                          iconPosition="before"
                                          icon={<TrashCan fill={'#FFF'} width={16} height={16} />}
                                          onClick={
                                            setItemToDelete &&
                                            ((e) => {
                                              e.stopPropagation();
                                              setItemToDelete({
                                                value: sellerOffersCopy[0].marketRequest.id
                                              });
                                            })
                                          }
                                          variant="primary"
                                          size="sm"
                                          className="delete-button"
                                        />
                                      </OfferDetailsButtonContainer>
                                    </div>
                                  </div>
                                </div>
                              )
                            }
                          </>
                        )
                        :
                        sellerOffersCopy.map((seller) => (
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
                              isMobile ?
                                null :
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
                            {
                              isMobile ?
                                null :
                                seller.offers.map((item) => {
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
                                            seller.marketRequest?.averagePrice
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
        )
      }
    </RequestDetailsContainer >
  );
};

export default MarketRequestDetailView;
