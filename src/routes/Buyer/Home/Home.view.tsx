import React, { useRef, useEffect, useState } from 'react';

import Button from 'components/base/Button';
import PaginateList from 'components/base/PaginateList';
import Select from 'components/base/Select';
import { Octopus, InfoFilled, ChevronRight } from 'components/base/SVG';
import ArrowRight from 'components/base/SVG/ArrowRight';
import Typography from 'components/base/Typography';
import Carousel from 'components/module/Carousel';
import Card from 'components/module/CategoryCards/Landing';
import PreviewCard from 'components/module/CategoryCards/Preview';
import ConfirmationModal from 'components/module/ConfirmationModal';
import EmptyState from 'components/module/EmptyState';
import Loading from 'components/module/Loading';
import Search from 'components/module/Search';
import SearchAddress from 'components/module/SearchAddress';
import { BUYER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { isEmpty } from 'ramda';
import reverse from 'ramda/es/reverse';
import { Row, Col, Container } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory, Link } from 'react-router-dom';
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
    categories,
    search,
    searchTerm,
    setSearchTerm,
    loading,
    results,
    onReset,
    recent,
    saveSearchHistory,
    creditState,
    featured,
    favourites,
    recentlyAdded,
    sellers,
    favouriteSellers,
    addresses,
    addressOptions,
    selectedAddress,
    changeDefaultAddress,
  } = props;
  const [addressModalChange, setAddressModalChange] = useState(false);
  const [currentAddressSelected, setCurrentAddressSelected] = useState();
  const isFavouriteSM = useMediaQuery({ query: `(max-width: 1023px)` });
  const [changeAddress, setChangeAddress] = useState({
    currentAddress: '',
    newChangeAddress: '',
  });

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

  useEffect(() => {
    if (addressOptions) {
      const filterAddressDefault = addresses.filter((i) => i.default);
      const filteredArray = addressOptions.find(
        (a) => a.value === filterAddressDefault[0].id
      );
      setCurrentAddressSelected(filteredArray);
    }
  }, [addressOptions, addresses]);

  useEffect(() => {
    setChangeAddress({
      ...changeAddress,
      currentAddress: currentAddressSelected || '',
    });
  }, [currentAddressSelected]);
  const confirmChangeAddress = () => {
    changeDefaultAddress(changeAddress.newChangeAddress);
  };

  const showRecentSearch = searchTerm.length === 0;
  const data = showRecentSearch ? reverse(recent) : results;
  return (
    <ViewContainer>
      <ConfirmationModal
        isOpen={addressModalChange}
        title="Change your Buying Address?"
        description="Are you sure you want to change your buying address? This will reset your current cart."
        action={() => {
          confirmChangeAddress();
          setAddressModalChange(false);
        }}
        actionText="Okay"
        onClickClose={() => {
          setAddressModalChange(false);
        }}
      />
      <div className="wrapper">
        <Credit creditState={creditState} loading={loading} />
        <Col xs={12} style={{ marginBottom: '46px' }}>
          <SearchAddress
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            resetValue={onReset}
            placeholder="Search.."
          />
          {/* <div className="buying-for">
            <Select
              options={addressOptions}
              label="Buying For"
              size="small"
              onChange={(e) => {
                setAddressModalChange(true);
                setChangeAddress({
                  ...changeAddress,
                  newChangeAddress: e.value,
                });
              }}
              value={currentAddressSelected}
            />
          </div> */}
        </Col>
        {!isEmpty(data) && (
          <Typography variant="overline" color="shade6">
            {showRecentSearch ? 'Recent Searches' : 'Results'}
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
              // resultCount="3"
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
            {favourites.length > 0
              ? favourites
                  .slice(0, getMaxFavouritesDisplay())
                  .map((fav, index) => {
                    return (
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
                    );
                  })
              : null}
          </FavouritesContainer>
        </ViewCol>

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
            {categories.length > 0 ? (
              categories.slice(0, 4).map((category, index) => {
                return (
                  <Link
                    to={BUYER_ROUTES.CATEGORY_PRODUCTS(category.id)}
                    key={category.id}
                  >
                    <Card
                      sortIndex={category.sortIndex}
                      id={category.id}
                      image={category.thumbnail}
                      label={category.name}
                    />
                  </Link>
                );
              })
            ) : (
              <Loading />
            )}
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
            {recentlyAdded.length > 0
              ? recentlyAdded
                  .slice(0, getMaxFavouritesDisplay())
                  .map((recent, index) => {
                    return (
                      <Link key={recent.id} to={`/buyer/product/${recent.id}`}>
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
                    );
                  })
              : null}
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
            {favouriteSellers.length > 0 ? (
              favouriteSellers.slice(0, 4).map((s, index) => {
                return (
                  <Link to={`/buyer/seller-details/${s.id}`} key={s.id}>
                    <CardContainer className="centered">
                      <div className="card">
                        <img src={s.companyImage} alt={s.companyImage} />
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
                );
              })
            ) : (
              <>
                {categories.length > 0 && favouriteSellers.length <= 0 ? (
                  <Typography>
                    You currently have no favourite sellers.
                  </Typography>
                ) : (
                  <Loading />
                )}
              </>
            )}
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
            {sellers.length > 0 ? (
              sellers.slice(0, 4).map((s, index) => {
                return (
                  <Link to={`/buyer/seller-details/${s.id}`} key={s.id}>
                    <CardContainer className="centered">
                      <div className="card">
                        <img src={s.companyImage} alt={s.companyImage} />
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
                );
              })
            ) : (
              <Loading />
            )}
          </SellerContainer>
        </ViewCol>
      </div>
    </ViewContainer>
  );
};

export default HomeView;
