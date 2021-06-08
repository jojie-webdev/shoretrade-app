import React from 'react';

import Spinner from 'components/base/Spinner/Spinner.view';
import Typography from 'components/base/Typography/Typography.view';
import { BoxContainer } from 'components/layout/BoxContainer';
import PreviewCard from 'components/module/CategoryCards/Preview';
import { PreviewDetailAlt } from 'components/module/CategoryCards/Preview/Preview.view';
import Search from 'components/module/Search';
import { BUYER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Col, Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { LoadingContainer } from 'routes/Buyer/Home/RecentlyAdded/RecentlyAdded.style';
import { sizeToString } from 'utils/Listing';
import { toPrice } from 'utils/String/toPrice';

import { FavouritesGeneratedProps } from './Favourites.props';
import { PreviewContainer, StyledInteraction } from './Favourites.style';

const FavouritesView = (props: FavouritesGeneratedProps) => {
  const {
    results,
    isPendingAccount,
    onChangeSearchValue,
    onResetSearchValue,
    searchValue,
    isLoadingResults,
  } = props;
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <BoxContainer>
      <PreviewContainer>
        <div className="header">
          {isSmallScreen && (
            <div className="left-header">
              <Typography variant="title4" className="header-title">
                Favourites
              </Typography>
            </div>
          )}

          <div className="right-header">
            <Search
              className="search"
              placeholder={`Search for a Seller`}
              value={searchValue}
              onChange={onChangeSearchValue}
              resetValue={onResetSearchValue}
              rounded
            />
          </div>
        </div>

        {isLoadingResults && (
          <LoadingContainer>
            <Spinner />
          </LoadingContainer>
        )}

        {results.length > 0 ? (
          <>
            <Row nogutter>
              {results.map((fav) => {
                return (
                  <Col
                    key={fav.id}
                    xxl={3}
                    xl={4}
                    lg={6}
                    md={12}
                    sm={6}
                    xs={12}
                  >
                    <Link to={BUYER_ROUTES.PRODUCT_DETAIL(fav.id)}>
                      {isSmallScreen ? (
                        <StyledInteraction>
                          <PreviewDetailAlt
                            alternate
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
                            hiddenPrice={isPendingAccount}
                            hiddenVendor={isPendingAccount}
                          />
                        </StyledInteraction>
                      ) : (
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
                          hiddenPrice={isPendingAccount}
                          hiddenVendor={isPendingAccount}
                        />
                      )}
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </>
        ) : null}
      </PreviewContainer>
    </BoxContainer>
  );
};

export default FavouritesView;
