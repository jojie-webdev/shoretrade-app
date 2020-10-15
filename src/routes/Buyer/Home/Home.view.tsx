import React, { useRef, useEffect, useState } from 'react';

import Button from 'components/base/Button';
import PaginateList from 'components/base/PaginateList';
import Select from 'components/base/Select';
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
import { CardProps } from 'components/module/CategoryCards/Landing/Card.props';
import PreviewCard from 'components/module/CategoryCards/Preview';
import { PreviewProps } from 'components/module/CategoryCards/Preview/Preview.props';
import ConfirmationModal from 'components/module/ConfirmationModal';
import EmptyState from 'components/module/EmptyState';
import Loading from 'components/module/Loading';
import MultipleCarousel from 'components/module/MultipleCarousel';
import Search from 'components/module/Search';
import SellerCard from 'components/module/SellerCard';
import { SellerCardProps } from 'components/module/SellerCard/SellerCard.props';
import { BUYER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { isEmpty } from 'ramda';
import reverse from 'ramda/es/reverse';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GetBuyerHomepageResponseListingItem } from 'types/store/GetBuyerHomepageState';
import { useTheme } from 'utils/Theme';

import {
  HomeGeneratedProps,
  CreditState,
  CategoryResults,
  SellerResults,
} from './Home.props';
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
import {
  categoriesToCardProps,
  favouriteSellersToSellerCardProps,
  favouritesToPreviewProps,
  recentlyAddedToPreviewProps,
} from './Home.transform';

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
    search,
    addresses,
    addressOptions,
    selectedAddress,
    changeDefaultAddress,
    recentlyAdded,
    categories,
    favourites,
    favouriteSellers,
    sellers,
  } = props;
  const [addressModalChange, setAddressModalChange] = useState(false);
  const [currentAddressSelected, setCurrentAddressSelected] = useState();
  const [changeAddress, setChangeAddress] = useState({
    currentAddress: '',
    newChangeAddress: '',
  });

  const hideCarouselArrowArea = useMediaQuery({
    query: `(max-width: 565px)`,
  });

  const mediumArrowWidth = useMediaQuery({
    query: BREAKPOINTS['md'],
  });

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
          <Search
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            resetValue={onReset}
            placeholder="Search.."
          />
          <div className="buying-for">
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
          </div>
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
            <MultipleCarousel<GetBuyerHomepageResponseListingItem, PreviewProps>
              data={favourites}
              transform={favouritesToPreviewProps}
              Component={PreviewCard}
              link={BUYER_ROUTES.PRODUCT_DETAIL}
            />
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
            <MultipleCarousel<CategoryResults, CardProps>
              data={categories}
              transform={categoriesToCardProps}
              Component={Card}
              link={BUYER_ROUTES.CATEGORY_PRODUCTS}
            />
          </CategoriesContainer>
        </ViewCol>
      </div>

      <div className="wrapper">
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
            <MultipleCarousel<GetBuyerHomepageResponseListingItem, PreviewProps>
              data={recentlyAdded}
              transform={recentlyAddedToPreviewProps}
              Component={PreviewCard}
              link={BUYER_ROUTES.PRODUCT_DETAIL}
            />
          </RecentContainer>
        </ViewCol>
      </div>

      <div className="wrapper">
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
            <MultipleCarousel<SellerResults, SellerCardProps>
              data={favouriteSellers}
              transform={favouriteSellersToSellerCardProps}
              Component={SellerCard}
              link={BUYER_ROUTES.SELLER_DETAILS}
            />
          </SellerContainer>
        </ViewCol>
      </div>

      <div className="wrapper">
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
            <MultipleCarousel<SellerResults, SellerCardProps>
              data={sellers}
              transform={favouriteSellersToSellerCardProps}
              Component={SellerCard}
              link={BUYER_ROUTES.SELLER_DETAILS}
            />
          </SellerContainer>
        </ViewCol>
      </div>
    </ViewContainer>
  );
};

export default HomeView;
