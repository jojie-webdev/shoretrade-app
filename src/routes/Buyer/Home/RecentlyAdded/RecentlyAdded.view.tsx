import React from 'react';

import Spinner from 'components/base/Spinner/Spinner.view';
import Typography from 'components/base/Typography/Typography.view';
import { BoxContainer } from 'components/layout/BoxContainer';
import PreviewCard from 'components/module/CategoryCards/Preview';
import Search from 'components/module/Search/Search.view';
import { BUYER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Col, Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { sizeToString } from 'utils/Listing';
import { toPrice } from 'utils/String/toPrice';

import { RecentlyAddedGeneratedProps } from './RecentlyAdded.props';
import { PreviewContainer, LoadingContainer } from './RecentlyAdded.style';

const RecentlyAddedView = (props: RecentlyAddedGeneratedProps) => {
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
              <Typography
                variant="title4"
                weight="500"
                className="header-title"
              >
                Recently Added
              </Typography>
            </div>
          )}

          <div className="right-header">
            <Search
              className="search"
              placeholder={`Search for vendor`}
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
              {results.map((rec) => {
                return (
                  <Col
                    key={rec.id}
                    xxl={3}
                    xl={4}
                    lg={6}
                    md={12}
                    sm={6}
                    xs={12}
                  >
                    <Link to={BUYER_ROUTES.PRODUCT_DETAIL(rec.id)}>
                      <PreviewCard
                        id={rec.id}
                        images={rec.images}
                        type={rec.type}
                        price={toPrice(rec.price)}
                        remaining={rec.remaining.toFixed(2)}
                        coop={rec.coop}
                        minimumOrder={rec.minimumOrder}
                        origin={rec.origin}
                        weight={sizeToString(
                          rec.size.unit,
                          rec.size.from,
                          rec.size.to
                        )}
                        isAquafuture={rec.isAquafuture}
                        unit={rec.measurementUnit}
                        state={rec.state}
                        hiddenPrice={isPendingAccount}
                        hiddenVendor={isPendingAccount}
                      />
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

export default RecentlyAddedView;
