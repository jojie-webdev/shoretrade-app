import React from 'react';

import Alert from 'components/base/Alert';
import Interactions from 'components/base/Interactions';
import {
  ChevronRight,
  PlaceholderProfile,
  ArrowRight,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import Carousel from 'components/module/Carousel';
import Card from 'components/module/CategoryCards/Landing';
import { CardProps } from 'components/module/CategoryCards/Landing/Card.props';
import PreviewCard from 'components/module/CategoryCards/Preview';
import { PreviewProps } from 'components/module/CategoryCards/Preview/Preview.props';
import HomeSectionHeader from 'components/module/HomeSectionHeader';
import HomeSellerCard from 'components/module/HomeSellerCard';
import Loading from 'components/module/Loading';
import MultipleCarousel from 'components/module/MultipleCarousel';
import SearchAddress from 'components/module/SearchAddress';
import { SellerCardProps } from 'components/module/SellerCard/SellerCard.props';
import { BUYER_ACCOUNT_ROUTES, BUYER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import partialRight from 'ramda/es/partialRight';
import { Col, Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { GetBuyerHomepageResponseListingItem } from 'types/store/GetBuyerHomepageState';
import { sizeToString } from 'utils/Listing';
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
  Wrapper,
  RecentContainer,
  SellerContainer,
  Image,
  PlaceholderImage,
  DetailsContainer,
  ResultContainer,
  FavouriteProductThumbnail,
  StatusContainer,
  BadgeText,
  SellerInteractionContent,
  SellerInteraction,
  SellerInteractionsContainer,
  EmptyContainer,
  StatusBadge,
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
        onClick={() => history.push(BUYER_ACCOUNT_ROUTES.BANK_DETAILS)}
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
    isPendingAccount,
  } = props;

  const theme = useTheme();

  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const isIpad = useMediaQuery({ query: BREAKPOINTS['iPad'] });

  const hideCarouselArrowArea = useMediaQuery({
    query: `(max-width: 565px)`,
  });

  const mediumArrowWidth = useMediaQuery({
    query: BREAKPOINTS['md'],
  });

  const FavouriteProductInteractionContent = (
    props: GetBuyerHomepageResponseListingItem
  ) => (
    <>
      <FavouriteProductThumbnail src={props.images[0]} />
      <DetailsContainer>
        <ResultContainer>
          <Typography>{props.type}</Typography>
          <StatusContainer>
            {props.state?.map((item) => {
              return (
                <StatusBadge
                  key={item}
                  fontColor={theme.grey.shade9}
                  badgeColor={theme.grey.shade2}
                >
                  <BadgeText
                    variant="caption"
                    weight="bold"
                    style={{
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                    }}
                  >
                    {item}
                  </BadgeText>
                </StatusBadge>
              );
            })}
          </StatusContainer>
          <div className="size">
            <Typography variant="small">
              {sizeToString(props.size.unit, props.size.from, props.size.to)}
            </Typography>
          </div>
        </ResultContainer>
      </DetailsContainer>
    </>
  );

  return (
    <BoxContainer>
      {isPendingAccount && (
        <Alert
          variant="alert"
          content={`Account Pending. You cannot make purchases until approved.`}
          fullWidth
          alignText="center"
          style={{ marginBottom: 24 }}
        />
      )}
      <Credit creditState={creditState} loading={loading} />
      <SearchAddress />

      {/* Main Content */}
      {loadingHomePage ? (
        <Loading />
      ) : (
        <>
          <Wrapper>
            <Row gutterWidth={16}>
              <ViewCol xxl={6} xl={6} md={12} sm={12}>
                <Carousel
                  id="featured-carousel"
                  images={featured}
                  loop
                  // autoplay
                  hideArrowArea={hideCarouselArrowArea}
                  arrowWidth={mediumArrowWidth ? 75 : undefined}
                  addMargin
                />
              </ViewCol>
              {!isPendingAccount && (
                <ViewCol xxl={6} xl={6} md={12} sm={12}>
                  <HomeSectionHeader
                    title="Your Favourite Products"
                    onClick={() => history.push(BUYER_ROUTES.FAVOURITES)}
                    noMargin
                  />

                  <FavouritesContainer>
                    {isSmallScreen ? (
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
                    ) : (
                      <>
                        {favourites?.length > 0 ? (
                          favourites?.map((fav) => {
                            return (
                              <Interactions
                                key={fav.id}
                                type="next"
                                padding="8px 24px 8px 8px"
                                onClick={() => {
                                  history.push(
                                    BUYER_ROUTES.PRODUCT_DETAIL(fav.id)
                                  );
                                }}
                                leftComponent={
                                  <FavouriteProductInteractionContent
                                    {...fav}
                                  />
                                }
                              />
                            );
                          })
                        ) : (
                          <EmptyContainer>
                            <Typography variant="title5">
                              No Favourite Sellers
                            </Typography>
                          </EmptyContainer>
                        )}
                      </>
                    )}
                  </FavouritesContainer>
                </ViewCol>
              )}
            </Row>
          </Wrapper>

          <Wrapper>
            <Row gutterWidth={16}>
              <ViewCol xxl={6} xl={6} md={12} sm={12}>
                <HomeSectionHeader
                  title="Categories"
                  onClick={() =>
                    history.push(BUYER_ROUTES.CATEGORIES, { ref: 'home' })
                  }
                  noMargin
                />

                <CategoriesContainer>
                  <MultipleCarousel<CategoryResults, CardProps>
                    responsive
                    data={categories}
                    transform={categoriesToCardProps}
                    Component={Card}
                    link={BUYER_ROUTES.CATEGORY_PRODUCTS}
                    id="categories"
                  />
                </CategoriesContainer>
              </ViewCol>
              <ViewCol xxl={6} xl={6} md={12} sm={12}>
                <HomeSectionHeader
                  title="Favourite Sellers"
                  onClick={() => history.push(BUYER_ROUTES.SELLERS)}
                  noMargin
                />
                {isIpad || isSmallScreen ? (
                  <>
                    <SellerContainer>
                      <MultipleCarousel<SellerResults, SellerCardProps>
                        data={sellers}
                        transform={favouriteSellersToSellerCardProps}
                        Component={HomeSellerCard}
                        link={BUYER_ROUTES.SELLER_DETAILS}
                        id="sellers"
                      />
                    </SellerContainer>
                  </>
                ) : (
                  <SellerInteractionsContainer>
                    {favouriteSellers?.length > 0 ? (
                      favouriteSellers?.slice(0, 5).map((seller) => {
                        return (
                          <SellerInteraction
                            key={seller.id}
                            type="next"
                            padding="8px 24px 8px 8px"
                            onClick={() => {
                              history.push(
                                BUYER_ROUTES.SELLER_DETAILS(seller.id)
                              );
                            }}
                            leftComponent={
                              <SellerInteractionContent>
                                {seller.companyImage ? (
                                  <Image
                                    className="thumbnail"
                                    src={seller.companyImage}
                                  />
                                ) : (
                                  <PlaceholderImage>
                                    <PlaceholderProfile />
                                  </PlaceholderImage>
                                )}
                                <Typography variant="body">
                                  {seller.companyName}
                                </Typography>
                              </SellerInteractionContent>
                            }
                          />
                        );
                      })
                    ) : (
                      <EmptyContainer>
                        <Typography variant="title5">
                          No Favourite Sellers
                        </Typography>
                      </EmptyContainer>
                    )}
                  </SellerInteractionsContainer>
                )}
              </ViewCol>
            </Row>
          </Wrapper>

          <Wrapper>
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
                  ])}
                  Component={PreviewCard}
                  link={BUYER_ROUTES.PRODUCT_DETAIL}
                  id="recentlyAdded"
                />
              </RecentContainer>
            </ViewCol>
          </Wrapper>

          {!isPendingAccount && (
            <>
              <Wrapper>
                <ViewCol>
                  <HomeSectionHeader
                    title="Sellers"
                    onClick={() => history.push(BUYER_ROUTES.FAVOURITE_SELLERS)}
                    noMargin
                  />

                  <SellerContainer>
                    <MultipleCarousel<SellerResults, SellerCardProps>
                      data={sellers}
                      transform={favouriteSellersToSellerCardProps}
                      Component={HomeSellerCard}
                      link={BUYER_ROUTES.SELLER_DETAILS}
                      emptyText="No Favourite Sellers"
                      id="favouriteSellers"
                    />
                  </SellerContainer>
                </ViewCol>
              </Wrapper>
            </>
          )}
        </>
      )}
    </BoxContainer>
  );
};

export default HomeView;
