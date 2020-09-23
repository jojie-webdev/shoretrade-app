import React, { useRef, useEffect, useState } from 'react';

import Button from 'components/base/Button';
import { InfoFilled, ChevronRight } from 'components/base/SVG';
import ArrowRight from 'components/base/SVG/ArrowRight';
import Typography from 'components/base/Typography';
import Card from 'components/module/CategoryCards/Landing';
import PreviewCard from 'components/module/CategoryCards/Preview';
import FeaturedCarousel from 'components/module/FeaturedCarousel';
import Loading from 'components/module/Loading';
import Search from 'components/module/Search';
import { BUYER_ROUTES } from 'consts';
import { Row, Col, Container } from 'react-grid-system';
import { useHistory, Link } from 'react-router-dom';

import 'swiper/swiper-bundle.css';
import Swiper, { Pagination, Navigation } from 'swiper';
import { sizeToString } from 'utils/Listing';
import { toPrice } from 'utils/String/toPrice';
import { useTheme } from 'utils/Theme';
// import Pagination from 'components/module/Pagination';

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
} from './Home.style';

Swiper.use([Pagination, Navigation]);

const Credit = (props: { creditState: CreditState; loading: boolean }) => {
  const { creditState, loading } = props;
  const theme = useTheme();
  const history = useHistory();

  if (loading) {
    return <Loading />;
  }

  if (creditState === 'empty' || creditState === 'lessThan') {
    return (
      <CreditContainer
        onClick={() => history.push('/buyer/account/bank-details/add-credit')}
        style={{ cursor: 'pointer' }}
      >
        <InfoContainer>
          <InfoFilled height={20} width={20} fill={theme.grey.shade8} />
        </InfoContainer>
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
      </CreditContainer>
    );
  }
  return null;
};

const HomeView = (props: HomeGeneratedProps) => {
  const history = useHistory();
  const {
    categories,
    onChangeSearchValue,
    resetSearchValue,
    search,
    creditState,
    loading,
    featured,
    favourites,
  } = props;

  const swiper = useRef<any>(null);
  useEffect(() => {
    swiper.current = new Swiper('.swiper-container', {
      loop: true,
      // autoplay: {
      //   delay: 2000
      // },
      speed: 600,
      // pagination: {
      //   clickable: true,
      //   el: '.swiper-pagination',

      // },
      navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      },
      touchRatio: 0,
    });
  }, [featured]);

  return (
    <ViewContainer>
      <div style={{ width: '65vw', margin: 'auto' }}>
        <Credit creditState={creditState} loading={loading} />
        <Col xs={12}>
          <Search
            value={search}
            onChange={onChangeSearchValue}
            resetValue={resetSearchValue}
            placeholder="Search.."
          />
        </Col>
      </div>

      {/* Swiper here */}
      <SwiperContainer>
        <div className="swiper-container">
          <div className="swiper-wrapper">
            {featured.map((f, key) => {
              return (
                <div className="swiper-slide" key={key}>
                  <img src={f} alt="images" />
                </div>
              );
            })}
          </div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
      </SwiperContainer>
      <div style={{ width: '65vw', margin: 'auto' }}>
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
              ? favourites.slice(0, 3).map((fav, index) => {
                  return (
                    <Col sm={4} key={fav.id}>
                      <Link to={BUYER_ROUTES.PRODUCT_PREVIEW(fav.id)}>
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
                  <Col sm={3} key={index}>
                    <Link
                      // to={`${BUYER_ROUTES.CATEGORIES}/${category.id}`}
                      to={BUYER_ROUTES.CATEGORY_PRODUCTS(`${category.id}`)}
                      key={category.id}
                    >
                      <Card
                        sortIndex={category.sortIndex}
                        id={category.id}
                        image={category.thumbnail}
                        label={category.name}
                      />
                    </Link>
                  </Col>
                );
              })
            ) : (
              <Loading />
            )}
          </CategoriesContainer>
        </ViewCol>
      </div>
    </ViewContainer>
  );
};

export default HomeView;
