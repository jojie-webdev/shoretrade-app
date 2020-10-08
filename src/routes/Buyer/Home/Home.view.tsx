import React, { useRef, useEffect, useState } from 'react';

import Button from 'components/base/Button';
import Select from 'components/base/Select';
import { InfoFilled, ChevronRight } from 'components/base/SVG';
import ArrowRight from 'components/base/SVG/ArrowRight';
import Typography from 'components/base/Typography';
import Carousel from 'components/module/Carousel';
import Card from 'components/module/CategoryCards/Landing';
import PreviewCard from 'components/module/CategoryCards/Preview';
import ConfirmationModal from 'components/module/ConfirmationModal';
import Loading from 'components/module/Loading';
import Search from 'components/module/Search';
import { BUYER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
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
      <CreditContainer
        onClick={() => history.push('/buyer/account/bank-details')}
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
    addresses,
  } = props;
  const [addressModalChange, setAddressModalChange] = useState(false);
  const [currentAddressSelected, setCurrentAddressSelected] = useState();
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

  useEffect(() => {
    setCurrentAddressSelected(addresses[0]); //Todo: will be change to default address
  }, [addresses]);

  return (
    <ViewContainer>
      <ConfirmationModal
        isOpen={addressModalChange}
        title="Change Buying Address"
        description="Are you sure you want to change your buying address? This will reset your current cart."
        action={() => console.log('DELETE ACTION')}
        actionText="Okay"
        onClickClose={() => {
          setAddressModalChange(false);
        }}
      />
      <div className="wrapper">
        <Credit creditState={creditState} loading={loading} />
        <Col xs={12}>
          <Search
            value={search}
            onChange={onChangeSearchValue}
            resetValue={resetSearchValue}
            placeholder="Search.."
          />
          <div className="buying-for">
            <Select
              options={addresses}
              label="Buying For"
              size="small"
              onFocus={() => {}}
              onChange={(e) => {
                console.log(e);
                // setAddressModalChange(true);
              }}
              value={currentAddressSelected}
            />
          </div>
        </Col>
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
    </ViewContainer>
  );
};

export default HomeView;
