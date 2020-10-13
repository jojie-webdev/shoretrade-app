import React, { useRef, useEffect, useState } from 'react';

import Button from 'components/base/Button';
import PaginateList from 'components/base/PaginateList';
import {
  Octopus,
  InfoFilled,
  ChevronRight,
  CarouselChevronLeft,
  CarouselChevronRight,
} from 'components/base/SVG';
import ArrowRight from 'components/base/SVG/ArrowRight';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import Carousel from 'components/module/Carousel';
import Card from 'components/module/CategoryCards/Landing';
import PreviewCard from 'components/module/CategoryCards/Preview';
import EmptyState from 'components/module/EmptyState';
import Loading from 'components/module/Loading';
import Search from 'components/module/Search';
import { BUYER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { isEmpty } from 'ramda';
import reverse from 'ramda/es/reverse';
import { Row, Col, Container } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { sizeToString } from 'utils/Listing';
import { toPrice } from 'utils/String/toPrice';
import { useTheme } from 'utils/Theme';

import { HomeGeneratedProps, CreditState } from './Home.props';
import {
  CategoriesContainer,
  CategoriesHeader,
  CreditContainer,
  Text,
  Bold,
  InfoContainer,
  FavouritesHeader,
  FavouritesContainer,
  SwiperContainer,
  GridContainer,
  SearchRow,
  ViewCol,
  ViewContainer,
  RecentHeader,
  RecentContainer,
  SellerHeader,
  SellerContainer,
  CardContainer,
  SellerCardTypography,
  ArrowArea,
  SmallAlertContainer,
} from './Home.style';

const Credit = (props: { creditState: CreditState; loading: boolean }) => {
  const { creditState, loading } = props;
  const theme = useTheme();
  const history = useHistory();

  if (loading) {
    return <Loading />;
  }

  if (creditState === 'empty' || creditState === 'lessThan') {
    return (
      <SmallAlertContainer
        onClick={() => history.push('/buyer/account/bank-details')}
        style={{ cursor: 'pointer' }}
      >
        <div className="icon-container">
          <InfoFilled height={20} width={20} fill={theme.grey.shade8} />
        </div>
        <Text variant="label" color="shade8">
          {creditState === 'empty' ? (
            <>
              You need to add credit to your account in order to make purchases.
              <Bold variant="label" weight="bold">
                {' '}
                Click here
              </Bold>{' '}
              to add credit to your account.
            </>
          ) : (
            <>
              <>
                You have{' '}
                <Bold variant="label" weight="bold">
                  less than $250
                </Bold>{' '}
                in your account. Please fill it up if you want to continue
                making purchases.
              </>
            </>
          )}
        </Text>
        <span style={{ paddingRight: '20px' }}>
          <ChevronRight height={20} width={20} fill={theme.grey.shade8} />
        </span>
      </SmallAlertContainer>
      // <CreditContainer
      //   onClick={() => history.push('/buyer/account/bank-details')}
      //   style={{ cursor: 'pointer' }}
      // >
      //   <InfoContainer>
      //     <InfoFilled height={20} width={20} fill={theme.grey.shade8} />
      //   </InfoContainer>
      //   <Text variant="label" color="shade8">
      //     {creditState === 'empty' ? (
      //       <>
      //         You need to add credit to your account in order to make purchases.
      //         <Bold variant="label" weight="bold">
      //           {' '}
      //           Click here
      //         </Bold>{' '}
      //         to add credit to your account.
      //       </>
      //     ) : (
      //       <>
      //         <>
      //           You have{' '}
      //           <Bold variant="label" weight="bold">
      //             less than $250
      //           </Bold>{' '}
      //           in your account. Please fill it up if you want to continue
      //           making purchases.
      //         </>
      //       </>
      //     )}
      //   </Text>
      //   <span style={{ paddingRight: '20px' }}>
      //     <ChevronRight height={20} width={20} fill={theme.grey.shade8} />
      //   </span>
      // </CreditContainer>
    );
  }
  return null;
};

const HomeView = (props: HomeGeneratedProps) => {
  const history = useHistory();
  const {
    searchTerm,
    setSearchTerm,
    loading,
    results,
    onReset,
    recent,
    saveSearchHistory,
    creditState,
    featured,
    chunkedCategories,
    search,
    chunkedFavorites,
    chunkedRecentlyAdded,
    chunkedSellers,
    chunkedFavouriteSellers,
  } = props;

  const isFavouriteSM = useMediaQuery({ query: `(max-width: 1023px)` });

  const isFavouriteMD = useMediaQuery({
    query: `(min-width: 1040px) and (max-width: 1364px)`,
  });

  const hideCarouselArrowArea = useMediaQuery({
    query: `(max-width: 565px)`,
  });

  const mediumArrowWidth = useMediaQuery({
    query: BREAKPOINTS['md'],
  });

  const getMaxFavouritesDisplay = () => {
    if (isFavouriteSM) {
      return 1;
    }

    if (isFavouriteMD) {
      return 2;
    }

    return 3;
  };

  const showRecentSearch = searchTerm.length === 0;
  const data = showRecentSearch ? reverse(recent) : results;

  // CarouselRefs
  const [favouritesRef, setFavouritesRef] = useState<any>(null);
  const [categoriesRef, setCategoriesRef] = useState<any>(null);
  const [recentlyAddedRef, setRecentlyAddedRef] = useState<any>(null);
  const [favouriteSellersRef, setFavouriteSellersRef] = useState<any>(null);
  const [sellersRef, setSellersRef] = useState<any>(null);

  return (
    <ViewContainer>
      <div className="wrapper">
        <Credit creditState={creditState} loading={loading} />
        <Col xs={12} style={{ marginBottom: '46px' }}>
          <Search
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            resetValue={onReset}
            placeholder="Search.."
          />
        </Col>
        {!isEmpty(data) && (
          <Typography variant="overline" color="shade6">
            {showRecentSearch ? 'Recent Searches' : `Results ${results.length}`}
          </Typography>
        )}
        {isEmpty(data) && searchTerm.length > 0 && !loading ? (
          <>
            <EmptyState
              onButtonClicked={onReset}
              Svg={Octopus}
              title="No search result"
              buttonText="Reset Search"
            />
            <div style={{ marginBottom: '48px' }}></div>
          </>
        ) : (
          <>
            <PaginateList
              list={data || []}
              labelPath={['label']}
              maxItemPerPage={6}
              onClickItem={(item) => {
                history.push(BUYER_ROUTES.SEARCH_PREVIEW(item.value));
                saveSearchHistory(item.value, item.label, item.count);
              }}
            />
            <div style={{ marginBottom: '48px' }}></div>
          </>
        )}
      </div>

      <Carousel
        id="featured-carousel"
        images={featured}
        loop
        autoplay
        hideArrowArea={hideCarouselArrowArea}
        arrowWidth={mediumArrowWidth ? 75 : undefined}
      />

      <div className="wrapper">
        <ViewCol>
          <FavouritesHeader>
            <Typography variant="title5" color="shade8">
              Favourites
            </Typography>
            <Button
              text="See All"
              variant="unselected"
              size="sm"
              icon={<ArrowRight fill="#E35D32" />}
              style={{ padding: '4px 8px' }}
              onClick={() => history.push(BUYER_ROUTES.FAVOURITES)}
            />
          </FavouritesHeader>

          <FavouritesContainer>
            <ArrowArea left>
              <Touchable onPress={() => favouritesRef.slidePrev()}>
                <CarouselChevronLeft width={18} height={18} />
              </Touchable>
            </ArrowArea>

            <Swiper
              style={{ width: '100%' }}
              onSwiper={(ref) => {
                setFavouritesRef(ref);
              }}
            >
              {chunkedFavorites.map((chunked, ndx) => {
                return (
                  <SwiperSlide key={`favorite${ndx}`}>
                    <Row style={{ width: '100%' }}>
                      {chunked.map((fav) => (
                        <Col md={4} lg={3} key={fav.id}>
                          <Link key={fav.id} to={`/buyer/product/${fav.id}`}>
                            <PreviewCard
                              id={fav.id}
                              images={fav.images}
                              type={fav.type}
                              price={toPrice(fav.price)}
                              remaining={fav.remaining.toFixed(2)}
                              coop={fav.coop}
                              minimumOrder={fav.minimumOrder}
                              origin={fav.origin}
                              weight={sizeToString(
                                fav.size.unit,
                                fav.size.from,
                                fav.size.to
                              )}
                              isAquafuture={fav.isAquafuture}
                              unit={fav.measurementUnit}
                              state={fav.state}
                            />
                          </Link>
                        </Col>
                      ))}
                    </Row>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <ArrowArea right>
              <Touchable onPress={() => favouritesRef.slideNext()}>
                <CarouselChevronRight width={18} height={18} />
              </Touchable>
            </ArrowArea>
          </FavouritesContainer>
        </ViewCol>
      </div>

      <div className="wrapper">
        <ViewCol>
          <CategoriesHeader>
            <Typography variant="title5" color="shade8">
              Categories
            </Typography>
            <Button
              text="See All"
              variant="unselected"
              size="sm"
              icon={<ArrowRight fill="#E35D32" />}
              style={{ padding: '4px 8px' }}
              onClick={() => history.push(BUYER_ROUTES.CATEGORIES)}
            />
          </CategoriesHeader>
          <CategoriesContainer>
            <ArrowArea left>
              <Touchable onPress={() => categoriesRef.slidePrev()}>
                <CarouselChevronLeft width={18} height={18} />
              </Touchable>
            </ArrowArea>

            <Swiper
              style={{ width: '100%' }}
              onSwiper={(ref) => setCategoriesRef(ref)}
            >
              {!loading ? (
                chunkedCategories.map((chunked, ndx) => {
                  return (
                    <SwiperSlide key={`category${ndx}`}>
                      <Row style={{ width: '100%' }}>
                        {chunked.map((category) => (
                          <Col md={3} key={category.id}>
                            <Link
                              to={BUYER_ROUTES.CATEGORY_PRODUCTS(category.id)}
                            >
                              <Card
                                sortIndex={category.sortIndex}
                                id={category.id}
                                image={category.thumbnail}
                                label={category.name}
                              />
                            </Link>
                          </Col>
                        ))}
                      </Row>
                    </SwiperSlide>
                  );
                })
              ) : (
                <Loading />
              )}
            </Swiper>

            <ArrowArea right>
              <Touchable onPress={() => categoriesRef.slideNext()}>
                <CarouselChevronRight width={18} height={18} />
              </Touchable>
            </ArrowArea>
          </CategoriesContainer>
        </ViewCol>
      </div>

      <div style={{ width: 'calc(100% - 200px)', margin: 'auto' }}>
        <ViewCol>
          <RecentHeader>
            <Typography variant="title5" color="shade8">
              Recently Added
            </Typography>
            <Button
              text="See All"
              variant="unselected"
              size="sm"
              icon={<ArrowRight fill="#E35D32" />}
              style={{ padding: '4px 8px' }}
              onClick={() => history.push(BUYER_ROUTES.RECENTLY_ADDED)}
            />
          </RecentHeader>

          <RecentContainer>
            <ArrowArea left>
              <Touchable onPress={() => recentlyAddedRef.slidePrev()}>
                <CarouselChevronLeft width={18} height={18} />
              </Touchable>
            </ArrowArea>
            <Swiper
              style={{ width: '100%' }}
              onSwiper={(ref) => setRecentlyAddedRef(ref)}
            >
              {chunkedRecentlyAdded.map((chunked, ndx) => {
                return (
                  <SwiperSlide key={`recentlyAdded${ndx}`}>
                    <Row style={{ width: '100%' }}>
                      {chunked.map((recent) => (
                        <Col md={4} lg={3} key={recent.id}>
                          <Link to={`/buyer/product/${recent.id}`}>
                            <PreviewCard
                              id={recent.id}
                              images={recent.images}
                              type={recent.type}
                              price={toPrice(recent.price)}
                              remaining={recent.remaining.toFixed(2)}
                              coop={recent.coop}
                              minimumOrder={recent.minimumOrder}
                              origin={recent.origin}
                              weight={sizeToString(
                                recent.size.unit,
                                recent.size.from,
                                recent.size.to
                              )}
                              isAquafuture={recent.isAquafuture}
                              unit={recent.measurementUnit}
                              state={recent.state}
                            />
                          </Link>
                        </Col>
                      ))}
                    </Row>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <ArrowArea right>
              <Touchable onPress={() => recentlyAddedRef.slideNext()}>
                <CarouselChevronRight width={18} height={18} />
              </Touchable>
            </ArrowArea>
          </RecentContainer>
        </ViewCol>
      </div>
      <div style={{ width: 'calc(100% - 200px)', margin: 'auto' }}>
        <ViewCol>
          <SellerHeader>
            <Typography variant="title5" color="shade8">
              Favourite Sellers
            </Typography>
            <Button
              text="See All"
              variant="unselected"
              size="sm"
              icon={<ArrowRight fill="#E35D32" />}
              style={{ padding: '4px 8px' }}
              onClick={() => history.push(BUYER_ROUTES.FAVOURITE_SELLERS)}
            />
          </SellerHeader>
          <SellerContainer>
            <ArrowArea left>
              <Touchable onPress={() => favouriteSellersRef.slidePrev()}>
                <CarouselChevronLeft width={18} height={18} />
              </Touchable>
            </ArrowArea>
            <Swiper
              style={{ width: '100%' }}
              id="favouriteSellers"
              onSwiper={(ref) => setFavouriteSellersRef(ref)}
            >
              {chunkedFavouriteSellers.map((chunked, ndx) => {
                return (
                  <SwiperSlide key={`favoriteSellers${ndx}`}>
                    <Row style={{ width: '100%' }}>
                      {chunked.map((s) => (
                        <Col md={4} lg={3} key={s.id}>
                          <Link to={`/buyer/seller-details/${s.id}`} key={s.id}>
                            <CardContainer className="centered">
                              <div className="card">
                                <img
                                  src={s.companyImage}
                                  alt={s.companyImage}
                                />
                                <div className="card-content">
                                  <SellerCardTypography
                                    variant="label"
                                    style={{ lineHeight: '-24px' }}
                                  >
                                    {s.companyName}
                                  </SellerCardTypography>
                                </div>
                              </div>
                            </CardContainer>
                          </Link>
                        </Col>
                      ))}
                    </Row>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <ArrowArea right>
              <Touchable onPress={() => favouriteSellersRef.slidePrev()}>
                <CarouselChevronRight width={18} height={18} />
              </Touchable>
            </ArrowArea>
          </SellerContainer>
        </ViewCol>
      </div>
      <div style={{ width: 'calc(100% - 200px)', margin: 'auto' }}>
        <ViewCol>
          <SellerHeader>
            <Typography variant="title5" color="shade8">
              Sellers
            </Typography>
            <Button
              text="See All"
              variant="unselected"
              size="sm"
              icon={<ArrowRight fill="#E35D32" />}
              style={{ padding: '4px 8px' }}
              onClick={() => history.push(BUYER_ROUTES.SELLERS)}
            />
          </SellerHeader>
          <SellerContainer>
            <ArrowArea left>
              <Touchable onPress={() => sellersRef.slidePrev()}>
                <CarouselChevronLeft width={18} height={18} />
              </Touchable>
            </ArrowArea>
            <Swiper
              style={{ width: '100%' }}
              id="sellers"
              onSwiper={(ref) => setSellersRef(ref)}
            >
              {chunkedSellers.map((chunked, ndx) => {
                return (
                  <SwiperSlide key={`favoriteSellers${ndx}`}>
                    <Row style={{ width: '100%' }}>
                      {chunked.map((s) => (
                        <Col md={4} lg={3} key={s.id}>
                          <Link to={`/buyer/seller-details/${s.id}`} key={s.id}>
                            <CardContainer className="centered">
                              <div className="card">
                                <img
                                  src={s.companyImage}
                                  alt={s.companyImage}
                                />
                                <div className="card-content">
                                  <SellerCardTypography
                                    variant="label"
                                    style={{ lineHeight: '-24px' }}
                                  >
                                    {s.companyName}
                                  </SellerCardTypography>
                                </div>
                              </div>
                            </CardContainer>
                          </Link>
                        </Col>
                      ))}
                    </Row>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <ArrowArea right>
              <Touchable onPress={() => sellersRef.slideNext()}>
                <CarouselChevronRight width={18} height={18} />
              </Touchable>
            </ArrowArea>
          </SellerContainer>
        </ViewCol>
      </div>
    </ViewContainer>
  );
};

export default HomeView;
