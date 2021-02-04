import React, { useEffect, useState, useCallback } from 'react';

import Alert from 'components/base/Alert';
import { ChevronRight } from 'components/base/SVG';
import Carousel from 'components/module/Carousel';
import Card from 'components/module/CategoryCards/Landing';
import { CardProps } from 'components/module/CategoryCards/Landing/Card.props';
import PreviewCard from 'components/module/CategoryCards/Preview';
import { PreviewProps } from 'components/module/CategoryCards/Preview/Preview.props';
import HomeSectionHeader from 'components/module/HomeSectionHeader';
import Loading from 'components/module/Loading';
import MultipleCarousel from 'components/module/MultipleCarousel';
import SearchAddress from 'components/module/SearchAddress';
import SellerCard from 'components/module/SellerCard';
import { SellerCardProps } from 'components/module/SellerCard/SellerCard.props';
import { BUYER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { GetBuyerHomepageResponseListingItem } from 'types/store/GetBuyerHomepageState';
import { autoScrollToTop } from 'utils/scrollToTop';
import { useTheme } from 'utils/Theme';

import {
  HomeGeneratedProps,
  CreditState,
  CategoryResults,
  SellerResults,
} from './Home.props';
import {
  CategoriesContainer,
  Text,
  Bold,
  FavouritesContainer,
  ViewCol,
  ViewContainer,
  RecentContainer,
  SellerContainer,
  SwiperContainer,
} from './Home.style';
import {
  categoriesToCardProps,
  favouriteSellersToSellerCardProps,
  favouritesToPreviewProps,
  recentlyAddedToPreviewProps,
} from './Home.transform';

const Credit = (props: { creditState: CreditState; loading: boolean }) => {
  const { creditState } = props;
  const theme = useTheme();
  const history = useHistory();

  if (creditState === 'empty' || creditState === 'lessThan') {
    return (
      <Alert
        variant="alert"
        fullWidth
        content={
          <>
            {creditState === 'empty' ? (
              <>
                You need to add credit to your account in order to make
                purchases. <Bold>Click here</Bold> to add credit to your
                account.
              </>
            ) : (
              <>
                You have <Bold>less than $250 </Bold> in your account. Please
                fill it up if you want to continue making purchases.
              </>
            )}
          </>
        }
        iconRight={
          <ChevronRight height={20} width={20} fill={theme.grey.shade8} />
        }
        onClick={() => history.push('/buyer/account/bank-details')}
        style={{ cursor: 'pointer', marginBottom: 24 }}
      />
    );
  }
  return null;
};

const HomeView = (props: HomeGeneratedProps) => {
  const history = useHistory();
  const {
    loading,
    creditState,
    featured,
    recentlyAdded,
    categories,
    favourites,
    favouriteSellers,
    sellers,
    loadingHomePage,
  } = props;

  const hideCarouselArrowArea = useMediaQuery({
    query: `(max-width: 565px)`,
  });

  const mediumArrowWidth = useMediaQuery({
    query: BREAKPOINTS['md'],
  });

  const cbRef = useCallback(
    (node: any) => {
      if (node !== null) {
        autoScrollToTop(history, node);
      }
    },
    [history.location]
  );

  return (
    <ViewContainer ref={cbRef}>
      <div className="wrapper">
        <Credit creditState={creditState} loading={loading} />
        <Col xs={12}>
          <SearchAddress />
        </Col>
      </div>

      {/* Main Content */}
      {loadingHomePage ? (
        <Loading />
      ) : (
        <>
          <SwiperContainer>
            <Carousel
              id="featured-carousel"
              images={featured}
              loop
              autoplay
              hideArrowArea={hideCarouselArrowArea}
              arrowWidth={mediumArrowWidth ? 75 : undefined}
              addMargin
            />
          </SwiperContainer>
          <div className="wrapper">
            <ViewCol style={{ paddingTop: '48px' }}>
              <HomeSectionHeader
                title="Favourites"
                onClick={() => history.push(BUYER_ROUTES.FAVOURITES)}
                noMargin
              />

              <FavouritesContainer>
                <MultipleCarousel<
                  GetBuyerHomepageResponseListingItem,
                  PreviewProps
                >
                  data={favourites}
                  transform={favouritesToPreviewProps}
                  Component={PreviewCard}
                  link={BUYER_ROUTES.PRODUCT_DETAIL}
                  emptyText="No Favourite Products"
                  id="favourites"
                />
              </FavouritesContainer>
            </ViewCol>
          </div>

          <div className="wrapper">
            <ViewCol>
              <HomeSectionHeader
                title="Categories"
                onClick={() =>
                  history.push(BUYER_ROUTES.CATEGORIES, { ref: 'home' })
                }
                noMargin
              />

              <CategoriesContainer>
                <MultipleCarousel<CategoryResults, CardProps>
                  data={categories}
                  transform={categoriesToCardProps}
                  Component={Card}
                  link={BUYER_ROUTES.CATEGORY_PRODUCTS}
                  id="categories"
                />
              </CategoriesContainer>
            </ViewCol>
          </div>

          <div className="wrapper">
            <ViewCol>
              <HomeSectionHeader
                title="Recently Added"
                onClick={() => history.push(BUYER_ROUTES.RECENTLY_ADDED)}
                noMargin
              />

              <RecentContainer>
                <MultipleCarousel<
                  GetBuyerHomepageResponseListingItem,
                  PreviewProps
                >
                  data={recentlyAdded}
                  transform={recentlyAddedToPreviewProps}
                  Component={PreviewCard}
                  link={BUYER_ROUTES.PRODUCT_DETAIL}
                  id="recentlyAdded"
                />
              </RecentContainer>
            </ViewCol>
          </div>

          <div className="wrapper">
            <ViewCol>
              <HomeSectionHeader
                title="Favourite Sellers"
                onClick={() => history.push(BUYER_ROUTES.FAVOURITE_SELLERS)}
                noMargin
              />

              <SellerContainer>
                <MultipleCarousel<SellerResults, SellerCardProps>
                  data={favouriteSellers}
                  transform={favouriteSellersToSellerCardProps}
                  Component={SellerCard}
                  link={BUYER_ROUTES.SELLER_DETAILS}
                  emptyText="No Favourite Sellers"
                  id="favouriteSellers"
                />
              </SellerContainer>
            </ViewCol>
          </div>

          <div className="wrapper">
            <ViewCol>
              <HomeSectionHeader
                title="Sellers"
                onClick={() => history.push(BUYER_ROUTES.SELLERS)}
                noMargin
              />

              <SellerContainer>
                <MultipleCarousel<SellerResults, SellerCardProps>
                  data={sellers}
                  transform={favouriteSellersToSellerCardProps}
                  Component={SellerCard}
                  link={BUYER_ROUTES.SELLER_DETAILS}
                  id="sellers"
                />
              </SellerContainer>
            </ViewCol>
          </div>
        </>
      )}
    </ViewContainer>
  );
};

export default HomeView;
