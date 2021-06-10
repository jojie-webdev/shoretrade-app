import React from 'react';

import FavoriteButton from 'components/base/FavoriteButton';
import Interactions from 'components/base/Interactions/Interactions.view';
import Typography from 'components/base/Typography';
import Loading from 'components/module/Loading';
import MobileHeader from 'components/module/MobileHeader';
import ProductSellerCard from 'components/module/ProductSellerCard';
import Search from 'components/module/Search';
import { BUYER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router';

import { SellerDetailsGeneratedProps } from './SellerDetails.props';
import {
  Container,
  SellerHeader,
  ListingCounter,
  ListingHeader,
  Image,
} from './SellerDetails.style';

const SellerDetailsView = (props: SellerDetailsGeneratedProps) => {
  const history = useHistory();
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const {
    sellerRatingProps,
    onChangeSearchValue,
    resetSearchValue,
    results,
    searchValue,
    loading,
  } = props;

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          {isSmallScreen && <MobileHeader>Seller</MobileHeader>}

          <SellerHeader>
            <ProductSellerCard
              name={sellerRatingProps.companyName}
              location={sellerRatingProps.companyLocation}
              rating={sellerRatingProps.rating.toString()}
              withBackground={true}
              showFavoriteButton={isSmallScreen}
              fullWidth={isSmallScreen}
              isFavorite={sellerRatingProps.isFavorite}
              onFavorite={() => sellerRatingProps.onFavorite()}
            />
            {!isSmallScreen && (
              <FavoriteButton
                iconOnly={false}
                isFavorite={sellerRatingProps.isFavorite}
                onClick={() => sellerRatingProps.onFavorite()}
              />
            )}
          </SellerHeader>
          <ListingHeader>
            <Typography variant="overline" color="shade6">
              <ListingCounter>{results.length}</ListingCounter>
              Active Listing
            </Typography>
            <div className="search-container">
              <Search
                value={searchValue}
                resetValue={resetSearchValue}
                onChange={onChangeSearchValue}
                placeholder="Search for a listing"
                rounded
              />
            </div>
          </ListingHeader>

          {results && (
            <>
              {results.map((r) => {
                return (
                  <Interactions
                    key={r.id}
                    padding="8px 24px 8px 8px"
                    onClick={() => {
                      history.push(BUYER_ROUTES.PRODUCT_DETAIL(r.id));
                    }}
                    leftComponent={
                      <>
                        <Image src={r.images[0]} />
                        <Typography variant="label" color="shade9">
                          {r.type}
                        </Typography>
                      </>
                    }
                  />
                );
              })}
            </>
          )}
        </Container>
      )}
    </>
  );
};

export default SellerDetailsView;
