import React from 'react';

import Alert from 'components/base/Alert';
import ProgressBar from 'components/base/ProgressBar';
import { ChevronRight } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import Carousel from 'components/module/Carousel';
import Card from 'components/module/CategoryCards/Landing';
import { CardProps } from 'components/module/CategoryCards/Landing/Card.props';
import PreviewCard from 'components/module/CategoryCards/Preview';
import { PreviewProps } from 'components/module/CategoryCards/Preview/Preview.props';
import FreeTrialCountdown from 'components/module/FreeTrialCountdown';
import HomeSectionHeader from 'components/module/HomeSectionHeader';
import Loading from 'components/module/Loading';
import MultipleCarousel from 'components/module/MultipleCarousel';
import SearchAddress from 'components/module/SearchAddress';
import SellerCard from 'components/module/SellerCard';
import { SellerCardProps } from 'components/module/SellerCard/SellerCard.props';
import SubscriptionAlert from 'components/module/SubscriptionAlert';
import { BUYER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { MARKET_GROUP_1 } from 'consts/markets';
import moment from 'moment';
import partialRight from 'ramda/es/partialRight';
import { Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { GetBuyerHomepageResponseListingItem } from 'types/store/GetBuyerHomepageState';
import { CompanyPlanName } from 'types/store/GetCompanyPlanState';
import { useTheme } from 'utils/Theme';

import {
  HomeGeneratedProps,
  CreditState,
  CategoryResults,
  SellerResults,
} from './Home.props';
import {
  CategoriesContainer,
  Bold,
  FavouritesContainer,
  ViewCol,
  ViewContainer,
  RecentContainer,
  SellerContainer,
  SwiperContainer,
} from './Home.style.old';
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
        variant="infoAlert"
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
  const theme = useTheme();
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
    isPendingAccount,
    companyPlan,
    currentMarketSector,
    isApprovedCompany,
    canNegotiate,
  } = props;

  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const hideCarouselArrowArea = useMediaQuery({
    query: `(max-width: 565px)`,
  });

  const mediumArrowWidth = useMediaQuery({
    query: BREAKPOINTS['md'],
  });

  const currentPlan = companyPlan?.activePlans.find((ac) =>
    [CompanyPlanName.PRO, CompanyPlanName.BASE].includes(ac.plan.name)
  );

  const freeTrialSubscription = currentPlan?.plan.alias.includes('FREE');

  const endDate = currentPlan
    ? currentPlan.subscription.ends_at
    : moment().startOf('day');

  const startDate = currentPlan
    ? currentPlan.subscription.starts_at
    : moment().startOf('day');

  const currentDate = moment().startOf('day');
  const freeTrialPeriod = moment(endDate).diff(startDate, 'days');
  const daysLeft = moment(endDate).diff(currentDate, 'days');

  return (
    <ViewContainer>
      {!loadingHomePage && freeTrialSubscription && isApprovedCompany && (
        <FreeTrialCountdown
          freeTrialPeriod={freeTrialPeriod}
          daysLeft={daysLeft}
        />
      )}

      {!loadingHomePage &&
        !freeTrialSubscription &&
        companyPlan &&
        isApprovedCompany && (
          <div className="wrapper">
            <SubscriptionAlert companyPlan={companyPlan} />
          </div>
        )}

      {!loadingHomePage && isPendingAccount && (
        <div className="wrapper" style={{ marginBottom: 16 }}>
          <Col xs={12}>
            <Alert
              variant="alert"
              content={`Account Pending. You cannot make purchases until approved.`}
              fullWidth
              alignText="center"
            />
          </Col>
        </div>
      )}

      <div className="wrapper">
        {!loadingHomePage && (
          <Credit creditState={creditState} loading={loading} />
        )}
        <Col xs={12}>
          <SearchAddress isHomePageLoading={loadingHomePage} />
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
              bgPosition={theme.isSFM ? 'left' : 'center'}
            />
          </SwiperContainer>
          {!isPendingAccount && (
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
                    transform={partialRight(favouritesToPreviewProps, [
                      isPendingAccount,
                      canNegotiate,
                    ])}
                    Component={PreviewCard}
                    link={BUYER_ROUTES.PRODUCT_DETAIL}
                    emptyText="No Favourite Products"
                    id="favourites"
                  />
                </FavouritesContainer>
              </ViewCol>
            </div>
          )}

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
                  transform={partialRight(recentlyAddedToPreviewProps, [
                    isPendingAccount,
                    canNegotiate,
                  ])}
                  Component={PreviewCard}
                  link={BUYER_ROUTES.PRODUCT_DETAIL}
                  id="recentlyAdded"
                />
              </RecentContainer>
            </ViewCol>
          </div>

          {!isPendingAccount && (
            <>
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
        </>
      )}
    </ViewContainer>
  );
};

export default HomeView;
